'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import ProfileUser from './ProfileUser'
import {  ModalCreatePublication } from './ModaleCreatePublication'
import { getCurrentUser, getSearch } from '@/services/user'
import { UserType } from '@/utils/user'

export const Navbar = () => {
    const router = useRouter() 
    const[activePage,setActivePage]=useState('')
    const[isSearch, setIsSearch]=useState(false)
    const[search,setSearch]=useState<UserType[]>()
    const[query,setQuery]=useState('')
    const[setting,setSetting]=useState<any>(null)
    const[user,setUser]=useState<UserType>()
    
    useEffect(() => {
       getCurrentUser().then((res)=>{
        setUser(res.data)
       })

       getSearch(query).then((res)=>{
        setSearch(res.data)
       })

     }, [query])

    useEffect(() => {
       setSetting(localStorage.getItem('page')) 
    }, [setting])
    
  return (
    <div >
    <aside className='hidden bg-white text-black  h-lvh w-1/5 fixed md:block '>
        <ul className='flex flex-col justify-around items-center h-lvh'>
            <Image width={1000} height={1000} src={'/logo_interest.png'} alt={'logo'} priority={true} className='w-52'/>
            
            <li className={`cursor-pointer`} onClick={()=>{
                router.push('/home')
                setActivePage('home')
            }}>
                Accueil
            </li>

            <li className='cursor-pointer' onClick={()=>{
                setIsSearch(true)
            }}>
                Recherche
            </li>
            <li className='cursor-pointer'>
                <ModalCreatePublication/>
            </li>

            <li className={`cursor-pointer`} onClick={()=>{
                router.push(`/profil/${user?.pseudo}`)
                setActivePage('profil')
            }}> 
                Profil
            </li>
            
            {user?.roleId === '833fb586-b957-47ff-b59c-3500a9224eb4'? <li  className='cursor-pointer' onClick={()=>{
                router.push('/admin/users')
                setSetting(localStorage.setItem('page','admin'))
            }}>Admin</li>:''}

            <li className='cursor-pointer' onClick={()=>{
                router.push('/setting/updateProfile')
                setActivePage('UpdateProfile')
                setSetting(localStorage.setItem('page','setting'))
            }}> 
                Parametre
            </li>
            
            <li className='cursor-pointer' onClick={()=>{
                router.push('/')
            }}>
                Déconnexion
            </li>
            <li className='text-sm text-gray-400 flex justify-center gap-5 flex-wrap'>
                <p className='cursor-pointer' onClick={()=>{
                    router.push('/confidentialiter')
                }} >Confidentialité</p> <p className='cursor-pointer' onClick={()=>{
                    router.push('/cgu')
                }}>Condition générales</p>
                <p className='cursor-pointer' onClick={()=>{
                    router.push('/contact')
                }}>Contact</p> <p>© Copyright 2024</p>
            </li>
        </ul>
       
    </aside>
    <aside className={`hidden md:flex ${isSearch === true ? '' : 'translate-x-[-200%]'} z-10 flex flex-col items-center bg-white text-black h-lvh w-1/5 fixed transform duration-300`}>
    <p className='flex items-center gap-2 p-3 self-start cursor-pointer' onClick={()=>{
        setIsSearch(false)
    }}><FaArrowLeftLong/>Retour</p>
    <input placeholder='recherche' className='rounded-md border border-black p-1 text-center outline-none' onChange={(e)=>{
        setQuery(e.target.value)
    }}></input>
        <div className='flex flex-col gap-3 m-4'>
            {search && search.map((user)=>{
                return <ProfileUser key={user.id} button={false} col={false} user={user}/> 
            })}
        </div>
    </aside>

    <aside className={`hidden md:flex ${setting === 'setting' ? '' : 'translate-x-[-100%]'} z-20 flex flex-col items-center bg-white text-black h-lvh w-1/5 fixed transform duration-300`}>
            <Image width={1000} height={1000} src={'/logo_interest.png'} alt={'logo'} className=' w-52'/>
            <h1 className='font-semibold text-xl'>Parametre</h1>
            <ul className='flex flex-col justify-around items-center h-lvh'>
            
            <li className={`${activePage ==='UpdateProfile'?'underline':''} cursor-pointer`} onClick={()=>{
                setActivePage('UpdateProfile')
                router.push('/setting/updateProfile')
            }}>
                Modifier le profil
            </li>

            <li className={`${activePage ==='confidentialiter'?'underline':''} cursor-pointer `} onClick={()=>{
               setActivePage('confidentialiter')
               router.push('/setting/confidentialiter')

            }}>
                Confidentialité du compte
            </li>
            <li className={`${activePage ==='personal'?'underline':''} cursor-pointer `} onClick={()=>{
               setActivePage('personal')
               router.push('/setting/personal')
            }}>
                Information personnelle
            </li>
            <li className='cursor-pointer' onClick={()=>{
                setSetting(localStorage.removeItem('page'))
                router.push('/home')
                setActivePage('home')
            }}>
               {` Retour à la page d'accueil`}
            </li>
           
            <li className='cursor-pointer' onClick={()=>{
                router.push('/') 
            }}>
                Déconnexion
            </li>
            <li className='text-sm text-gray-400 flex justify-center gap-5 flex-wrap'>
                <p className='cursor-pointer' onClick={()=>{
                    router.push('/confidentialiter')
                }} >Confidentialité</p> <p className='cursor-pointer' onClick={()=>{
                    router.push('/cgu')
                }}>Condition générales</p>
                <p className='cursor-pointer' onClick={()=>{
                    router.push('/contact')
                }}>Contact</p> <p>© Copyright 2024</p>
            </li>
        </ul>
    </aside>
    <aside className={`hidden md:flex ${setting === 'admin' ? '' : 'translate-x-[-100%]'} z-20 flex flex-col items-center bg-white text-black h-lvh w-1/5 fixed transform duration-300`}>
            <Image width={1000} height={1000} src={'/logo_interest.png'} alt={'logo'} className=' w-52'/>
            <h1 className='font-semibold text-xl'>Admin</h1>
            <ul className='flex flex-col justify-around items-center h-lvh'>
            <li className={`${activePage ==='users'?'underline':''} cursor-pointer`} onClick={()=>{
                setActivePage('users')
                router.push('/admin/users')
            }}>
                Users
            </li>

            <li className={`${activePage ==='publications'?'underline':''} cursor-pointer `} onClick={()=>{
               setActivePage('publicaions')
               router.push('/admin/publications')
            }}>
                Publications
            </li>
            <li className={`${activePage ==='commentaires'?'underline':''} cursor-pointer `} onClick={()=>{
               setActivePage('commentaires')
               router.push('/admin/commentaires')
            }}>
                Commentaires
            </li>
            <li className='cursor-pointer' onClick={()=>{
                setSetting(localStorage.removeItem('page'))
                router.push('/home')
                setActivePage('home')
            }}>
               {`Retour à la page d'accueil`}
            </li>
           
            <li className='cursor-pointer' onClick={()=>{
                localStorage.clear()
                router.push('/') 
            }}>
                Déconnexion
            </li>
            <li className='text-sm text-gray-400 flex justify-center gap-5 flex-wrap'>
                <p className='cursor-pointer' onClick={()=>{
                    router.push('/confidentialiter')
                }} >Confidentialité</p> <p className='cursor-pointer' onClick={()=>{
                    router.push('/cgu')
                }}>Condition générales</p>
                <p className='cursor-pointer' onClick={()=>{
                    router.push('/contact')
                }}>Contact</p> <p>© Copyright 2024</p>
            </li>
        </ul>
    </aside>
  </div>)
}
