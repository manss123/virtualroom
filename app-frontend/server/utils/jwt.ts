// server/utils/jwt.ts
import { Buffer } from "node:buffer";

// simple JWT payload decoder (no signature check)
// ⚠️ ใช้สำหรับ DEV/EMULATOR เท่านั้น ห้ามใช้ใน production
export function decodeJwtPayload(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }
  const payload = parts[1];
  const json = Buffer.from(payload, "base64").toString("utf8");
  return JSON.parse(json);
}
