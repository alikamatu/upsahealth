"use client"
import React, { useState } from "react";
import axios from "axios";

export default function EditPage() {
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("/avatars/default.png");
    const [userId] = useState(1); // Mock user ID, replace with actual user ID from context/auth

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.put("/api/user/update-profile", {
                userId,
                profileName,
                password,
                avatarUrl,
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        }
    };

    return (
        <div className="flex flex-col items-start p-6">
            <h1 className="text-2xl mb-10">Edit your profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-md">
                {/* Profile Name */}
                <div className="flex flex-col">
                    <label htmlFor="profileName" className="text-gray-500">
                        Change your Profile Name
                    </label>
                    <input
                        type="text"
                        id="profileName"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="border-2 border-gray-400 w-full mt-2 rounded-xl px-2 py-2 text-lg focus:outline-none bg-transparent"
                        placeholder="Enter your new profile name"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-gray-500">
                        Change Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-gray-400 w-full mt-2 rounded-xl px-2 py-2 text-lg focus:outline-none bg-transparent"
                        placeholder="Enter new password"
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="text-gray-500">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-2 border-gray-400 w-full mt-2 rounded-xl px-2 py-2 text-lg focus:outline-none bg-transparent"
                        placeholder="Confirm new password"
                    />
                </div>

                {/* Avatar */}
                <div className="flex flex-col">
                    <label htmlFor="avatarUrl" className="text-gray-500">
                        Avatar URL
                    </label>
                    <input
                        type="text"
                        id="avatarUrl"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="border-2 border-gray-400 w-full mt-2 rounded-xl px-2 py-2 text-lg focus:outline-none bg-transparent"
                        placeholder="/avatars/avatar.png"
                    />
                    {avatarUrl && (
                        <div className="mt-4">
                            <img
                                src={avatarUrl}
                                alt="Preview"
                                className="w-24 h-24 rounded-full border"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
