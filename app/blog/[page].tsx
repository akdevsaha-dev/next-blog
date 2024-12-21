import { FullBlog } from "@/components/ui/Fullblog";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/router";
import { useBlog } from "../hooks";

export default function Page() {
    const router = useRouter();
    const { slug } = router.query;
    const id = Array.isArray(slug) ? slug[0] : slug; // Ensure `id` is a string
    const { loading, blog } = useBlog({
        id: id || "", // Pass an empty string if `id` is undefined
    });
    if (loading) {
        return (
            <div className="h-screen flex flex-col justify-center">
                <Spinner />
            </div>
        );
    }
    if (!blog) {
        return (
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        );
    }
    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    );
}