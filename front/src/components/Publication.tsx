import Image from 'next/image'
import React, { useState } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { FaHeart, FaRegBookmark } from 'react-icons/fa6'
import { FcLikePlaceholder } from 'react-icons/fc'
import { SlOptions } from 'react-icons/sl'

export const Publication = () => {
    const[isActive,setIsActive]= useState(false)
    async function like(){
        console.log(isActive)
        setIsActive(!isActive)
    }

  return (
    <div className=' bg-white w-full col-span-2 rounded-md mt-10'>
        <div className='flex justify-between items-center pl-3 pr-3 m-2'>
            <div className='flex items-center gap-3 p-3 cursor-pointer'>
                <Image width={50} height={50} alt='Profile User' src='/chat.jpg' className='rounded-full h-10 w-10 object-cover'/>
                <p> Nom Utilisateur</p>
            </div>
            <SlOptions className='cursor-pointer'/>
        </div>
        <Image src={'/chat.jpg'} alt='Image de publication' width={1000} height={1000} className='mt-2 w-full'/>
        <div className='flex gap-4 ml-3'>
            <p>10</p>
            <p>20</p>
            <p>1</p>
        </div>
        <div className='flex gap-3 ml-3 text-xl'>
            <FaHeart className={`${isActive === true? 'text-red-600': 'text-red-300'} `} onClick={()=>{
                like()
            }} />
            <BiCommentDetail />
            <FaRegBookmark />
        </div>
        <p className='text-center'>OH LE CHAT !!!</p>
        <p className='text-gray-400 pl-3 '>Dernier commentaire:</p>
        <div className='flex flex-row items-center gap-2'>
            <Image width={50} height={50} alt='Profile User' src='/profil_user.jpg' className='rounded-full'/>
            <p className='font-semibold'> Nom Utilisateur </p>
            <p> OH ! la chatte tu veux dire ? </p>
        </div>
        <div className='border border-black rounded-b-md flex'>
            <input type="text" placeholder='Ecrire un commentaire' className='p-3 flex w-full outline-none '></input>
            <button type='submit' className='p-3 bg-primary'>Envoyer</button>
        </div>   
    </div>
  )
}
