'use client'
import { MenuMobile } from "@/components/MenuMobile";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout(
  {children}: Readonly<{children: React.ReactNode}>){
    const router = useRouter()
    const [isLoading,setIsLoading]=useState(false)
    useEffect(() => {
      if(!localStorage.getItem('token')){ 
         return router.push('/')} 
         setIsLoading(false)
    }, [isLoading])  
    
  return (
  <div className=" md:grid grid-cols-[20%_1fr] text-sm md:text-base">
 <Navbar setIsLoading={setIsLoading} />
 <MenuMobile/>
        {children}
  </div>
  )
}