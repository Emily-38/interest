'use client'
import { MenuMobile } from "@/components/MenuMobile";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function layout(
  {children}: Readonly<{children: React.ReactNode}>){
    const router = useRouter()
    useEffect(() => {
      if(!localStorage.getItem('token')){ 
        router.push('/')} 
    }, [])
    
  return (
  <div className=" md:grid grid-cols-[20%_1fr] text-sm md:text-base">
 <Navbar />
 <MenuMobile/>
        {children}
  </div>
  )
}