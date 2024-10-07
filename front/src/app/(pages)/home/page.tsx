'use client'
import { CardProfil } from '@/components/CardProfil'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import { getPubliction } from '@/services/publication'
import { PublicationType } from '@/utils/publication'
import React, { useEffect, useState } from 'react'

const home = () => {
  const [publicationList, setPublicationList]=useState<PublicationType[]>()
  useEffect(() => {
    getPubliction().then((res)=>{
      setPublicationList(res.data)
    })
    
  }, [])
  
  return (
    <div className='flex justify-center flex-col place-self-center md:gap-5 text-sm md:text-base md:flex-row'>
        <div className='flex overflow-x-scroll md:hidden'>
          <ProfileUser button={false} col={true} pseudo='a'/>
          <ProfileUser button={false} col={true} pseudo='plus'/>
          <ProfileUser button={false} col={true} pseudo='d'/>
          <ProfileUser button={false} col={true} pseudo='idée'/>
        </div>
        <div className='w-11/12 md:w-2/3 mx-auto'>
         {publicationList && publicationList.map((publication)=>{
          return(
            <Publication key={publication.id} full={false} publication={publication} />
          )
         })}
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