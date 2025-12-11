import { defineEventHandler, createError } from "h3";
import { FieldValue } from "firebase-admin/firestore";

export default defineEventHandler(async (event) => {
  // @ts-ignore
  const user = event.context.user;
  if (!user)
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });

  const { db } = event.context.fbAdmin!;
  await db.collection("users").doc(user.uid).set(
    {
      pdpaAccepted: true,
      pdpaAcceptedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  return { ok: true };
});
