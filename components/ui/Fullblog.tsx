import { Blog } from "@/app/hooks";
import { Avatar } from "./Blogcard";
import Link from "next/link";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const formattedDate = new Date(blog.createdAt);
    const formattedDateString = formattedDate.toLocaleDateString("en-GB", { 
        weekday: "short", // "Wed"
        day: "2-digit", // "04"
        month: "short", // "Dec"
        year: "numeric", // "2024"
    });
    return (
        <div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">{blog.title}</div>
                        <div className="text-slate-500 pt-2">{formattedDateString}</div>
                        <div className="pt-4">{blog.content}</div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">Author</div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.userName || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.userName || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about the author&apos;s ability to grab the
                                    user&apos;s attention
                                </div>
                            </div>
                            <div className="pt-10 text-slate-200 font-bold text-2xl">
                                    <Link href={"/publish"}> Publish blog</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
