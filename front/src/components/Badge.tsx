import { InterestType } from '@/utils/interest'
import { UserType } from '@/utils/user'
import React, { useEffect, useState } from 'react'

export const Badge = ({content,interest,setInterestUser,user,publication}:{content:boolean,interest:InterestType,setInterestUser?: React.Dispatch<React.SetStateAction<string[]>>, user?:InterestType[],publication?:string[]}) => {
    const[isActive,setIsActive]=useState(false)
    const[interestAdd,setInterestAdd]=useState(false)

    useEffect(() => {
      if(setInterestUser && interestAdd === true ){
        setInterestUser((prev: string[]) => {
          if (prev.includes(interest.id)) {
              return prev.filter((id) => id !== interest.id);
          } else {
              return [...prev, interest.id];
          }
        })
      }
    }, [isActive])
      
    useEffect(() => {
      if(user){
          const interestUser= user.some(item => item.id === interest.id );
          if(interestUser === true ){
            setIsActive(true)
          }
         }
   
    }, [])
    
      
    
  return (
    <div  className={`${isActive === true ? 'bg-primary text-white':''} ${content === true? '':'border border-black'} cursor-pointer h-10 rounded-md  p-2`} onClick={()=>{
      if(content !== true){
        setIsActive(!isActive)
        setInterestAdd(true)
      }
    }}>
       <span className='whitespace-nowrap'>{interest.name}</span>
    </div>
  )
}
