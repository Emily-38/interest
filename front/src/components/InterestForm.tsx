'use client'
import { InterestCreate, InterestType } from '@/utils/interest'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Badge } from './Badge'
import { createInterest, getInterest } from '@/services/interest'
import { toast } from 'react-toastify'


export const InterestForm = ({setInterestUser}:{setInterestUser: Dispatch<SetStateAction<string[]>>}) => {
    const[interestList,setInterestList]=useState<InterestType[]>()
    const[interestAdd,setInterestAdd]=useState<InterestType[]>([])
    const[interestNew,setInterestNew]=useState('')
    useEffect(() => {
        getInterest().then((res)=>{
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
    <div className='border border-black p-2 rounded-md flex flex-col  '>
            <div className='p-3 flex gap-4 h-14 overflow-x-scroll'>
            {interestList && interestList.map((interest)=>{
                return( 
                <Badge key={interest.id} content={false} interest={interest} setInterestUser={setInterestUser}/> )})}
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
                <p className='bg-primary w-20 text-white rounded-md p-1' onClick={()=>{
                    interestCreate(interestNew)
                }}>Ajouter</p>
            </div>
            
        </div>
  )
}
