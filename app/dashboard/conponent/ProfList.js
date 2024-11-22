"use client"
import Image from 'next/image';
import ProfPhoto from '../assets/prof.JPG';
import { StarBorderOutlined } from '@mui/icons-material';
import { useUserContext } from '../context/userContext';


export default function ProfList() {

    const {user} = useUserContext();

    return(
        <div className="flex flex-col p-8 gap-4">
            <p>Hey <span className='font-semibold text-xl'>{user.username}</span>, get in touch with the best Therapist in world</p>
            <div className="flex flex-wrap md:flex-col w-full justify-between items-center">
            <div className="flex flex-col gap-2 w-[48%] md:w-[30%] border border-[#80808042] p-3 items-center justify-center">
                <div className="overflow-hidden w-[70px] h-[70px] md:w-[140px] md:h-[140px] rounded-full">
                <Image src={ProfPhoto} alt='profile' />
                </div>
                <p className='font-bold text-sm'>Jane Doe</p>
                <p className='text-xs text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, laborum! Tempora perspiciatis voluptas omnis asperiores alias magnam sapiente.</p>
                <div className="flex">
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    </div>
                    <button className='border border-[#80808042] bg-transparent p-2 w-36 '>View Profile</button>
            </div>
            <div className="flex flex-col gap-2 w-[48%] md:w-[30%] border border-[#80808042] p-3 items-center justify-center">
                <div className="overflow-hidden w-[70px] h-[70px] md:w-[140px] md:h-[140px] rounded-full">
                <Image src={ProfPhoto} alt='profile' />
                </div>
                <p className='font-bold text-sm'>Jane Doe</p>
                <p className='text-xs text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, laborum! Tempora perspiciatis voluptas omnis asperiores alias magnam sapiente.</p>
                <div className="flex">
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    </div>
                    <button className='border border-[#80808042] bg-transparent p-2 w-36 '>View Profile</button>
            </div>
            </div>
        </div>
    )
}