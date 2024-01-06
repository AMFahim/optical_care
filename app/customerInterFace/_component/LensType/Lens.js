"use client";

import React, { useEffect, useState } from 'react'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext } from '@/app/context/FormContext'
import { lang } from '@/utils/lang'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Fade, Zoom } from 'react-reveal'
import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Image from 'next/image'
import clearGlass from './../../../../public/clear.png';
import blueCutGlass from './../../../../public/bluecut.png';
import tentedGlass from './../../../../public/tinted.png';
import automaticGlass from './../../../../public/automatic.png';


const Lens = () => {
  const { state, handleChange, lensType, dispatch, selectLensValue, setSelectLensValue } = useFormContext();

  // console.log(selectLensValue)


  useEffect(() => {
    if (state.ladd.value > 0 || state.radd.value > 0) {
      const filterLensType = lensType.filter(el => el?.lensName !== 'Tented' && el?.lensName !== 'Blue Cut')
      handleChange('lensType', filterLensType?.[0]?._id);
      return;
    }


    handleChange('lensType', lensType?.[0]?._id);


  }, [])

  const hanldeAutomaticGlass = () => {
    localStorage.setItem("optical_care_lens", "Automatic")
    alert("Clicked me!");
  }

  // useEffect(() => {

  // })

  const lensTypeWithImage = lensType.map(el => {
    if (el.lensName === "Automatic") {
      el.image = automaticGlass;
      el.text = "Adapts light, darkens outdoors, UV protection."
    }
    if (el.lensName === "Tented") {
      el.image = tentedGlass;
      el.text = "Stylish, functional tinted lenses available."
    }
    if (el.lensName === "Clear") {
      el.image = clearGlass;
      el.text = "Clear lenses for all prescriptions.";
    }
    if (el.lensName === "Blue Cut") {
      el.image = blueCutGlass;
      el.text = "Stylish, functional tinted lenses available."
    }

    return el;
  })

  console.log(state.lensType);

  return (
    <Fade duration={1000}>
      <div className=' rounded-[20px] mt-[-50px]'>
        {/* <div className='title-border mb-4'>
          <div className='relative '> */}
        <h3 className='mb-4 font-semibold text-3xl'>{lang?.[state.lang.value]?.lensType?.title}:</h3>
      </div>

      {
        (state.ladd.value > 0 || state.radd.value > 0) ?

          lensTypeWithImage.filter(el => el?.lensName !== 'Tented' && el?.lensName !== 'Blue Cut').map(el =>
            <div className="radio-item uppercase border rounded-md" onClick={() => handleChange('lensType', el._id)}>
              <input name="radio" id={el._id} type="radio" checked={el._id === state?.lensType?.value} />
              <label htmlFor={el._id} className='flex gap-4'>
                <Image src={el.image} className='w-6 h-6 mt-3' />
                <div>
                  <span>{el.lensName}</span>
                  <p className='text-sm normal-case'>{el.text}</p>
                </div>
              </label>
            </div>


          )
          :
          lensTypeWithImage.map(el =>

            <div className="glass-item uppercase border rounded-md mb-2" onClick={() => handleChange('lensType', el._id)}>
              <input name="radio" id={el._id} type="radio" checked={el._id === state?.lensType?.value} />
              <label htmlFor={el._id} className='flex gap-4'>
                <Image src={el.image} className='w-6 h-6 mt-3' />
                <div>
                  <span>{el.lensName}</span>
                  <p className='text-sm normal-case'>{el.text}</p>
                </div>              </label>
            </div>


          )



      }




    </Fade>
  )

}

export default Lens