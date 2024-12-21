import z from "zod"
export const signupInput = z.object({
   userName: z.string(),
   password: z.string().min(6).max(25),
   email: z.string().email()
})
export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(25)
})
export type SigninInput = z.infer<typeof signinInput>
export const blogInput = z.object({
    title: z.string(),
    content: z.string()
})
export type BlogInput = z.infer<typeof blogInput>
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export type UpdateBlogInput = z.infer<typeof updateBlogInput>