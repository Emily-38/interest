'use client'
import { CardProfil } from '@/components/CardProfil'
import { MenuMobile } from '@/components/MenuMobile'
import { Navbar } from '@/components/Navbar'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import React from 'react'

const home = () => {
  return (
    <div className='md:grid grid-cols-4 text-sm md:text-base '>
       <Navbar/>
       <MenuMobile/>
       <div className='flex overflow-x-scroll md:hidden'>
        <ProfileUser button={false} col={true}/>
        <ProfileUser button={false} col={true}/>
        <ProfileUser button={false} col={true}/>
        <ProfileUser button={false} col={true}/>
       </div>
       <div className='col-span-2'>
            <Publication/>
            <Publication/>
       </div>
       <div className='justify-self-end m-5 hidden md:block'>
            <CardProfil/>
            <div className='flex flex-col gap-4 p-5'>
                <p className='text-gray-400 m-3 text-center'>Suggestion de profile</p>
                <ProfileUser button={true} col={false}/>
                <ProfileUser button={true} col={false} />
            </div>
        </div>
    </div>
  )
}

export default home