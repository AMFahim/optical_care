'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext } from '@/app/context/FormContext'
import { BsFillInfoCircleFill } from "react-icons/bs";
import Image from 'next/image'
import PVB from '../../../../public/pvb.png'
import { lang } from '@/utils/lang'
import BifocalGlass from "./../../../../public/bifocal.png";
import progressiveGlass from "./../../../../public/progressive.png";



const PowerType = () => {
  const { state, handleChange } = useFormContext();

  console.log("value of power", state?.powerType?.value);
  return (
    <div >
      <h3 className='mb-4 font-semibold text-3xl'>{lang?.[state.lang.value]?.lensType?.title}:</h3>
      {/* < RadioGroup defaultValue={'Bifocal'} onValueChange={(value) => handleChange('powerType', value)}  > */}
        <div>
        <div className="flex items-center space-x-2">
          {/* <div> */}
            {/* <RadioGroupItem value={"Bifocal"} id={'bifocal'} /> */}
            {/* <Label className='text-lxl' htmlFor={'bifocal'}>Bifocal</Label> */}
            <div className="lens-item uppercase rounded-md w-[500px] mb-3" onClick={() => handleChange('powerType',"Bifocal")}>
              <input name="radio" value={"Bifocal"} className='text-center' id="radio1" type="radio" checked={state?.powerType?.value === "Bifocal"}/>
              <label for="radio1" className='flex gap-4 mt-4'>
                <div className='flex justify-center items-center'>
                  <Image src={BifocalGlass} className='w-10 h-10' />
                </div>
                <div className=''>
                  <span>Bifocal</span>
                  <p className='text-sm w-[300px] normal-case'>Lined multifocal. Two prescriptions in one,  Upper for <br/> distance, lower for near vision.</p>
                </div>
              </label>
            </div>
          {/* </div> */}



        </div>
        <div className="flex items-center space-x-2">
          {/* <RadioGroupItem value={"Progressive"} id={'progressive'} />
          <Label className='text-lxl' htmlFor={'progressive'}>Progressive</Label> */}
          <div className="lens-item uppercase rounded-md w-[500px]" onClick={() => handleChange('powerType',"progressive")}>
            <input name="radio" id="radio2" type="radio" checked={state?.powerType?.value === "progressive"}/>
            <label for="radio2" className='flex gap-4'>
                <div className='flex justify-center items-center'>
                  <Image src={progressiveGlass} className='w-10 h-10' />
                </div>
                <div className=''>
                  <span>Progressive</span>
                  <p className='text-sm w-[300px] normal-case'>No-line progressive multifocal lenses, help you see <br/> clearly at all distances without the visible lines.</p>
                </div>
              </label>
          </div>

        </div>
        </div>
      {/* </RadioGroup > */}
    </div>
  )
}

export default PowerType