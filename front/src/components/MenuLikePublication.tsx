import React, { useEffect, useState } from 'react'
import ProfileUser from './ProfileUser'
import { IoCloseOutline } from 'react-icons/io5'
import { PublicationType } from '@/utils/publication'
import { UserType } from '@/utils/user'
import { getUserById } from '@/services/user'

export const MenuLikePublication = ({publication, compteurLike, isReload}:{publication:PublicationType,isReload:boolean,compteurLike:number}) => {
   const[isOpen,setIsOpen]=useState(false)
   const[userList,setUserList]=useState<UserType[]>([])

 useEffect(() => {
if (publication.like) {
  publication.like.forEach(id => {
      getUserById(id).then((res) => {
          setUserList((prev) => {
              const newUser = res.data;
              const userExists = prev.some(user => user.id === newUser.id);

              if (!userExists) {
                  return [...prev, newUser];
              } 
              return prev;
          });
      });
  });
}
  }, [publication.like,isReload])
 

  return (
<div className=''>
    
    <button onClick={()=>{setIsOpen(!isOpen)}}>{compteurLike}</button>
    <div className={`${isOpen === true ? 'flex' :'hidden'} z-0 fixed bg-black opacity-20 top-0 left-0 w-screen h-screen`} onClick={()=>setIsOpen(false)}></div>
    <div className={`${isOpen === true ? 'flex' :'hidden'} fixed z-10 border rounded-md right-1/4 top-1/4 shadow-md w-1/2 md:w-1/3 bg-white flex-col items-center gap-3`}>  
       <div className='flex justify-between items-center p-3 w-full'>
            <p className='mx-auto'>{compteurLike} likes</p> 
            <IoCloseOutline onClick={()=>setIsOpen(false)}/>
       </div>
       <div className='overflow-y-scroll h-48 md:h-1/2 px-5 w-full'>
      
      {userList && userList.map((user)=>{ 
         
      return <ProfileUser key={user.id} button={false} col={false} user={user}/> })}
          
        </div>
    </div>
    
</div>
  )
}
