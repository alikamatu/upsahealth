"use client";
import './SideNav.scss';
import Logo from '../icons/CompanyLogo.png';
import Image from 'next/image';
import ProfilePhoto from '../assets/profile.jpg';
import { AssistantRounded, SendRounded } from '@mui/icons-material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { useTheme } from '../ThemeContext';
import Link from 'next/link';
import MaterialUISwitch from './conponent/MaterialUISwitch ';
import { AiFillHeart, AiOutlineMessage, AiOutlineRead } from 'react-icons/ai';

export default function SideNav({ user, userAvatar }) {
    const { darkMode, toggleTheme } = useTheme();

    
    return (
        <aside className={`hidden md:w-[190px] h-screen w-[100%] p-4 border-r-[1px] border-[#80808042]`}>
            <div className="h-[100%] p-4 flex flex-col justify-between items-center">
                <div className="top-aside flex flex-col justify-between items-center h-[60%]">
                    <div className="logo-section mb-2">
                        <Image src={Logo} alt="Logo here" />
                    </div>
                    <div className="user-section flex flex-col items-center gap-2">
                        <Image className='rounded-full object-cover' width={80} height={80} src={userAvatar || ProfilePhoto} alt="User avatar" />
                        <p className='text-xs name'>{user.profileName}</p>
                        <Link  href="/dashboard/edit">
                        <button className='px-2 text-xs rounded-full border-[1px] border-black'>Edit</button>
                        </Link>
                    </div>
                    <div className="flex pt-4 flex-col items-start cursor-pointer text-xs justify-center">
                        <Link  href="/dashboard">
                            <div className="flex gap-2 items-center bg-[#80808042] p-3 rounded-xl w-32">
                                <GridViewRoundedIcon size='30px' />
                                <p>Dashboard</p>
                            </div>
                        </Link>
                        <Link  href="/dashboard/blog">
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                                <SendRounded size='30px' />
                                <p>Post</p>
                            </div>
                        </Link>
                        <Link  href="/dashboard/chatroom">
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                                <AiOutlineMessage size='30px' />
                                <p>Community</p>
                            </div>
                        </Link>
                        <Link  href="/dashboard/library">
                        <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                            <AiOutlineRead size='30px' />
                            <p>Library</p>
                        </div>
                        </Link>
                        <Link  href="/dashboard/ai">
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                                <AssistantRounded size='30px' />
                                <p>AI ChatBot</p>
                            </div>
                        </Link>
                        <Link  href="/dashboard/professionals">
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#80808042] p-3 rounded-xl w-32">
                                <AiFillHeart size='30px' />
                                <p>Help and Support</p>
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
