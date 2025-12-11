import { defineEventHandler, getCookie } from "h3";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "session");
  if (!cookie) return;
  try {
    const { auth } = event.context.fbAdmin!;
    const decoded = await auth.verifySessionCookie(cookie, true);
    // แนบ user ลงใน context
    // @ts-ignore
    event.context.user = decoded;
  } catch (e) {
    // session ไม่ valid ก็ปล่อยผ่านเป็น guest
  }
});
