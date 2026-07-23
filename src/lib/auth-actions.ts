"use server"

import { z } from "zod";
import { createClient } from "./supabase/server";
import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { DEMO_ACCOUNTS } from "./demo-accounts";

// Phase 2: Strict Server-Side Validation (Zod) - Rejecting invalid inputs completely
const strictString = z.string()
  .min(1)
  .max(255)
  .regex(/^[^<>]*$/, "Input cannot contain HTML tags or angle brackets");

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().min(5).max(255).regex(/^[^<>]*$/, "Invalid characters in email"),
  password: strictString,
});

const resetSchema = z.object({
  email: z.string().trim().toLowerCase().email().min(5).max(255).regex(/^[^<>]*$/, "Invalid characters in email"),
});

const ipSchema = z.string().regex(/^(([0-9]{1,3}\.){3}[0-9]{1,3})|(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})$/, "Invalid IP format");



// Phase 3: Upstash Redis Init
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

async function checkRateLimitAndLockout(ip: string, email: string) {
  if (!redis) return; // Skip if no Redis configured

  const rateLimitKey = `rl:login:${ip}`;
  const lockoutKey = `lockout:${email}`;
  const attemptKey = `attempts:${email}`;

  // Rule 1: Rate limit 10 requests per minute per IP
  const requests = await redis.incr(rateLimitKey);
  if (requests === 1) await redis.expire(rateLimitKey, 60);
  if (requests > 10) {
    throw new Error("RATE_LIMIT");
  }

  // Rule 2: Check if locked out
  const isLocked = await redis.get(lockoutKey);
  if (isLocked) {
    // NOTE: In production, send a real lockout email here
    throw new Error("LOCKED");
  }

  // Rule 3: Progressive delay
  const attempts = (await redis.get<number>(attemptKey)) || 0;
  if (attempts > 0) {
    const delay = Math.min(attempts * 1000, 5000); // progressive delay up to 5s
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

async function handleFailedAttempt(email: string) {
  if (!redis) return;
  const attemptKey = `attempts:${email}`;
  const lockoutKey = `lockout:${email}`;

  const attempts = await redis.incr(attemptKey);
  // Keep attempts around for an hour
  if (attempts === 1) await redis.expire(attemptKey, 3600);

  if (attempts >= 5) {
    // Lock for 15 minutes
    await redis.set(lockoutKey, "true", { ex: 900 });
    // NOTE: In production, send a real lockout email here
  }
}

async function handleSuccessfulAttempt(email: string) {
  if (!redis) return;
  const attemptKey = `attempts:${email}`;
  await redis.del(attemptKey);
}

// EXPORTED SERVER ACTIONS

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const headersList = await headers();
    const rawIp = headersList.get("x-forwarded-for")?.split(',')[0].trim() || "127.0.0.1";
    
    // Strictly validate IP address before using it in Redis keys
    const ipParsed = ipSchema.safeParse(rawIp);
    const ip = ipParsed.success ? ipParsed.data : "127.0.0.1";
    
    const emailRaw = formData.get("email");
    const passwordRaw = formData.get("password");

    // Reject if not strings
    if (typeof emailRaw !== "string" || typeof passwordRaw !== "string") {
      return { error: "Incorrect email or password" };
    }

    const parsed = loginSchema.safeParse({ email: emailRaw, password: passwordRaw });
    if (!parsed.success) {
      // Zod validation failed — no logging to avoid leaking field paths
      return { error: "Incorrect email or password" };
    }

    await checkRateLimitAndLockout(ip, parsed.data.email);

    // Demo Bypass
    if (String(process.env.NODE_ENV) !== 'production') {
      if (DEMO_ACCOUNTS.includes(parsed.data.email as any) && parsed.data.password === process.env.DEMO_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set("demo_access", parsed.data.email, { 
          path: "/",
          httpOnly: true,
          secure: String(process.env.NODE_ENV) === 'production',
          sameSite: "lax"
        });
        revalidatePath("/", "layout");
        redirect("/dashboard");
      }
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      await handleFailedAttempt(parsed.data.email);
      return { error: "Incorrect email or password" };
    }

    await handleSuccessfulAttempt(parsed.data.email);
  } catch (err: any) {
    console.error("Login Error");
    return { error: "Incorrect email or password" };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function resetPasswordAction(prevState: any, formData: FormData) {
  try {
    const headersList = await headers();
    const rawIp = headersList.get("x-forwarded-for")?.split(',')[0].trim() || "127.0.0.1";
    
    const ipParsed = ipSchema.safeParse(rawIp);
    const ip = ipParsed.success ? ipParsed.data : "127.0.0.1";

    const emailRaw = formData.get("email");

    if (typeof emailRaw !== "string") {
      return { message: "If that email is registered, you'll receive a reset link" };
    }

    const parsed = resetSchema.safeParse({ email: emailRaw });
    if (!parsed.success) {
      return { message: "If that email is registered, you'll receive a reset link" };
    }

    await checkRateLimitAndLockout(ip, parsed.data.email);

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email);
    if (error) {
      // Intentionally no logging — error details must not leak
    }
    
    // Always return generic success regardless of outcome to prevent user enumeration
    return { message: "If that email is registered, you'll receive a reset link" };
  } catch (err: any) {
    console.error("Password Reset Error");
    return { message: "If that email is registered, you'll receive a reset link" };
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("demo_access");
  
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Sign Out Error");
  }
  
  redirect("/login");
}
