import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"
export async function POST(req: Request) {
    const body = await req.json()
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })
        if (!user) {
            return Response.json({
                message: "You are not an existing user please signin!"
            })
        }
        const validUser = await bcrypt.compare(body.password, user.password)

        if (validUser) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY)
            return Response.json({
                token
            })
        }

    } catch (e) {
        return Response.json({
            message: "failed to sign in!"
        })
    }
}