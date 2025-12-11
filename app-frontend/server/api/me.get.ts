import { defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  // @ts-ignore
  const user = event.context.user;
  if (!user)
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });

  const { db } = event.context.fbAdmin!;
  const doc = await db.collection("users").doc(user.uid).get();
  return { user: { uid: user.uid, ...(doc.exists ? doc.data() : {}) } };
});
