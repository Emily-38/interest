'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const About = () => {
    const router = useRouter()
  return (
    <div>
        <ul className='flex flex-col justify-center gap-5 items-center' >
            <li onClick={()=>{
            router.push('/confidentialiter')
            }}>Confidentialitée</li>

            <li onClick={()=>{
            router.push('/cgu')
            }}>Conditions generales</li>
        
            <li onClick={()=>{
            router.push('/contact')
            }}>Contact</li>
            
            <li>© Copyright 2024</li>
        </ul>   
    </div>
  )
}

export default About