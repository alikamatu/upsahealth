import React from 'react';
import { 
    AiOutlineBook, AiOutlineClose, AiOutlineHeart, AiOutlineHome, 
    AiOutlineMessage, AiOutlineRead, AiOutlineRobot, 
    AiOutlineSetting
} from 'react-icons/ai';
import { useTheme } from '@/app/ThemeContext';
import { useRouter } from 'next/navigation';
import { SendRounded } from '@mui/icons-material';
import MaterialUISwitch from './MaterialUISwitch ';
import Link from 'next/link';

const MobileNav = ({ isSidebarVisible, toggleSidebar, user, userAvatar }) => {
    const router = useRouter();
    const { toggleTheme } = useTheme();

    const handleNavigation = (path) => {
        router.push(path);
        toggleSidebar()
    };

    return (
        <div 
            className={`hidden fixed top-0 left-0 bg-black/50 backdrop-blur-sm z-10 w-screen h-screen 
                transform transition-transform duration-300 ${isSidebarVisible ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex flex-col w-full h-full p-6 justify-between gap-8">
                <div className="flex justify-end">
                    <AiOutlineClose 
                        onClick={toggleSidebar} 
                        className="text-white text-2xl cursor-pointer"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <img 
                        src={userAvatar} 
                        className="w-[80px] h-[80px] rounded-full" 
                        alt="User Avatar" 
                    />
                    <div className="flex flex-col text-white">
                        <p className="text-lg font-semibold">{user.username}</p>
                        <p className="text-sm text-gray-300">{user.profileName}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {[
                        { icon: AiOutlineHome, label: 'Home', path: '/dashboard' },
                        { icon: SendRounded, label: 'Share', path: '/dashboard/blog' },
                        { icon: AiOutlineMessage, label: 'Community', path: '/dashboard/chatroom' },
                        { icon: AiOutlineRead, label: 'Library', path: '/dashboard/library' },
                        { icon: AiOutlineRobot, label: 'AI Assistance', path: '/dashboard/ai' },
                        { icon: AiOutlineHeart, label: 'Support and Professionals', path: '/dashboard/professionals' },
                    ].map(({ icon: Icon, label, path }, index) => (
                        <div
                            key={index}
                            onClick={() => handleNavigation(path)}
                            className="flex items-center gap-4 p-4 w-[60%] bg-black/50 rounded-3xl 
                                text-white hover:bg-black/70 cursor-pointer transition"
                        >
                            <Icon className="text-2xl" />
                            <p className="text-base">{label}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <MaterialUISwitch onChange={toggleTheme} />
                    <Link href="/edit" onClick={toggleSidebar}>
                    <AiOutlineSetting className='text-3xl'/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
