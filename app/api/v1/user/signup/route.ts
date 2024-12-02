import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
export async function POST(req: Request) {
    const body =await req.json();
    const SALT_ROUNDS = 10
    const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS)
    try{
        const user = await prisma.user.create({
            data: {
                userName: body.userName,
                password: hashedPassword,
                email: body.email,
            },
        });
    const token = jwt.sign({ id: user.id }, SECRET_KEY)
    return Response.json({
        token
    })
    } catch(e) {
       Response.json({
       message: "error creating user, please try again!"
       })
    }
}
