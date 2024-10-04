import React, { useState } from 'react'

export const Badge = ({content}:{content:boolean}) => {
    //ajouter le changement de couleur en fonction de la selection de l'id interest
    const[isActive,setIsActive]=useState(false)
  return (
    <div  className={`${isActive === true ? 'bg-primary text-white':''} ${content === true? '':'border border-black'} cursor-pointer rounded-md p-1`} onClick={()=>{
      if(content !== true){
        setIsActive(!isActive)
      }
    }}>
        Badge 
    </div>
  )
}
