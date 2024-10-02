'use client'
import { BlockShadow } from '@/components/BlockShadow'
import { CardProfil } from '@/components/CardProfil'
import { Navbar } from '@/components/Navbar'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import React from 'react'

const home = () => {
  return (
    <div className='grid grid-cols-4 '>
       <Navbar/> 
       <div className='col-span-2'>
        <Publication/>
        <Publication/>
       </div>
       <div className='justify-self-end m-5 '>
            <CardProfil/>
            <div className='flex flex-col gap-4 p-5'>
            <p className='text-gray-400 m-3 text-center'>suggestion de profile</p>
            <ProfileUser button={true} />
            <ProfileUser button={true} />
            </div>
        </div>
    </div>
  )
}

export default home