import React, { useEffect, useState } from 'react'
import ProfileUser from './ProfileUser'
import { IoCloseOutline } from 'react-icons/io5'
import { PublicationType } from '@/utils/publication'

export const MenuLikePublication = ({publication, isLike}:{publication:PublicationType,isLike:boolean}) => {
   const[isOpen,setIsOpen]=useState(false)
  const[compteurLike,setCompteurLike]=useState<number>(publication.like.length)
 useEffect(() => {
console.log(publication.like.length)
if(isLike === true){ 
setCompteurLike(compteurLike +1)}
else{
  setCompteurLike((prevCompteurLike) => Math.max(prevCompteurLike - 1, 0))}
 }, [isLike])
 
  return (
<div className=''>
    
    <button onClick={()=>{setIsOpen(!isOpen)}}>{compteurLike}</button>
    <div className={`${isOpen === true ? 'flex' :'hidden'} z-0 fixed bg-black opacity-20 top-0 left-0 w-screen h-screen`} onClick={()=>setIsOpen(false)}></div>
    <div className={`${isOpen === true ? 'flex' :'hidden'} fixed z-10 border rounded-md right-1/4 top-1/4 shadow-md w-1/2 md:w-1/3 bg-white flex-col items-center gap-3`}>  
       <div className='flex justify-between items-center p-3 w-full'>
            <p className='mx-auto'>8 likes</p> 
            <IoCloseOutline onClick={()=>setIsOpen(false)}/>
       </div>
        <div className='overflow-y-scroll h-48 md:h-1/2 px-5 w-full'>
            <ProfileUser button={false} col={false} pseudo={'jean'}/>
            <ProfileUser button={false} col={false} pseudo={'nais'}/>
            <ProfileUser button={false} col={false} pseudo={'marre'}/>
            <ProfileUser button={false} col={false} pseudo={'je'}/>
            <ProfileUser button={false} col={false} pseudo={'fait'}/>
            <ProfileUser button={false} col={false} pseudo={'nimporte'}/>
            <ProfileUser button={false} col={false} pseudo={'quoi'}/>
            <ProfileUser button={false} col={false} pseudo={'chellil'}/>
        </div>
    </div>
    
</div>
  )
}
