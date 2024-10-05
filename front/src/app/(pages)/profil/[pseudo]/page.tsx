'use client'
import { Badge } from '@/components/Badge'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import { ParamsType } from '@/utils/parametre'
import React from 'react'
import { FaCircle } from 'react-icons/fa6'

const page = ({params}:ParamsType) => {
  return (
    <div className='p-3'>
        <div className='flex  gap-10 md:justify-around items-center'> 
            <ProfileUser col={true} button={false} pseudo={params.pseudo}/>
            <div>
                <ul className='flex gap-10 md:gap-5 mb-5'>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'><p>12</p> Publications </li>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'>
                    <p>100</p>
                    Abonnés
                  </li>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'> 
                    <p>105</p>
                    Suivis
                  </li>
                </ul>
                <ul className='hidden md:flex gap-5 text-center'>
                  <li>
                    <Badge content={true}/>
                  </li> 
                  <FaCircle className='self-center text-xs'/>
                  <li>
                    <Badge content={true}/>
                  </li>
                  <FaCircle className='self-center text-xs'/>
                  <li>
                    <Badge content={true}/>
                  </li>
                </ul>
            </div>
            <button className='hidden md:block bg-primary text-center rounded-md w-1/6 text-white p-3'>Suivre</button>
        </div>
        <div className="md:hidden flex justify-between">
        <ul className='flex text-center'>
                  <li>
                    <Badge content={true}/>
                  </li> 
                  <FaCircle className='self-center text-xs'/>
                  <li>
                    <Badge content={true}/>
                  </li>
                  <FaCircle className='self-center text-xs'/>
                  <li>
                    <Badge content={true}/>
                  </li>
                </ul>
                <button className=' bg-primary text-center rounded-md w-1/4 text-white p-1'>Suivre</button>
        </div>
        <div className='w-10/12 md:w-2/3 mx-auto'>
          <Publication full={false}/>
          <Publication full={false}/>
          <Publication full={false}/>
        </div>
    </div>
  )
}

export default page