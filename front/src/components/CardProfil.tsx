import React from 'react'
import { BlockShadow } from './BlockShadow'
import Image from 'next/image'
import { Badge } from './Badge'
import ProfileUser from './ProfileUser'

export const CardProfil = () => {
  return (
    <div className='bg-white shadow-md p-3 h-20'>
        <ProfileUser button={false} col={false} pseudo={'roger'}/>
    </div>
  )
}
