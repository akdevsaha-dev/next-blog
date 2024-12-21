import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
    const body = await req.json();

    try{
       await prisma.posts.delete({
            where: {
                id: body.id,
            },
        });
        return NextResponse.json({
            message: "Blog deleted successfully",
        });
    } catch(err){
        console.error(err)
         return NextResponse.json({
            message: "Some thing went wrong"
         })
    }
    
}
