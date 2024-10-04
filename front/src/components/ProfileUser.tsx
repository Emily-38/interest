import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfileUser = ({button,col,pseudo}:{button:boolean,col:boolean,pseudo:string}) => {
    
    
const router= useRouter()
    return (
    <div className={`flex ${col === true ?'flex-col flex-shrink-0 p-3':''} justify-center items-center gap-3 flex-nowrap cursor-pointer `} onClick={()=>{
        router.push('/profil/id')
    }}>
        <Image width={1000} height={1000} alt='Profile user' src={'/chat.jpg'} className={`object-cover rounded-full h-12 w-12 ${col === true? 'md:w-32 md:h-32':''} `}/>
        <p>{pseudo}</p>
    {button === true ?
     <button className='bg-primary text-white rounded-md p-1'>Suivre</button>
    :''}
    </div>
  )
}

export default ProfileUser