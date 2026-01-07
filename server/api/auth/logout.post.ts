// server/api/auth/logout.post.ts
import { defineEventHandler, deleteCookie } from "h3";

export default defineEventHandler(async (event) => {
  deleteCookie(event, "session", {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return { ok: true };
});
