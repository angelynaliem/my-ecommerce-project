"use server";

import { ResetSchema } from "@/types/reset-schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { createSafeActionClient } from "next-safe-action";
import { users } from "../schema";
import { generatePasswordResetToken } from "./tokens";
import { sendPasswordResetEmail } from "./email";

const action = createSafeActionClient();

export const reset = action(ResetSchema, async ({ email }) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!existingUser) {
    return { error: "User not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  if (!passwordResetToken) {
    return { error: "Token not generated" };
  }

  await sendPasswordResetEmail(
    passwordResetToken[0].email,
    passwordResetToken[0].token
  );
  return { success: "Reset email sent" };
});
