import Image from 'next/image'
import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export const MenuMobile = () => {
const[isActive,setIsActive]=useState(false)
  return (<div className='relative md:hidden '>
    <div className='bg-white z-20 flex justify-between items-center w-full p-4 static'>
        <GiHamburgerMenu className='text-4xl cursor-pointer' onClick={()=>{
            setIsActive(!isActive)
        }} />
        <div className='flex items-center font-semibold gap-5'>
            <p>Nom Utilisateur</p>
            <Image src={'/chat.jpg'} alt='Profile user' height={50} width={50} className='object-cover rounded-full h-12 w-12'/>
        </div>
    </div>
        <ul className={`${isActive ? 'flex': 'translate-y-[-150%]'} z-0 absolute top-20 w-full left-0 bg-white flex flex-col gap-5 items-center transform transition-all duration-300`}>
            <hr className='w-4/5'/>
            <li>Notification</li>
            <hr className='w-4/5'/>
            <li>Recherche</li>
            <hr className='w-4/5'/>
            <li>Crée une publication</li>
            <hr className='w-4/5'/>
            <li>Profile</li>
            <hr className='w-4/5'/>
            <li>Parametre</li>
            <hr className='w-4/5'/>
            <li>A propos</li>
            <hr className='w-4/5'/>
            <li className='pb-6'>Deconnexion</li>
        </ul>
    </div>)
}
