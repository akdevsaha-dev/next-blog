import { blogInput } from "@/app/common/src";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { success } = blogInput.safeParse(body)
    if(!success){
        return NextResponse.json({
            Message: "Invalid Inputs"
        }, {
            status: 400
        })
    }
    const authorId = req.headers.get("x-user-id"); // Get the userId from the custom header
    console.log("Author ID:", authorId);

    if (!authorId) {
        return NextResponse.json({ message: "User ID is missing!" }, { status: 400 });
    }

    try {
        const post = await prisma.posts.create({
            data: {
                title: body.title,
                content: body.content,
                published: true,
                authorId: Number(authorId),
            },
        });
        return NextResponse.json({ post : post.id });
    } catch (err) {
        console.error("Error creating blog:", err);
        return NextResponse.json({ message: "Error creating blog!" }, { status: 500 });
    }
}