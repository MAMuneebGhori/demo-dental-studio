"use server"

import { z } from "zod";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const noHtmlRegex = /^[^<>]*$/;
const phoneRegex = /^\+?[0-9\s\-()]+$/;
const ipSchema = z.string().regex(/^(([0-9]{1,3}\.){3}[0-9]{1,3})|(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})$/, "Invalid IP format");

const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

async function checkBookingRateLimit(ip: string) {
  if (!redis) return;
  const key = `booking:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60); // 1 minute window
  if (count > 5) { // 5 requests/minute
    throw new Error("RATE_LIMIT_BOOKING");
  }
}

// Strict Schema for Appointment Booking
const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(50).regex(noHtmlRegex, "Invalid name format"),
  surname: z.string().trim().min(2).max(50).regex(noHtmlRegex, "Invalid surname format"),
  email: z.string().trim().toLowerCase().email().max(255).regex(noHtmlRegex, "Invalid email characters"),
  phone: z.string().trim().min(5).max(20).regex(phoneRegex, "Invalid phone format").regex(noHtmlRegex),
  serviceId: z.enum(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]),
  date: z.string().min(1).regex(noHtmlRegex),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  policyAccepted: z.string().regex(/^on$/, "Must accept privacy policy"),
  termsAccepted: z.string().regex(/^on$/, "Must accept terms"),
});

export async function bookAppointmentAction(prevState: any, formData: FormData) {
  try {
    const headersList = await headers();
    const rawIp = headersList.get("x-forwarded-for")?.split(',')[0].trim() || "127.0.0.1";
    const ipParsed = ipSchema.safeParse(rawIp);
    const ip = ipParsed.success ? ipParsed.data : "127.0.0.1";
    await checkBookingRateLimit(ip);

    // Extract all fields
    const rawData = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      serviceId: formData.get("serviceId"),
      date: formData.get("date"),
      time: formData.get("time"),
      policyAccepted: formData.get("policyAccepted"),
      termsAccepted: formData.get("termsAccepted"),
    };

    // Reject immediately if types don't match
    for (const [key, value] of Object.entries(rawData)) {
      if (typeof value !== "string") {
        // Field type mismatch — no logging to avoid leaking field names
        return { error: "Validation failed. Please check your inputs." };
      }
    }

    // Strictly validate against schema
    const parsed = appointmentSchema.safeParse(rawData);

    if (!parsed.success) {
      // Zod validation failed — no logging to avoid leaking field paths
      return { 
        error: "Validation failed. Please check your inputs."
      };
    }

    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 2000));

    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMIT_BOOKING") {
      return { error: "Too many requests. Please try again later." };
    }
    console.error("Appointment Booking Error");
    return { error: "An unexpected error occurred while booking. Please try again later." };
  }
}
