import React from 'react'

export const BlockShadow = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="bg-white shadow-md flex flex-col justify-center items-center gap-4 w-3/4 rounded-md md:w-3/6 p-5">
      {children}
    </div>
  )
}
