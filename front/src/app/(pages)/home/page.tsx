'use client'
import { Navbar } from '@/components/Navbar'
import { Publication } from '@/components/Publication'
import React from 'react'

const home = () => {
  return (
    <div className='grid grid-cols-4'>
       <Navbar/> 
       <Publication/>
    </div>
  )
}

export default home