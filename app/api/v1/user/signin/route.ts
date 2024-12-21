import { signinInput } from "@/app/common/src";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
const SECRET_KEY = process.env.JWT_SECRET || ""
export async function POST(req: Request) {
    const body = await req.json()
    const { success } = signinInput.safeParse(body)

    if(!success){
        return NextResponse.json({
            message: "Invalid Inputs"
        },
    {
        status: 400
    })
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })
        if (!user) {
            return NextResponse.json({
                message: "You are not an existing user please signin!"
            })
        }
        const validUser = await bcrypt.compare(body.password, user.password)

        if (validUser) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY)
            return NextResponse.json({
                token
            })
        }

    } catch {
        return NextResponse.json({
            message: "failed to sign in!"
        })
    }
}