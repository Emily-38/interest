'use client'
import { activateAccount } from '@/services/auth'
import { ParamsType } from '@/utils/parametre'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ValidateAccount = ({params}:ParamsType) => {
    const router = useRouter()
    useEffect(() => {
        activateAccount(params.token)
    }, [params.token])
    
  return (
    <div>
        <Image width={1000} height={1000} src={'/logo_interest.png'} alt={'logo'} priority={true} className='w-52 mx-auto'/>
        <p className='text-center'>Votre compte a bien été verifié vous pouvez à present vous connecter 
            <span className='cursor-pointer font-semibold hover:underline' onClick={()=>{
                router.push('/')
            }}> ici</span>
        </p>     
    </div>
  )
}

export default ValidateAccount