import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ModalCreatePublication } from './ModaleCreatePublication'
import { useRouter } from 'next/navigation'
import { UserType } from '@/utils/user'
import { getCurrentUser } from '@/services/user'

export const MenuMobile = () => {
const[isActive,setIsActive]=useState(false)
const[user, setUser]=useState<UserType>()

useEffect(() => {
  getCurrentUser().then((res)=>{
    setUser(res.data)
  })
}, [])

const router = useRouter()

  return (
  <div className='relative md:hidden '>
    <div className='bg-white z-20 flex justify-between items-center w-full p-4 static'>
        <GiHamburgerMenu className='text-4xl cursor-pointer' onClick={()=>{
            setIsActive(!isActive)
        }} />
        <div className='flex items-center font-semibold gap-5' onClick={()=>{
              router.push(`/profil/${user?.pseudo}`)
              setIsActive(false)
        }}>
            <p>{user?.pseudo}</p>
            <Image src={'/chat.jpg'} alt='Profile user' height={50} width={50} className='object-cover rounded-full h-12 w-12'/>
        </div>
    </div>
        <ul className={`${isActive ? 'flex': 'translate-y-[-150%]'} z-10 absolute top-20 w-full left-0 bg-white flex flex-col gap-5 items-center transform transition-all duration-300`}>
        <li className='cursor-pointer' onClick={()=>{
                router.push('/home')
                setIsActive(false)
            }}>Accueil</li>
            <li className='w-4/5'><hr/></li>
            <li className='cursor-pointer' onClick={()=>{
                router.push('/search')
                setIsActive(false)
            }}>Recherche</li>
           <li className='w-4/5'> <hr/></li>
            <li className='cursor-pointer'><ModalCreatePublication/></li>
            <li className='w-4/5'><hr/></li>
            <li className='cursor-pointer' onClick={()=>{
                router.push(`/profil/${user?.pseudo}`)
                setIsActive(false)
            }}>Profil</li>
           <li className='w-4/5'> <hr /></li>
            <li className='cursor-pointer' onClick={()=>{
                router.push('/setting/updateProfile')
                setIsActive(false)
            }}>Parametre</li>
           <li className='w-4/5'> <hr /></li>
            <li className=' cursor-pointer' onClick={()=>{
                router.push('/about')
                setIsActive(false)
            }}>A propos</li>
           <li className='w-4/5'> <hr /></li>
            <li className='pb-6 cursor-pointer' onClick={()=>{
                router.push('/')
                localStorage.clear()
            }}>Deconnexion</li>
        </ul>
    </div>)
}
