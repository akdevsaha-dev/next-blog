"use client"
import { useParams } from "next/navigation";
import { FullBlog } from "@/components/ui/Fullblog";
import Spinner from "@/components/ui/Spinner";
import { useBlog } from "@/app/hooks";

export default function Page() {
    const { id } = useParams(); // Get the `id` parameter from the URL
    const { loading, blog } = useBlog({ id : id as string});

    if (loading) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <Spinner />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="h-screen flex flex-col justify-center">
                <p>Blog not found.</p>
            </div>
        );
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    );
}