import React from 'react'
import { useUserContext } from '../../context/userContext'
import Emoji from '../../assets/vcalm.png'
import Image from 'next/image';

const VeryCalm = () => {

    const {user, userAvatart} = useUserContext();

  return (
    <div className='flex w-screen h-screen bg-wallpaper bg-fixed text-white'>
        <div className="flex w-full justify-center items-start">
        <div className="md:flex flex-col-reverse w-full justify-center m-8 items-center bg-black/20 backdrop-blur-3xl backdrop-brightness-200 rounded-2xl ">
        <div className="flex w-[40%]">
            <p className='text-4xl'>Hey, <span className='text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-blue-900 via-purple-800 to-blue-800'>{user.username}</span> you doing <br /> 
            <span className='text-9xl font-bold uppercase'>great</span></p>
        </div>
        <div className="flex transition popanim">
            <Image src={Emoji} className='w-[700px]' alt="" />
        </div>
      </div>

        </div>
    </div>
  )
}

export default VeryCalm
