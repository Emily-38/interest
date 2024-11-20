'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Presentation = () => {
    const router=  useRouter()
  return (
    <div>

      <header>
        <Link className='m-3 flex items-center gap-3 self-start  text-xl' href={'/'}><FaArrowLeftLong/> Retour</Link>
        <Image src={'/logo_interest.png'} alt={'logo Interest'} width={1000} height={1000} className='mx-auto w-60'/>
        <h1 className='font-bold text-center text-2xl p-5'>Interest</h1>
      </header>

      <main>
        <p className='text-center'><strong>Interest</strong> est un réseau social fondé sur les centres d'intérêt. Notre priorité est de vous offrir du contenu exclusivement lié à vos passions, sans publicité, juste du partage entre passionnés. </p>
        <div className='flex flex-col md:flex-row bg-primary p-4 mt-4 items-center justify-center text-white gap-5 '>
        <p>Lors de votre première connexion, vous pourrez choisir vos centres d'intérêt. Cela nous permettra de personnaliser votre fil d'actualité et de vous proposer des suggestions d'amis en adéquation avec vos passions.</p>
        <Image src={'/interest_first_connect.png'} alt={'Interest page connection'} width={1000} height={1000}/>
        </div>
        <div className='flex flex-col md:flex-row-reverse p-4 mt-4 items-center justify-center gap-5'>
        <p>Pour créer une publication, sélectionnez les centres d'intérêt associés afin d’augmenter sa visibilité auprès des utilisateurs partageant les mêmes passions.</p>
        <Image src={'/interest_create_publication.png'} alt={'logo Interest'} width={1000} height={1000}/>
        </div>
      </main>

      <footer className=' flex flex-col gap-5 text-center bg-primary py-4'>
        <p> Pour plus d'informations vous pouvez consulter 
          <em className='text-white hover:underline cursor-pointer' onClick={()=>{
            router.push('/confidentialiter')
          }}> la confidentialitée du site </em>
         et
          <em className='text-white hover:underline cursor-pointer' onClick={()=>{
            router.push('/cgu')
          }}> les conditions d'utilisations </em> 
        </p>
        <p> Pour toute question ou réclamation merci de vous diriger vers 
          <em className='text-white hover:underline cursor-pointer' onClick={()=>{
            router.push('/contact')
          }}> la page contact </em>
        </p>
      </footer>

    </div>
  )
}

export default Presentation