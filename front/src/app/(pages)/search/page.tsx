'use client'
import ProfileUser from '@/components/ProfileUser'
import React from 'react'

const search = () => {
  return (
    <div className={` md:flex flex flex-col items-center text-black h-lvh p-8 `}>
    <input placeholder='recherche' className='rounded-md border border-black p-1 text-center outline-none'></input>
        <div className='flex flex-col gap-3 m-4'>
            <ProfileUser button={false} col={false} pseudo='alfred'/>
            <ProfileUser button={false} col={false} pseudo='LaMamanDeRemy'/>
        </div>
    </div>
  )
}

export default search