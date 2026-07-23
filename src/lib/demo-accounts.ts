/**
 * Shared constants for the demo authentication bypass.
 * These emails are the ONLY values accepted for the demo_access cookie.
 * Any cookie value not in this list is rejected as tampered.
 */
export const DEMO_ACCOUNTS = [
  "admin@demodental.com",
  "anna.berzina@demodental.com",
  "marcis.ozols@demodental.com",
  "laura.kalnina@demodental.com",
  "janis.krumins@demodental.com",
] as const;

export type DemoEmail = (typeof DEMO_ACCOUNTS)[number];

/** Returns true if the value is one of the allowed demo emails. */
export function isValidDemoEmail(value: unknown): value is DemoEmail {
  return typeof value === "string" && (DEMO_ACCOUNTS as readonly string[]).includes(value);
}
