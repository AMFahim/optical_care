'use client'

import { useFormContext } from '@/app/context/FormContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import Logo from '../../../../public/logo.png';
import OpticalShop from '../../../../public/opticalShop.png';
const Langaguage = () => {

    const { state, handleChange, dispatch } = useFormContext();

    const handleLanguage = (lang) => {
        handleChange("step", state.step + 1)
        handleChange('lang', lang)
    }



    return (
        <div className=' lg:ml-56'>
            <div className='flex p-12 justify-center rounded-lg flex-col w-[350px] md:w-[350px] xl:w-[480px] items-center'>    

                <div className='w-12 h-12 relative overflow-hidden'>
    <Image src={Logo} alt="logo" fill className='absolute rounded-full ' />
</div>
                <h2 className='mb-10 mt-4 text-xl lg:text-2xl text-center md:text-center lg:text-start font-bold uppercase'>Welcome to Optical Care</h2>

                <h3 className='text-2xl font'>Please select your langage</h3>
                <h3 className='text-4xl' dir='rtl'>الرجاء اختيار لغتك</h3>
                <div className='flex gap-4 mt-10 ' >
                    <Button className=" text-white text-lg px-6 py-4" onClick={() => handleLanguage("en")}>English</Button>
                    <Button className="text-white text-lg px-6 py-4" onClick={() => handleLanguage("ar")}>عربي</Button>
                </div>
            </div>
        </div>
    )
}

export default Langaguage