import { updatePublication } from '@/services/publication';
import { PublicationType } from '@/utils/publication';
import React, {  useState } from 'react'
import { toast } from 'react-toastify';
import { InterestForm } from './InterestForm';

export const ModaleUpdatePublication = ({publication}:{publication:PublicationType}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const[description,setDescription]=useState('')
    const[interestUser,setInterestUser]=useState<string[]>([])
   
  return (
   <div>
    <p className={`${open === true? 'font-semibold':''}cursor-pointer`} onClick={handleOpen}>
    Modifier
    </p>
<div className={`${open === true ? 'flex' : 'hidden'} z-0 fixed bg-black opacity-20 top-0 left-0 w-screen h-screen`} onClick={()=>{setOpen(false)}}>
</div>
<div className={`${open === true? 'flex' : 'hidden'} fixed w-full md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg shadow-lg"`}>
    <div className={`relative flex flex-col items-center p-4 h-4/5 w-full bg-white rounded-md shadow-md mx-auto max-w-xl max-h-full text-center`}> 
    <h1 className='font-semibold text-xl p-4'>Modifier votre publication</h1>
    <p className='text-left'>Description: </p>
    <textarea maxLength={500} defaultValue={publication.description} placeholder='Ecrivez votre description...' className='border border-black outline-none rounded-md p-2 w-1/2 m-5' onChange={(e)=>{setDescription(e.target.value)}}></textarea>
    <div className='w-3/4'>
    <p>Ajouter tout les interets souhaité sur la publications:</p>
    <InterestForm setInterestUser={setInterestUser} publication={publication}/>
    </div>
    <button onClick={()=>{
      updatePublication(publication._id,description,interestUser).then((res)=>{
        if(res.status === 200){
          toast.success('modification reussite')
          setOpen(false)
          window.location.reload()
        }
      })
    }} className='bg-primary rounded-md text-white text-center p-3 w-1/2 mx-auto'> Modifier </button>
    </div>
  </div>
   
    </div>
  )
}
