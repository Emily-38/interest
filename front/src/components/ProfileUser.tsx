import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfileUser = () => {
const router= useRouter()
    return (
    <div className='flex justify-center items-center' onClick={()=>{
        router.push('/Profile/id')
    }}>
        <Image width={50} height={50} alt='Profile user' src={'/profil_user.jpg'} className='rounded-full'/>
        <p>Nom utilisateur</p>
    </div>
  )
}

export default ProfileUser