const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

type RecaptchaVerification = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

/**
 * Verify a token received by a future contact endpoint.
 * RECAPTCHA_SECRET_KEY is server-only and must never be prefixed with VITE_.
 */
export async function verifyRecaptchaToken(token: string, remoteIp?: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret || !token) return { success: false, reason: "recaptcha_not_configured" } as const;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) return { success: false, reason: "recaptcha_request_failed" } as const;
  const result = (await response.json()) as RecaptchaVerification;
  return result;
}
