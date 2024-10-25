
import { FaArrowLeftLong, FaArrowRightLong, FaHeart, FaRegBookmark } from 'react-icons/fa6';
import { ChangeEvent, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import Image from 'next/image';
import { BiCommentDetail } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { InterestForm } from './InterestForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreatePublication } from '@/utils/publication';
import { toast } from 'react-toastify';
import { createPubliction } from '@/services/publication';
import { InsertImage } from '@/services/image';


export const ModalCreatePublication= () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const[interestUser,setInterestUser]=useState<string[]>([])
    const[isActive, setIsActive]= useState(false)
    const[file, setFile]=useState('')
    const[description,setDescription]=useState('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

      const file = event.target.files && event.target.files[0];
  
      setFile(URL.createObjectURL(file as Blob));
  
    };

    const {register,handleSubmit, reset}=useForm<CreatePublication>()

    const onSubmit: SubmitHandler<CreatePublication> = async (data) => {
        
    if (data.file && data.file[0]) {
            const formData = new FormData();
            formData.append("file", data.file[0]);
            try {
              const uploadResponse = await InsertImage(formData);
              const filename = uploadResponse.data; 
      
              const productData = {
                description: data.description,
                interestId: interestUser,
                image: filename, 
              }
              const createResponse = await createPubliction(productData);
              toast.success("Creation de la publication reussi");
             
            }catch (error) {
                toast.error("Echec de la creation de publication");
              }
            }
          };

  return (
  <form onSubmit={handleSubmit(onSubmit)} >
    <p className={`${open === true? 'font-semibold':''}`} onClick={handleOpen}>
    Crée une publication
    </p>
<div className={`${open === true ? 'flex' : 'hidden'} z-0 fixed bg-black opacity-20 top-0 left-0 w-screen h-screen`} onClick={()=>{setOpen(false)
  reset()
}}></div>
<div className={`${open === true? 'flex' : 'hidden'} fixed w-full md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg shadow-lg"`}>
    <div className={`${isActive === true ?'hidden':'' } relative flex flex-col items-center p-4 h-4/5 w-full bg-white rounded-md shadow-md mx-auto max-w-xl max-h-full text-center`}>
        <p className='hidden self-end cursor-pointer md:flex items-center gap-3' onClick={()=>{setIsActive(true)}}>
            Suivant
            <FaArrowRightLong />
        </p>
        <h1 className='font-semibold text-xl p-4'> Crée une publication </h1>
      <div className='flex w-4/5 flex-col gap-4'>
        <input {...register('file')} onChange={handleInputChange} type="file" className=' border border-black text-center rounded-md p-2'/>
        <textarea {...register('description')} maxLength={500} placeholder='Ecrivez votre description...' className='border border-black outline-none rounded-md p-2' onChange={(e)=>{setDescription(e.target.value)}}></textarea>
        <InterestForm setInterestUser={setInterestUser}/>
            <p className='bg-primary rounded-md text-white text-center p-3 w-1/2 mx-auto md:hidden'onClick={()=>{
              setIsActive(true)
            }}>Suivant</p>
      </div>
    </div>

    <div className={`${isActive === true ? 'flex' : 'hidden' } relative flex-col items-center p-4 h-4/5 w-full bg-white rounded-md shadow-md mx-auto max-w-xl max-h-full text-center`}>
        <div  className='flex justify-between items-center w-full p-2'>
           <p className='cursor-pointer flex items-center gap-3' onClick={()=> setIsActive(false)}><FaArrowLeftLong/>Retour</p>
           <button type='submit' className='cursor-pointer flex items-center gap-3' onClick={()=>{
            setOpen(false)
           }}>Suivant<FaArrowRightLong/> </button> 
        </div>
    <h1 className='font-semibold text-xl pt-4'> Aperçu </h1>
    <div className=' w-2/3  bg-white mx-auto rounded-md'>
        <div className='flex justify-between items-center pl-3 pr-3'>
            <div className='flex items-center gap-3 p-2 cursor-pointer'>
            <Image width={50} height={50} alt='Profile User' src={'/default_profile.png'} className='rounded-full h-5 w-5 object-cover'/>
                <p> Nom Utilisateur </p>
            </div>
            <SlOptions className='cursor-pointer'/>
        </div>
        {file && <><Image src={file} alt='Image de publication' width={1000} height={1000} className=' w-full h-48 object-cover' /><div className='flex gap-3 ml-3'>
              <p>10</p>
              <p>20</p>
              <p>1</p>
            </div><div className='flex gap-2 ml-3 text-xl'>
                <FaHeart className={`text-red-300`} />
                <BiCommentDetail />
                <FaRegBookmark />
              </div></>}
        <p className='text-center'> {description}</p>
        <div className='border self-end border-black rounded-b-md flex'>
            <input type="text" placeholder='Ecrire un commentaire' className='p-1 flex w-full outline-none' disabled />
            <button type='submit' className=' bg-primary text-white px-2'>Envoyer</button>
        </div>   
    </div>
    </div>

    </div>


</form>
  )
}
