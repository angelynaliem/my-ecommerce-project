// "use server"

// import { db } from "@/server"
// import { posts } from "../schema"
// import { revalidatePath } from "next/cache"

// export default async function createPost(formData: FormData) {
//     const title = formData.get("title")?.toString()

//     if (!title) {
//         return { error: "Title is required" }
//     }
//     revalidatePath("/")
//     const post = await db.insert(posts).values({
//         title,
//     })
//     return { success: post }
// }

//In server component, 'onclick' or state and stuff like that does not work, only basics like 'input etc by working with the native data that that form gives you
//Where you need interactivity, you separate that feature into a component and use 'use client'.