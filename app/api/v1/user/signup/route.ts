import { signupInput } from "@/app/common/src";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
export async function POST(req: NextRequest) {
    const body =await req.json();
    const { success } = signupInput.safeParse(body)

    if(!success){
        return NextResponse.json({
            message: "Invalid inputs"
        }, {
            status: 400
        })
    }
    const SALT_ROUNDS = 10
    const hashedPassword =await bcrypt.hash(body.password, SALT_ROUNDS)
    try{
        const user = await prisma.user.create({
            data: {
                userName: body.userName,
                password: hashedPassword,
                email: body.email,
            },
        });
    const token = jwt.sign({ id: user.id }, SECRET_KEY)
    return NextResponse.json({
         token
    })
    } catch(e) {    
       return NextResponse.json({
       message: "error creating user, please try again!"
       })
    }
}
