'use client'
import { Badge } from '@/components/Badge'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import { ParamsType } from '@/utils/parametre'
import React from 'react'
import { FaCircle } from 'react-icons/fa6'

const page = ({params}:ParamsType) => {
  return (
    <div>
        <div className='flex justify-around items-center'> 
            <ProfileUser col={true} button={false} pseudo={params.pseudo}/>
            <div>
                <ul className='flex gap-5 mb-5'>
                  <li>12 Publication</li>
                  <li>100 Abonnés</li>
                  <li>105 Suivis</li> </ul>
                <ul className='flex gap-5 text-center'>
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
            <button className='bg-primary text-center rounded-md w-1/6 text-white p-3'>Suivre</button>
        </div>
        <div className='w-2/3 mx-auto'>
        <Publication/>
        <Publication/>
        <Publication/>
        </div>
    </div>
  )
}

export default page