'use client'

import React, { useEffect, useState } from 'react'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext } from '@/app/context/FormContext'
import { lang } from '@/utils/lang'
import { Fade, Zoom } from 'react-reveal'

const FrameType = () => {
  const { state, handleChange } = useFormContext();

  // useEffect(()=> {
  //   {
  //     state.step > 1 ? 
  //   }
  // },[])

  console.log("value",state?.frameType?.value)


  return (
    <>
      <Fade duration={1000}>
        <div className=' rounded-[20px] p-8 mt-[-100px]'>
          {/* <div className='title-border mb-4'>
            <div className='relative'> */}
              <h3 className='mb-4 font-semibold text-3xl'>{lang?.[state.lang.value]?.frameType?.['title']}</h3>
            {/* </div>
          </div> */}
          {/* <h3 className='mb-4 text-3xl font-semibold'>{lang?.[state.lang.value]?.frameType?.['title']}</h3> */}
          {/* < RadioGroup RadioGroup dir={state.lang.value === "ar" ? 'rtl' : 'ltr'} defaultValue={state.frameType.value} onValueChange={(value) => handleChange('frameType', value)}  >
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value={false} id={'no'} className={state.lang.value === "ar" ? 'ml-2 ' : ''} />
              <Label className="text-xl" htmlFor={'no'}> {lang?.[state.lang.value]?.frameType?.['No']}</Label>
            </div>
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value={true} id={'yes'} className={state.lang.value === "ar" ? 'ml-2 ' : ''} />
              <Label className="text-xl" htmlFor={'yes'}>{lang?.[state.lang.value]?.frameType?.['Yes']}</Label>
            </div>
          </RadioGroup > */}

          <div className="radio-list">
            <div className="radio-item uppercase border rounded" onClick={() => handleChange('frameType',false)}>
              <input name="radio" id="radio1" type="radio" checked={state?.frameType?.value === false}/>
              <label htmlFor="radio1" className='flex gap-4'>
                <span>No</span>
              </label>
            </div>
            <div className="radio-item uppercase border rounded" onClick={() => handleChange('frameType', true)}>
              <input name="radio" id="radio2" type="radio"  checked={state?.frameType?.value === true}/>
              <label htmlFor="radio2" className='flex gap-4'> 
              <div>
                <span>Yes</span>
              </div>
            </label>
            </div>
          </div>
        </div>
      </Fade>
    </>
  )
}

export default FrameType