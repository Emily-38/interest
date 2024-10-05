import Image from 'next/image'
import React, { useState } from 'react'
import { BiCommentDetail, BiSolidCommentDetail } from 'react-icons/bi'
import { FaBookmark, FaHeart } from 'react-icons/fa6'
import { Badge } from './Badge'
import { MenuSettingPublication } from './MenuSettingPublication'
import { MenuLikePublication } from './MenuLikePublication'

export const Publication = ({full}:{full:boolean}) => {
    const[isLike,setIsLike]= useState(false)
    const[isSave,setIsSave]= useState(false)
  return (
    <div className=' w-full md:w-full md:mt-10 bg-white  mx-auto col-span-2 rounded-md mt-5'>
        
        <div className='flex justify-between items-center pl-3 pr-3 m-2'>
            <div className='flex items-center gap-3 p-3 cursor-pointer'>
                <Image width={50} height={50} alt='Profile User' src='/chat.jpg' className='rounded-full h-10 w-10 object-cover'/>
                <p> Nom Utilisateur </p>
            </div>
            <MenuSettingPublication/>
        </div>

        <Image src={'/chat.jpg'} alt='Image de publication' width={1000} height={1000} className='mt-2 w-full'/>
        <div className='flex justify-between p-3'>
            <div>
                <ul className='flex gap-5 ml-4'>
                    <MenuLikePublication/>
                    <li>20</li>
                    <li>1</li>
                </ul>
                <div className='flex gap-3 ml-3 text-xl'>
                <button onClick={()=>{setIsLike(!isLike)}}>
                    <FaHeart className={`${isLike === true? 'text-red-600': 'text-red-300'}`}  />
                </button>
                    <BiSolidCommentDetail />
                    <button onClick={()=>{setIsSave(!isSave)}}>
                    <FaBookmark className={`${isSave === true? 'text-primary': 'text-sky-300'}`} />
                    </button>
                </div>
            </div>
            { full === true ? 
            <ul className='flex'>
                <li className='text-gray-400'><Badge content={true}/></li>
                <li className='text-gray-400'><Badge content={true}/></li>
                <li className='text-gray-400'><Badge content={true}/></li>
            </ul>
            :''}
        </div>
        <p className='text-center'> OH LE CHAT !!!</p>
        <p className='text-gray-400 text-xs text-right pr-3'>03/04/24 10:30</p>
        { full === true ? 
        <>
            <p className='text-gray-400 pl-3 '>Commentaires:</p>
            {}
            <div className='overflow-y-scroll max-w-full max-h-60'>
                <div className='flex justify-between md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                    <div className='flex flex-row items-center gap-2 md:text-base'>
                        <Image width={50} height={50} alt='Profile User' src='/profil_user.jpg' className='rounded-full h-10 w-10  md:h-12 md:w-12'/>
                        <p className='font-semibold'> Nom Utilisateur </p>
                        <p className='pr-5 text-center md:text-left'> test test test test test test test test test </p>
                    </div>
                    <p className='text-gray-400 text-xs text-right pr-3'>03/04/24 10:30</p>
                </div>

                <div className='flex justify-between md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                    <div className='flex flex-row items-center gap-2  md:text-base'>
                        <Image width={50} height={50} alt='Profile User' src='/profil_user.jpg' className='rounded-full h-10 w-10  md:h-12 md:w-12'/>
                        <p className='font-semibold'> Nom Utilisateur </p>
                        <p className='pr-5 text-center md:text-left'> test test test test test test test test test </p>
                    </div>
                    <p className='text-gray-400 text-xs text-right pr-3'>03/04/24 10:30</p>
                </div>

                <div className='flex justify-between md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                    <div className='flex flex-row items-center gap-2 md:text-base'>
                        <Image width={50} height={50} alt='Profile User' src='/profil_user.jpg' className='rounded-full h-10 w-10  md:h-12 md:w-12'/>
                        <p className='font-semibold'> Nom Utilisateur </p>
                        <p className='pr-5 text-center md:text-left'> test test test test test test test test test </p>
                    </div>
                    <p className='text-gray-400 text-xs text-right pr-3'>03/04/24 10:30</p>
                </div>
                <div className='flex justify-between md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                    <div className='flex flex-row items-center gap-2 md:text-base'>
                        <Image width={50} height={50} alt='Profile User' src='/profil_user.jpg' className='rounded-full h-10 w-10  md:h-12 md:w-12'/>
                        <p className='font-semibold'> Nom Utilisateur </p>
                        <p className='pr-5 text-center md:text-left'> test test test test test test test test test </p>
                    </div>
                    <p className='text-gray-400 text-xs text-right pr-3'>03/04/24 10:30</p>
                </div>
                <div className='flex justify-between md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                    <div className='flex flex-row items-center gap-2 md:text-base'>
                        <Image width={50} height={50} alt='Profile User' src='/profil_user.jpg' className='rounded-full h-10 w-10  md:h-12 md:w-12'/>
                        <p className='font-semibold'> Nom Utilisateur </p>
                        <p className='pr-5 text-center md:text-left'> test test test test test test test test test </p>
                    </div>
                    <p className='text-gray-400 text-xs text-right pr-3'>03/04/24 10:30</p>
                </div>
            </div>
        </>
        :<>
            <p className='text-gray-400 pl-3 '>Dernier commentaire:</p>
            <div className='flex flex-row items-center gap-2 pl-3 md:text-base'>
                <Image width={50} height={50} alt='Profile User' src='/profil_user.jpg' className='rounded-full h-10 w-10  md:h-12 md:w-12' />
                <p className='font-semibold'> Nom Utilisateur </p>
                <p className='truncate ... pr-5'> test test test test test test test test test </p>
            </div>
        </>
        }
        <div className='border border-black rounded-b-md flex'>
            <input type="text" placeholder='Ecrire un commentaire' className='md:p-3 p-2 flex w-full outline-none '></input>
            <button type='submit' className='md:p-3 p-2 bg-primary text-white'>Envoyer</button>
        </div>   
    </div>
  )
}
