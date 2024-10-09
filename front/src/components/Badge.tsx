import { InterestType } from '@/utils/interest'
import React, { useEffect, useState } from 'react'

export const Badge = ({content,interest,setInterestUser}:{content:boolean,interest:InterestType,setInterestUser?: React.Dispatch<React.SetStateAction<string[]>>}) => {
    const[isActive,setIsActive]=useState(false)
    useEffect(() => {
      if(setInterestUser && isActive === true){
        setInterestUser((prev: string[])=>{
          return [...prev, interest.id]
        })
      }
    }, [isActive])
   
  return (
    <div  className={`${isActive === true ? 'bg-primary text-white':''} ${content === true? '':'border border-black'} cursor-pointer rounded-md  p-1`} onClick={()=>{
      if(content !== true){
        setIsActive(!isActive)
      }
    }}>
       <span className='whitespace-nowrap'>{interest.name}</span>
    </div>
  )
}
