// components/AddPost.js

import { useState, useRef, useEffect } from "react";
import EmojiPicker from 'emoji-picker-react';
import { useUserContext } from "../context/userContext";

export default function AddPost({ fetchPosts }) {  // Accept fetchPosts as prop
    const [caption, setCaption] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, userAvatar } = useUserContext();
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [caption]);

    const handleEmojiSelect = (emoji) => {
        setCaption(caption + emoji.emoji);
        setShowEmojiPicker(false);
    };

    const handleShare = async () => {
        if (!caption.trim()) return alert("Caption cannot be empty.");
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/post/addpost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: localStorage.getItem('userId'),
                    userName: user.profileName,
                    avatarUrl: userAvatar,
                    caption
                })
            });

            if (response.ok) {
                setCaption("");
                fetchPosts();  // Call fetchPosts after adding a new post
                alert("Post shared success[100%]y!");
            } else {
                throw new Error("Failed to share post.");
            }
        } catch (error) {
            console.error("Error sharing post:", error);
            alert("Error sharing post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between w-[100%] p-4">
            <div className="relative w-[100%] flex items-center justify-between">
                <textarea
                    ref={textareaRef}
                    className="w-[100%] p-3 text-xs border border-blue-500 rounded-2xl focus:outline-none bg-transparent resize-none overflow-hidden"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's on your mind?"
                    rows={1}
                    onFocus={() => setShowEmojiPicker(false)}
                    style={{
                        scrollbarWidth: "none",  // Firefox
                        msOverflowStyle: "none", // IE and Edge
                    }}
                />

                <button
                    className="absolute right-2 bottom-2 text-gray-500 hover:text-blue-500"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    😊
                </button>
                {showEmojiPicker && (
                    <div className="absolute top-12 left-0 z-10">
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    </div>
                )}
            </div>
            <div className="ml-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
                    onClick={handleShare}
                    disabled={loading}
                >
                    {loading ? "Sharing..." : "Share"}
                </button>
            </div>
        </div>
    );
}
