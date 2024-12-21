import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } =  params
    if (!id) {
        return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

 const post = await prisma.posts.findFirst({
    where: {
        id: Number(id)
    }, 
    select: {
        id: true,
        title: true,
        content:true,
        createdAt:true,
        updatedAt:true,
        author: {
               select: {
                userName: true
               }
        }
    }
 })

 return NextResponse.json({
    post
 })
}