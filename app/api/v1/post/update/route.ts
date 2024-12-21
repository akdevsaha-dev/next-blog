import { updateBlogInput } from "@/app/common/src";
import {PrismaClient} from "@prisma/client"
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PUT(req: NextRequest){
    // can i make the title and content optional ???
    const body = await req.json()
    const { success } = updateBlogInput.safeParse(body)
    if(!success){
        return NextResponse.json({
            message: "Invalid Input"

        },{
            status: 400
        })
    }

    const updatedBlog = await prisma.posts.update({
        where: {
            id: body.id
        },
        data: {
            title : body.title ,
            content: body.content
        }
    })
    return NextResponse.json({
        id: updatedBlog.id
    })
}