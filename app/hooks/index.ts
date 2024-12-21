'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string,
    title: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
    author: {
        userName: string
    }
}

export const useBlog = ({id} : {id: string}) => {
    const [loading, setLoading] = useState(true)
    const  [blog, setBlog] = useState<Blog | null>(null)

    useEffect(()=> {
       axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }) .then(response => {
            setBlog(response.data.post)
            setLoading(false)
        })
    },[id] )
    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
     axios.get(`${BACKEND_URL}/api/v1/post/allblogs`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
     }) .then( response => {
        setBlogs(response.data.Allblogs)
        setLoading(false)
     })
    },[])
    return {
        loading,
        blogs
    }
}