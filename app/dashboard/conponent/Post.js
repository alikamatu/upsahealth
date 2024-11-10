"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/userContext";

export default function Post({ initialPosts = [] }) {
    const [posts, setPosts] = useState(initialPosts);
    const { user } = useUserContext();
    const router = useRouter();

    // Fetch all posts data if not provided
    useEffect(() => {
        if (!initialPosts.length) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch("http://localhost:5000/api/post/fetchpost");
                    if (response.ok) {
                        const postData = await response.json();
                        const formattedData = postData.map((post) => ({
                            ...post,
                            likes: Number(post.likes) || 0,
                            comments: post.comments || [],
                        }));
                        setPosts(formattedData);
                    }
                } catch (error) {
                    console.error("Failed to fetch posts:", error);
                }
            };
            fetchPosts();
        }
    }, [initialPosts]);

    // Handle like action for a specific post
    const handleLike = async (postId, index) => {
        try {
            const response = await fetch(`http://localhost:5000/api/post/${postId}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id }),
            });
            if (response.ok) {
                setPosts((prevPosts) => {
                    const updatedPosts = [...prevPosts];
                    updatedPosts[index] = {
                        ...updatedPosts[index],
                        likes: updatedPosts[index].likes + 1,
                    };
                    return updatedPosts;
                });
            } else {
                console.error("Failed to like post");
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    // Navigate to the comment page
    const handleGoToComments = (postId) => {
        router.push(`/dashboard/blog/comment/${postId}`);
    };

    if (!posts.length) return <p>Loading...</p>;

    return (
        <div className="w-full mt-6 space-y-6">
            {posts.map((post, index) => (
                <div key={post._id} className="pt-0 rounded-2xl">
                    <div className="flex items-center mb-3">
                        <div className="mr-4">
                            <Image src={post.avatarUrl} width={40} height={40} className="rounded-full" alt="avatar" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">{post.userName}</h3>
                            <p className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <p className="text-sm">{post.caption}</p>
                    </div>

                    <div className="flex items-center justify-end gap-3 border-b border-[#80808042] pb-3">
                        <button
                            onClick={() => handleLike(post._id, index)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                        >
                            <AiOutlineLike size={20} />
                            <span className="text-xs">{post.likes || 0}</span>
                        </button>
                        <button
                            onClick={() => handleGoToComments(post._id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                        >
                            <AiOutlineComment size={20} />
                            <span className="text-xs">{post.comments.length || 0}</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
