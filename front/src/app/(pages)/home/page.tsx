'use client'
import { CardProfil } from '@/components/CardProfil'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import React from 'react'

const home = () => {
  return (
    <div className='flex justify-center flex-col place-self-center md:gap-5 text-sm md:text-base md:flex-row'>
        <div className='flex overflow-x-scroll md:hidden'>
          <ProfileUser button={false} col={true} pseudo='a'/>
          <ProfileUser button={false} col={true} pseudo='plus'/>
          <ProfileUser button={false} col={true} pseudo='d'/>
          <ProfileUser button={false} col={true} pseudo='idée'/>
        </div>
        <div className='w-11/12 md:w-2/3 mx-auto'>
          <Publication full={false}/>
          <Publication full={false}/>
        </div>
       <div className=' m-5 hidden md:block md:w-1/5'>
          <CardProfil/>
          <div className='flex flex-col gap-4 p-5'>
            <p className='text-gray-400 m-3 text-center'>Suggestion de profile</p>
            <ProfileUser button={true} col={false} pseudo='cou'/>
            <ProfileUser button={true} col={false} pseudo='cou'/>
          </div>
        </div>
    </div>
  )
}

export default home