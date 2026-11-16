import type { NextFunction, Request, Response } from "express";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 120;
const MAX_TRACKED_CLIENTS = 10_000;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function pruneExpiredEntries(now: number) {
  requestCounts.forEach((value, key) => {
    if (value.resetAt <= now) requestCounts.delete(key);
  });
}

export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  next();
}

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const now = Date.now();
  pruneExpiredEntries(now);

  const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
  const current = requestCounts.get(ip);

  if (!current && requestCounts.size >= MAX_TRACKED_CLIENTS) {
    return res.status(503).json({ error: "Service temporairement indisponible." });
  }

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
