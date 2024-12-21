import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET() {
    const Allblogs = await prisma.posts.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt:true,
            author: {
                select: {
                    userName: true
                }
            }
        }
    }) 
    return NextResponse.json({
         Allblogs
    })
}