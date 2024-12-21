import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface RouteContext {
    params: {
        id: string
    }
}

export async function GET(
    request: Request,
    { params }: RouteContext
) {
    const { id } = params;

    if (!id) {
        return NextResponse.json(
            { error: "Post ID is required" },
            { status: 400 }
        );
    }

    try {
        const post = await prisma.posts.findFirst({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        userName: true,
                    },
                },
            },
        });

        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ post });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}