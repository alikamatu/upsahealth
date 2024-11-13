"use client"; // Ensure this file is treated as a client component

import { useState, useEffect, useRef } from "react";
import { useParams } from 'next/navigation'; // Use useParams instead of useRouter for dynamic segments
import { useUserContext } from "@/app/dashboard/context/userContext";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

export default function CommentPage() {
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const textareaRef = useRef(null);
    const { user, userAvatar } = useUserContext();
    const params = useParams(); // Access dynamic route parameters
    const postId = params?.id; // Retrieve postId from params

    // Fetch the post data once the postId is available
    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {
                try {
                    const response = await fetch(`https://healthbackend.vercel.app/api/post/fetchpost/${postId}`);
                    if (response.ok) {
                        const postData = await response.json();
                        setPost(postData);
                    } else {
                        console.error("Failed to fetch post data");
                    }
                } catch (error) {
                    console.error("Failed to fetch post:", error);
                }
            };
            fetchPost();
        }
    }, [postId]);

    // Handle comment submission
    const handleCommentSubmit = async () => {
        try {
            const response = await fetch(`https://healthbackend.vercel.app/api/post/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatarUrl: userAvatar, userName: user.profileName, text: newComment })
            });
            if (response.ok) {
                const updatedPost = await response.json();
                setPost(updatedPost); // Update post with new comment
                setNewComment(""); // Clear input field
            } else {
                console.error("Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleLike = async (postId, index) => {
        try {
            const response = await fetch(`https://healthbackend.vercel.app/api/post/${postId}/like`, {
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

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [newComment]);

    const handleEmojiSelect = (emoji) => {
        setCaption(caption + emoji.emoji);
        setShowEmojiPicker(false);
    };

    // Display loading indicator if post data has not loaded yet
    if (!post) return <p>Loading...</p>;

    console.log(post.comments);
    

    return (
        <div className="w-full p-4 mt-6 space-y-6">
            <div className="">
                <div className="flex items-center mb-3">
                    <div className="mr-4">
                        <img src={post.avatarUrl} alt="avatar" className="rounded-full w-12 h-12" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{post.userName}</h3>
                        <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                <div className="mb-3">
                    <p>{post.caption}</p>
                </div>
                <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={() => handleLike(post._id, index)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                        >
                            <AiOutlineLike size={20} />
                            <span className="text-xs">{post.likes || 0}</span>
                        </button>
                        <button
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                        >
                            <AiOutlineComment size={20} />
                            <span className="text-xs">{post.comments.length || 0}</span>
                        </button>
                    </div>
                <div className="mt-6">
                    <textarea
                    ref={textareaRef}
                    value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-3 text-xs border border-blue-500 rounded-2xl focus:outline-none bg-transparent resize-none overflow-hidden"
                        rows={1}
                        placeholder="Write a comment..."
                        style={{
                            scrollbarWidth: "none",  // Firefox
                            msOverflowStyle: "none", // IE and Edge
                        }}
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-2xl"
                    >
                        Post Comment
                    </button>
                </div>
                <p className="mt-4 border-b pb-2 border-[#80808042]">Replies</p>
                <div className="space-y-4 mt-6">
                    {post.comments.map((comment, index) => (
                        <div key={index} className="flex gap-4">
                        <img src={comment.avatarUrl} alt="avatar" className="rounded-full w-12 h-12" />
                            <div className="">
                            <p className="font-semibold">{comment.userName}</p>
                            <p className="text-xs">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
