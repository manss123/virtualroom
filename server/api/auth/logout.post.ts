// server/api/auth/logout.post.ts
import { defineEventHandler, deleteCookie } from "h3";

export default defineEventHandler(async (event) => {
  deleteCookie(event, "session", { path: "/" });
  return { ok: true };
});
