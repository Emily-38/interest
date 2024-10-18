import React, { useEffect, useState } from 'react'
import ProfileUser from './ProfileUser'
import { UserType } from '@/utils/user'
import { getCurrentUser } from '@/services/user'

export const CardProfil = () => {
  const[user,setUser]=useState<UserType>()
  useEffect(() => {
    getCurrentUser().then((res)=>{
     
      setUser(res.data)
    })
  }, [])
  if(!user){
    return <div>Pas d'utilisateur </div>
  }
  
  return (
    <div className='bg-white shadow-md p-3 h-20'>
        <ProfileUser button={false} col={false} user={user}/>
    </div>
  )
}
