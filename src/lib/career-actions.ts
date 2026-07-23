"use server"

import { z } from "zod";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const noHtmlRegex = /^[^<>]*$/;
const phoneRegex = /^\+?[\d\s\-()]{5,20}$/;
const ipSchema = z.string().regex(/^(([0-9]{1,3}\.){3}[0-9]{1,3})|(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})$/, "Invalid IP format");

const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

async function checkCareerRateLimit(ip: string) {
  if (!redis) return;
  const key = `rl:career:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60);
  if (count > 3) { // 3 applications/minute per IP
    throw new Error("RATE_LIMIT_CAREER");
  }
}

// Strict Zod schema for career application
const careerApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name too short").max(100, "Name too long").regex(noHtmlRegex, "Invalid characters in name"),
  email: z.string().trim().toLowerCase().email("Invalid email").max(255).regex(noHtmlRegex, "Invalid characters in email"),
  phone: z.string().trim().max(20).regex(phoneRegex, "Invalid phone format").regex(noHtmlRegex).optional().or(z.literal("")),
  position: z.string().trim().min(1, "Position required").max(100).regex(noHtmlRegex, "Invalid characters in position"),
  introduction: z.string().trim().max(2000, "Introduction too long").regex(noHtmlRegex, "Invalid characters").optional().or(z.literal("")),
  // CV file is handled separately (FormData file upload)
});

export async function submitCareerApplication(prevState: any, formData: FormData) {
  try {
    const headersList = await headers();
    const rawIp = headersList.get("x-forwarded-for")?.split(',')[0].trim() || "127.0.0.1";
    const ipParsed = ipSchema.safeParse(rawIp);
    const ip = ipParsed.success ? ipParsed.data : "127.0.0.1";
    await checkCareerRateLimit(ip);

    // Extract text fields
    const rawData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      position: formData.get("position"),
      introduction: formData.get("introduction"),
    };

    // Reject if types don't match
    for (const [, value] of Object.entries(rawData)) {
      if (value !== null && typeof value !== "string") {
        return { error: "Validation failed. Please check your inputs." };
      }
    }

    // Strictly validate against Zod schema
    const parsed = careerApplicationSchema.safeParse(rawData);
    if (!parsed.success) {
      return { error: "Validation failed. Please check your inputs." };
    }

    // Validate CV file (if present)
    const cvFile = formData.get("cv");
    if (cvFile && cvFile instanceof File && cvFile.size > 0) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (cvFile.size > maxSize) {
        return { error: "CV file exceeds the 10MB size limit." };
      }

      if (!allowedTypes.includes(cvFile.type)) {
        return { error: "Invalid file type. Please upload a PDF, DOC, or DOCX file." };
      }

      // Read file buffer for content validation and secure storage
      const buffer = Buffer.from(await cvFile.arrayBuffer());

      // Magic number content validation for allowed file types
      if (cvFile.type === "application/pdf") {
        if (buffer.length < 5 || buffer.toString('utf-8', 0, 5) !== "%PDF-") {
          return { error: "Invalid file content. Expected a valid PDF." };
        }
      } else if (cvFile.type === "application/msword") { // DOC
        const hex = buffer.toString('hex', 0, 4).toUpperCase();
        if (hex !== "D0CF11E0") {
          return { error: "Invalid file content. Expected a valid DOC." };
        }
      } else if (cvFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") { // DOCX
        const hex = buffer.toString('hex', 0, 4).toUpperCase();
        if (hex !== "504B0304") {
          return { error: "Invalid file content. Expected a valid DOCX." };
        }
      }

      // NOTE: Do NOT store the buffer on the local filesystem (web root).
      // In production, stream this buffer directly to an isolated 
      // storage service (e.g. AWS S3, Supabase Storage) to prevent execution.
    }

    // In production: store application in database, send notification email, etc.
    // For now, simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMIT_CAREER") {
      return { error: "Too many applications. Please try again later." };
    }
    console.error("Career Application Error");
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
