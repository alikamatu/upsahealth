"use client"
import { useEffect, useState } from "react";
import AddPost from "../conponent/AddPost";
import Post from "../conponent/Post";
import BlogProfessionals from "../conponent/BlogProfessionals";

export default function Blog() {
    const [posts, setPosts] = useState([]);


    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/post/fetchpost');
            if (response.ok) {
                const postData = await response.json();
                const formattedData = postData.map(post => ({
                    ...post,
                    likes: Number(post.likes) || 0,
                    comments: post.comments || []
                }));
                setPosts(formattedData);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    // Initial fetch of posts
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="flex w-[100%] gap-8 p-8 justify-start items-start">
            <div className="flex w-[65%] flex-col items-start justify-start">
            <AddPost fetchPosts={fetchPosts} />
            <Post post={posts} />
            </div>
            <div className="w-[30%] h-screen p-8 border-l-2 border-[#80808042] fixed right-0 top-0">
                <BlogProfessionals />
            </div>
        </div>
    )
}