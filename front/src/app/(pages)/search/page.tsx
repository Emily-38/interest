'use client'
import ProfileUser from '@/components/ProfileUser'
import { getSearch } from '@/services/user'
import { UserType } from '@/utils/user'
import React, { useEffect, useState } from 'react'

const Search = () => {
  const[query,setQuery]=useState('')
  const[search,setSearch]=useState<UserType[]>()
  
  useEffect(() => {
    getSearch(query).then((res)=>{
      setSearch(res.data)
    })
  }, [query])
  
  return (
    <div className={` md:flex flex flex-col items-center text-black h-lvh p-8 `}>
    <input placeholder='recherche' className='rounded-md border border-black p-1 text-center outline-none'onChange={(e)=>{
      setQuery(e.target.value)
    }}></input>
        <div className='flex flex-col gap-3 m-4'>
          {search && search.map((user)=>{
            return <ProfileUser key={user.id} button={false} col={false} user={user}/> 
          })}
             
        </div>
    </div>
  )
}

export default Search