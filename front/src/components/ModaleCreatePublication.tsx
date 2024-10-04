
import { FaArrowLeftLong, FaArrowRightLong, FaHeart, FaRegBookmark } from 'react-icons/fa6';
import { Badge } from './Badge';
import { useEffect, useRef, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import Image from 'next/image';
import { BiCommentDetail } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export const ModalCreatePublication= () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const[isActive, setIsActive]= useState(false)
    const router = useRouter()

  

  return (
  <>
<p className={`${open === true? 'font-semibold':''}`} onClick={handleOpen}>
  Crée une publication
</p>

<div   className={`${open === true? 'flex':'hidden'}  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-45 w-full h-lvh p-6 rounded-lg shadow-lg z-50"`}>
    <div   className={`${isActive === true ?'hidden':'' } relative flex flex-col items-center p-4 h-4/5 w-full bg-white rounded-md shadow-md mx-auto max-w-xl max-h-full text-center`}>
    <div  className='flex justify-between items-center w-full p-2'>
    <p className='cursor-pointer flex items-center gap-3' onClick={handleClose}><FaArrowLeftLong/>fermer</p>
    <p className='hidden self-end cursor-pointer md:flex items-center gap-3' onClick={()=>{setIsActive(true)}}>
        Suivant<FaArrowRightLong /></p>
    </div> 
        <h1 className='font-semibold text-xl p-4'> Crée une publication </h1>
       <form action="" className='flex flex-col gap-4'>
       <input type="file" className=' border border-black text-center rounded-md p-2'/>
       <textarea maxLength={500} id="" placeholder='Ecrivez votre description...' className='border border-black rounded-md p-2'></textarea>
       <div className='border border-black p-2 rounded-md flex flex-row'>
        <div className='p-3 grid grid-cols-2 gap-4'><Badge content={false}/> <Badge content={false}/> <Badge content={false}/> </div>
        <div className='self-end'>
       <input type="text" placeholder="Ajoute ton centre d'interet" className='appearance-none border-b-2 text-center outline-none border-b-gray-300'/>
       <button type='submit' className='bg-primary  text-white rounded-md p-1'>Ajouter</button></div>
       </div>
       </form>
    </div>

    <div className={`${isActive === true ?'flex':'hidden'} relative flex-col items-center p-4 h-4/5 w-full bg-white rounded-md shadow-md mx-auto max-w-xl max-h-full text-center`}>
    <div  className='flex justify-between items-center w-full p-2'>
           <p className='cursor-pointer flex items-center gap-3' onClick={()=> setIsActive(false)}><FaArrowLeftLong/>Retour</p>
           <p className='hidden cursor-pointer md:flex items-center gap-3' onClick={()=>{
            router.push('/home')
            setOpen(false)
           }}>Suivant<FaArrowRightLong /></p> 
        </div>
    <h1 className='font-semibold text-xl pt-4'> Aperçu </h1>
    <div className='w-1/2 h-80 bg-white mx-auto rounded-md'>
        <div className='flex justify-between items-center pl-3 pr-3'>
            <div className='flex items-center gap-3 p-2 cursor-pointer'>
                <Image width={50} height={50} alt='Profile User' src='/chat.jpg' className='rounded-full h-5 w-5 object-cover'/>
                <p> Nom Utilisateur </p>
            </div>
            <SlOptions className='cursor-pointer'/>
        </div>
        <Image src={'/chat.jpg'} alt='Image de publication' width={1000} height={1000} className=' w-full h-36'/>
        <div className='flex gap-3 ml-3'>
            <p>10</p>
            <p>20</p>
            <p>1</p>
        </div>
        <div className='flex gap-2 ml-3 text-xl'>
            <FaHeart className={`text-red-300`} />
            <BiCommentDetail />
            <FaRegBookmark />
        </div>
        <p className='text-center'> OH LE CHAT !!!</p>
        <div className='border self-end border-black rounded-b-md flex'>
            <input type="text" placeholder='Ecrire un commentaire' className='p-1 flex w-full outline-none '></input>
            <button type='submit' className=' bg-primary text-white'>Envoyer</button>
        </div>   
    </div>
    </div>

</div>


</>
  )
}
