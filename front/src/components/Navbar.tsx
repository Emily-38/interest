'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import ProfileUser from './ProfileUser'

export const Navbar = () => {
    const router = useRouter() 
    const[isActive, setIsActive]=useState(false)
    async function search(){
            setIsActive(!isActive)
    }
  return (
    <div>
    <aside className='hidden bg-white text-black h-lvh w-1/5 fixed md:block '>
        <ul className='flex flex-col justify-around items-center h-lvh  '>
            <Image width={100} height={100} src={'/logo_interest.png'} alt={'logo'} />
            <li className='cursor-pointer' onClick={()=>{
                router.push('#')
            }}>Notification</li>
            <li className='cursor-pointer' onClick={()=>{
                search()
            }}>
                Recherche</li>
            <li className='cursor-pointer' onClick={()=>{
                router.push('#')
            }}>Crée une publication</li>
            <li className='cursor-pointer'>Profile</li>
            <li className='cursor-pointer' onClick={()=>{
                router.push('#')
                }}>Parametre</li>
            <li className='cursor-pointer'>Déconnexion</li>
            <li className='text-sm text-gray-400 flex justify-center gap-5 flex-wrap'>
                <p >Confidentialité</p> <p>Condition générales</p>
                <p>Contact</p> <p>© Copyright 2024</p>
            </li>
        </ul>
       
    </aside>
    <aside className={`hidden md:flex ${isActive ? 'block' : 'translate-x-[-100%]'} z-10 flex flex-col items-center bg-white text-black h-lvh w-1/5 fixed transform duration-300`}>
    <p className='flex items-center gap-2 p-3 self-start cursor-pointer' onClick={()=>{
        search()
    }}><FaArrowLeftLong/>Retour</p>
    <input placeholder='recherche' className='rounded-md border border-black p-1 text-center outline-none'></input>
        <div className='flex flex-col gap-3 m-4'>
            <ProfileUser button={false} col={false}/>
            <ProfileUser button={false} col={false}/>
        </div>
    </aside>
  </div>)
}
