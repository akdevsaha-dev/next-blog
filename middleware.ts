import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.headers.get("authorization") || ""; // Get the token from the Authorization header
    const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized: No token provided!" },
            { status: 401 }
        );
    }

    try {
        // Verify the token
        const secretKey = new TextEncoder().encode(SECRET_KEY);
        const { payload } = await jwtVerify(token, secretKey); // Extract payload from the JWT
        console.log("Verified User Payload:", payload); // Log the decoded user payload

        // Check if the payload contains an `id` property
        if (typeof payload === "object" && "id" in payload) {
            const userId = payload.id as string;
            
            // Add `userId` to the request's search params
            const response = NextResponse.next();
            response.headers.set("x-user-id", userId);
            return response; // Proceed with the request
        } else {
            return NextResponse.json(
                { message: "Invalid token payload!" },
                { status: 401 }
            );
        }
    } catch (err) {
        console.error("Token Verification Error:", err); // Log the error message
        return NextResponse.json(
            { message: "Unauthorized: Invalid token!" },
            { status: 401 }
        );
    }
}

export const config = {
    matcher: ['/api/v1/post/:path*'], // Apply middleware to specific routes
};