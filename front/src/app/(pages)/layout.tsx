'use client'
import { MenuMobile } from "@/components/MenuMobile";
import { Navbar } from "@/components/Navbar";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
  return (
  <div className=" md:grid grid-cols-[20%_1fr] text-sm md:text-base">
 <Navbar/>
 <MenuMobile/>
        {children}
  </div>
  )
}