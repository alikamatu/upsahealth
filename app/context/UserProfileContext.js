"use client"
import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(null);
    const [profileName, setProfileName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    console.log(avatar);
    

    return (
        <UserProfileContext.Provider value={{ avatar, setAvatar, profileName, setProfileName, age, setAge, gender, setGender }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => useContext(UserProfileContext);
