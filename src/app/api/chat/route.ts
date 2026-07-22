import { NextResponse } from "next/server";

const API_KEY = process.env.OPENROUTER_API_KEY;

if (!API_KEY) {
  console.warn("Missing OPENROUTER_API_KEY environment variable.");
}

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
    const { messages } = await req.json();

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
      const err = await response.json();
      console.error("OpenRouter API Error:", err);
      // OpenRouter puts the error message in err.error.message
      const errorMsg = err.error?.message || "Failed to connect to AI provider.";
      return NextResponse.json({ error: errorMsg }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({
      message: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
