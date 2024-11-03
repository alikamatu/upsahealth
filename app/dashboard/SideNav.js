"use client";
import './SideNav.scss';
import Logo from '../icons/CompanyLogo.png';
import Image from 'next/image';
import ProfilePhoto from '../assets/profile.jpg';
import { Analytics, AssistantRounded, ChatOutlined, DarkMode, Dashboard, LibraryBooksOutlined, SendRounded } from '@mui/icons-material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { useTheme } from '../ThemeContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialUISwitch from './conponent/MaterialUISwitch ';

export default function SideNav({ id }) {
    const { darkMode, toggleTheme } = useTheme();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);

    // Get localStorage data only on the client side
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedAvatar = localStorage.getItem('avatar');
        setUserId(storedUserId);
        setUserAvatar(storedAvatar);
    }, []);

    useEffect(() => {
        if (!userId) return; // Ensure `userId` is set before making the API call

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
                setUser(response.data); // Assuming the response contains the user object
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <aside className='h-screen w-[15%] p-4 border-r-[1px] border-[#80808042]'>
            <div className="h-[100%] p-4 flex flex-col justify-between items-center">
                <div className="top-aside flex flex-col justify-between items-center h-[60%]">
                    <div className="logo-section mb-2">
                        <Image src={Logo} alt="Logo here" />
                    </div>
                    <div className="user-section flex flex-col items-center gap-2">
                        <Image className='rounded-full object-cover' width={80} height={80} src={userAvatar || ProfilePhoto} alt="User avatar" />
                        <p className='text-xs name'>{user.profileName}</p>
                        <button className='px-2 text-xs rounded-full border-[1px] border-black'>Edit</button>
                    </div>
                    <div className="flex pt-4 flex-col items-start cursor-pointer text-xs justify-center">
                        <Link href="/dashboard">
                            <div className="flex gap-2 items-center bg-[#80808042] p-3 rounded-xl w-32">
                                <GridViewRoundedIcon size='30px' />
                                <p>Dashboard</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/blog">
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                                <SendRounded size='30px' />
                                <p>Share</p>
                            </div>
                        </Link>
                        <Link href="/dashboard">
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                                <ChatOutlined size='30px' />
                                <p>Chatroom</p>
                            </div>
                        </Link>
                        <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                            <LibraryBooksOutlined size='30px' />
                            <p>Library</p>
                        </div>
                        <Link href="/dashboard">
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                                <AssistantRounded size='30px' />
                                <p>AI ChatBot</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="modes-aside">
                    <MaterialUISwitch onChange={toggleTheme} />
                </div>
            </div>
        </aside>
    );
}
