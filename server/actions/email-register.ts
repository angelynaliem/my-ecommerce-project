"use server"

import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { db } from ".."
import { users } from "../schema"
import { generateEmailVerificationToken } from "./tokens"
import { sendVerificationEmail } from "./email"

const action = createSafeActionClient()

export const emailRegister = action(
    RegisterSchema,
    async({ email, name, password }) => {

        //Hashing password
    const hashedpassword = await bcrypt.hash(password, 10)
        // console.log("Hashed Password " + hashedpassword)

        //Check existing user
const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
})

        if (existingUser) {
            if (!existingUser.emailVerified) {
                const verificationToken = await generateEmailVerificationToken(email)
                await sendVerificationEmail(
                    verificationToken[0].email,
                    verificationToken[0].token)
    return { success: "Email confirmation resent!" }
            }

            return { error: "Email is already in use" }
        }

        //If new user
        await db.insert(users).values({
            email,
            name,
            password: hashedpassword
        })

        const verificationToken = await generateEmailVerificationToken(email)

        await sendVerificationEmail(
            verificationToken[0].email,
            verificationToken[0].token)

        return { success : "Confirmation email sent"}
})



//excalidraw.com