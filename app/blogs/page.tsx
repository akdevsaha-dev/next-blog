'use client'
import { BlogSkeleton }  from "@/components/ui/BlogSkeleton";
import { useBlogs } from "../hooks";
import { Blogcard } from "@/components/ui/Blogcard";

const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="flex justify-center">
                <p>No blogs available.</p>
            </div>
        );
    }

    return <div className="flex justify-center">
        <div>
        {blogs.map((post, index) => (
    <Blogcard
        key={index}  // Use index if you can't find a better key
        id={post.id}
        userName={post.author.userName || "Anonymous"}
        title={post.title}
        content={post.content}
        publishedDate={new Date(post.createdAt)}
    />
))}
    </div>  
    </div>
}

export default Blogs;