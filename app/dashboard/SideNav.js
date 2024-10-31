import './SideNav.scss'
import Logo from '../icons/CompanyLogo.png';
import Image from 'next/image';
import ProfilePhoto from '../assets/profile.jpg'
import { Analytics, AssistantRounded, ChatOutlined, DarkMode, Dashboard, LibraryBooksOutlined, SendRounded } from '@mui/icons-material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MaterialUISwitch from './conponent/MaterialUISwitch ';
import { useTheme } from '../ThemeContext';
import Link from 'next/link';

export default function SideNav() {

    const { darkMode, toggleTheme } = useTheme();

    return (
        <aside className='h-screen w-[15%] p-4 border-r-[1px] border-[#80808042]'>
           <div className="h-[100%] p-4 flex flex-col justify-between items-center">
           <div className="top-aside flex flex-col justify-between items-center h-[60%]">
                <div className="logo-section">
                    <Image src={Logo} alt="Logo here" />
                </div>
                <div className="user-section flex flex-col items-center gap-2">
                <Image className='rounded-full object-cover' width={80} src={ProfilePhoto} alt="Logo here" />
                <p className='text-xs name'>Alikamatu Osama</p>
                <button className='px-2 text-xs rounded-full border-[1px] border-black' >Edit</button>
                </div>
                <div className="flex flex-col items-start cursor-pointer text-xs justify-center">
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
    )
}