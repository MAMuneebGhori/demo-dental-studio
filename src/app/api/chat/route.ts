import { NextResponse } from "next/server";
import { z } from "zod";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const API_KEY = process.env.OPENROUTER_API_KEY;

const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

async function checkChatRateLimit(ip: string) {
  if (!redis) return;
  const key = `rl:chat:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60);
  if (count > 20) { // 20 requests/minute
    throw new Error("RATE_LIMIT_CHAT");
  }
}

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().trim().max(2000)
    }).passthrough()
  ).max(50)
});

const SYSTEM_PROMPT = `
You are the DEMO Clinical Concierge, an exclusive, highly professional, and empathetic AI assistant for DEMO Dental Studio.
Your primary goal is to answer questions about our premium dental services (Veneers, Implants, Periodontology, Hygiene, Diagnostics, ALL-ON-X) and to assist users in booking an appointment.

When helping users book an appointment, you must gently collect the following details in a conversational manner:
1. Patient's Full Name
2. Phone Number
3. Preferred Date or Time
4. The primary dental issue or service they are interested in.

Once you have all 4 details, confirm the appointment by summarizing the details and telling them that a specialist will contact them shortly to finalize the booking. Keep your responses concise, luxurious, and highly professional. Do not use markdown headers, keep it conversational.
`;

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const rawIp = headersList.get("x-forwarded-for")?.split(',')[0].trim() || "127.0.0.1";
    const ipSchema = z.string().regex(
      /^(([0-9]{1,3}\.){3}[0-9]{1,3})|(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})$/,
      "Invalid IP format"
    );
    const ipParsed = ipSchema.safeParse(rawIp);
    const ip = ipParsed.success ? ipParsed.data : "127.0.0.1";
    await checkChatRateLimit(ip);

    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }
    const { messages } = parsed.data;

    const payload = {
      model: "meta-llama/llama-3.1-8b-instruct", // High quality open model via OpenRouter
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "DEMO Dental Studio"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      await response.json(); // Consume response
      return NextResponse.json({ error: "Failed to connect to AI provider. Please try again later." }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({
      message: data.choices[0].message.content
    });

  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMIT_CHAT") {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    console.error("Chat API Error");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
