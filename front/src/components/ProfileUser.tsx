import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfileUser = ({button,col}:{button:boolean,col:boolean}) => {
    
    
const router= useRouter()
    return (
    <div className={`flex ${col === true ?'flex-col flex-shrink-0':''} justify-center items-center gap-3 flex-nowrap cursor-pointer p-3`} onClick={()=>{
        router.push('/Profile/id')
    }}>
        <Image width={50} height={50} alt='Profile user' src={'/chat.jpg'} className=' object-cover rounded-full h-12 w-12'/>
        <p>Nom utilisateur</p>
    {button === true ?
     <button className='bg-primary text-white rounded-md p-1'>Suivre</button>
    :''}
    </div>
  )
}

export default ProfileUser