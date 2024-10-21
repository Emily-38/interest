'use client'
import { activateAccount } from '@/services/auth'
import { ParamsType } from '@/utils/parametre'
import React, { useEffect } from 'react'

const validateAccount = ({params}:ParamsType) => {
    useEffect(() => {
        activateAccount(params.token).then((res)=>{
            console.log(res.data)
        })
    }, [])
    
  return (
    <div>bravo</div>
  )
}

export default validateAccount