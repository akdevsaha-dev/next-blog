import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const blogs = await prisma.posts.findMany({
    
})