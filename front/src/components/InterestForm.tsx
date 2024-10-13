'use client'
import { InterestCreate, InterestType } from '@/utils/interest'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Badge } from './Badge'
import { createInterest, getRandomInterest } from '@/services/interest'
import { toast } from 'react-toastify'
import { UserType } from '@/utils/user'
import { PublicationType } from '@/utils/publication'


export const InterestForm = ({setInterestUser,user,publication}:{setInterestUser: Dispatch<SetStateAction<string[]>>,user?:UserType,publication?:PublicationType}) => {
    const[interestList,setInterestList]=useState<InterestType[]>()
    const[interestAdd,setInterestAdd]=useState<InterestType[]>([])
    const[interestNew,setInterestNew]=useState('')
    useEffect(() => {
        getRandomInterest().then((res)=>{
            setInterestList(res.data)
          })
         
    }, [])
    
    
    async function interestCreate(interest:string){
        createInterest(interest).then((res)=>{
        if(res.status === 201){
            setInterestAdd((prev) => {
            return [...prev, res.data];
            })
        }
        }).catch((e)=>(
            toast.error(e.response.data.message)
        )
        )
    }

    return (
    <div className='border bg-white  border-black p-2 rounded-md flex flex-col  '>
            <div className='p-3 flex gap-4 h-14 overflow-x-scroll'>
            {interestList && interestList.map((interest)=>{
                return( 
                <Badge key={interest.id} content={false} interest={interest} setInterestUser={setInterestUser} user={user?.interestId} publication={publication?.interestId}/> )})}
            </div>
            <div className='p-3 flex gap-4 overflow-x-scroll' >
            {interestAdd && interestAdd.map((interest)=>{
                return(<Badge  key={interest.id} content={false} interest={interest} setInterestUser={setInterestUser}/>)
                })}
            </div>
            <div className='self-center flex'>
                <input type="text" placeholder="Ajoute ton centre d'interet" className='appearance-none border-b-2 text-center outline-none border-b-gray-300' onChange={(e)=>{
                    setInterestNew(e.target.value)
                }}/>
                <p className='bg-primary w-20 text-white rounded-md p-1 text-center' onClick={()=>{
                    interestCreate(interestNew)
                }}>Ajouter</p>
            </div>
            
        </div>
  )
}
