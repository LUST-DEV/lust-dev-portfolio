import type { NextFunction, Request, Response } from "express";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 120;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  next();
}

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket.remoteAddress ?? "unknown";
  const now = Date.now();
  const current = requestCounts.get(ip);
  if (!current || current.resetAt <= now) {
    requestCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }
  current.count += 1;
  if (current.count > MAX_REQUESTS_PER_WINDOW) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "Trop de requêtes. Réessaie dans une minute." });
  }
  return next();
}

export function rejectSuspiciousApiPayload(req: Request, res: Response, next: NextFunction) {
  const raw = JSON.stringify({ query: req.query, body: req.body ?? {} }).slice(0, 50_000);
  const suspicious = /(<script|javascript:|onerror\s*=|union\s+select|drop\s+table|insert\s+into|delete\s+from|--\s|\/\*)/i.test(raw);
  if (suspicious) return res.status(400).json({ error: "Requête non valide." });
  return next();
}
