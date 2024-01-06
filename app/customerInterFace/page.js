'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import Power from './_component/power'
import LensType from './_component/LensType/LensType'
import Frame from './_component/FrameType/frameType'
import { useFormContext } from '../context/FormContext'
import MultiStepForm from './_component/MultiStepForm'
import Form from './_component/Form'
import Sidebar from './_component/Sidebar'

const page = () => {
  const { state, handleChange, dispatch } = useFormContext();

  return (
    <div className='flex lg:max-w-[1920px] lg:mx-auto mr-[120px] overflow-y-hidden'>
     <div className='w-1/2 hidden lg:block'>
     <Sidebar/>
     </div>

   <div>
        <div className={`${state.step > 1 && state.step <= 5 ? "block": "hidden"} w-[300px] lg:w-[400px] xl:w-[600px] flex items-center justify-between mt-3`}>
          <div className='w-10 h-10 rounded-full flex justify-center items-center bg-[#080a36]'>
            <p className='text-white font-semibold text-lg'>1</p>
          </div>
          <div className={`w-[calc((100%_-_136px)_/_2)] h-[10px]  rounded-full ${state.step >= 4 ? "bg-[#080a36]" : "bg-gray-300"}`}></div>
          <div className={`w-10 h-10 rounded-full flex justify-center items-center ${state.step >= 4 ? "bg-[#080a36]" : "bg-gray-300"}`} >
            <p className='text-white font-semibold text-lg'>2</p>
          </div>
          <div className={`w-[calc((100%_-_136px)_/_2)] h-[10px]  rounded-full ${state.step >= 5 ? "bg-[#080a36]" : "bg-gray-300"}`}></div>
          <div className={`w-10 h-10 rounded-full flex justify-center items-center ${state.step >= 5 ? "bg-[#080a36]" : "bg-gray-300"}`}>
            <p className='text-white font-semibold text-lg'>3</p>
          </div>
        </div>
   <Form/>
   </div>

    </div>
  )
}

export default page