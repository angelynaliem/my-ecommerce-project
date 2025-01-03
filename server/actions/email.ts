"use server";

import getBaseURL from "@/lib/base-url";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL();

export const sendTwoFactorTokenByEmail = async (
  email: string,
  token: string
) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "My Ecommerce Project - Your Two Factor Token",
    html: `<p>Your confirmation code: ${token}</p>`,
  });

  if (error) return;
  // console.log(error);
  if (data) return data;
  // console.log(data + "this is the data from email verification");
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "My Ecommerce Project - Confirmation Email",
    html: `<p>Click to <a href='${confirmLink}'>Confirm your email</a></p>`,
  });

  if (error) return;
  // console.log(error);
  if (data) return data;
  // console.log(data + "this is the data from email verification");
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "admin@resend.dev",
    to: email,
    subject: "My Ecommerce Project - Reset Password",
    html: `<p>Click to <a href='${confirmLink}'>Reset your passwword</a></p>`,
  });

  if (error) return;
  // console.log(error);
  if (data) return data;
};
