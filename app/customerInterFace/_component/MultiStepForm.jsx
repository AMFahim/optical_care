// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// // import SectionHeading from "./SectionHeading";
// // import { FORMDETAILS } from "../utils/constants";
// import { useFormContext } from "../../context/FormContext";
// import Power from "./power";
// import PowerType from "./PowerType/powerType";
// import LensType from "./LensType/lensType";
// import FrameType from "./FrameType/frameType";
// import Langaguage from "./Langugage/langaguage";
// import { Fade } from 'react-reveal';

// const steps = ['Power', 'Lens', 'Frams'];

// export default function HorizontalLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());

//   const { state, handleChange, resetError } = useFormContext();
//   // React.useEffect(() => {
//   //   // const animated = document.querySelector("#animated");
//   //   const prevButton = document.querySelector("#prev");
//   //   const nextButton = document.querySelector("#next");

//   //   console.log(prevButton)

//   //   if (state.step >= 2 && state.buttonClicked === "next") {

//   //     animated.classList.add("animate__slideInRight");
//   //   }
//   //   if (state.buttonClicked === "prev") {
//   //     animated.classList.add("animate__slideInLeft");
//   //   }
//   //   // animated.addEventListener("animationstart", () => {
//   //   //   if (prevButton) prevButton.disabled = true;
//   //   // });

//   //   // animated.addEventListener("animationend", () => {
//   //   //   // prevButton.disabled = false;

//   //   //   if (animated.classList.contains("animate__slideInRight")) {
//   //   //     animated.classList.remove("animate__slideInRight");
//   //   //   }
//   //   //   if (animated.classList.contains("animate__slideInLeft")) {
//   //   //     animated.classList.remove("animate__slideInLeft");
//   //   //   }
//   //   // });
//   // }, [state.step, state.buttonClicked]);


//   // const { state, handleChange, dispatch } = useFormContext();

//   const [pack, setPack] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [warning, setWarning] = React.useState(false);




//   const nextStep = () => {
//     if (state.step === 2 && !state.rs.value) {
//       dispatch({
//         key: "rs",
//         payload: { newValue: "", error: "Required" },
//       });
//       return;
//     }
//     if (state.step === 2 && !state.ls.value) {
//       dispatch({
//         key: "ls",
//         payload: { newValue: "", error: "Required" },
//       });
//       return;
//     }
//     dispatch({
//       key: "buttonClicked",
//       payload: { newValue: "next" },
//     });
//     if ((!state.radd.value || !state.ladd.value) && state.step === 2) {
//       handleChange("step", state.step + 2);
//     } else {
//       handleChange("step", state.step + 1);
//     }
//   };

//   const prevStep = () => {
//     if (state.step === 1) return;
//     dispatch({
//       key: "buttonClicked",
//       payload: { newValue: "prev" },
//     });
//     if ((!state.radd.value || !state.ladd.value) && state.step === 4) {
//       handleChange("step", state.step - 2);
//     } else {
//       handleChange("step", state.step - 1);
//     }
//   };

//   const handleQuote = async () => {
//     console.log("quote");
//     try {
//       setLoading(true)
//       const res = await fetch("/api/quote", {
//         method: "POST",
//         body: JSON.stringify({
//           leftEyeSpherical: state.ls.value,
//           ...(state.lc.value
//             ? { leftEyeCylindrical: state.lc.value }
//             : { leftEyeCylindrical: 0 }),
//           leftEyeAdditional: state.ladd.value,
//           rightEyeSpherical: state.rs.value,
//           ...(state.rc.value
//             ? { rightEyeCylindrical: state.rc.value }
//             : { rightEyeCylindrical: 0 }),
//           rightEyeAdditional: state.radd.value,
//           lensType: state.lensType.value,
//           frameType: state.frameType.value,
//           ...(state.ladd.value || state.radd.value
//             ? { powerType: state.powerType.value }
//             : {}),
//         }),
//         cache: "no-store",
//       });
//       const result = await res.json();

//       console.log(result)

//       if (res.ok && result.Message === "Package found") {
//         setPack(result.packages);

//       }
//       if (res.ok && result.Message === "Package found" && result.packages.length === 0) {
//         setWarning(true);
//       }
//       if (res.ok && result.Message === "No Package found") {
//         console.log("hi there")
//         setWarning(true);
//       }




//     } catch (error) {

//     } finally {
//       setLoading(false)
//     }

//   };




//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     // setActiveStep(0);
//     location.reload()
//   };

//   return (

//     <Box sx={{ width: '600px' }} >
//       {
//         state.step === 1 ? <Langaguage /> :
//           <div className=''>
//             <Stepper activeStep={activeStep}>
//               {steps.map((label, index) => {
//                 const stepProps = {};
//                 const labelProps = {};
//                 // if (isStepOptional(index)) {
//                 //   labelProps.optional = (
//                 //     <Typography variant="caption">Optional</Typography>
//                 //   );
//                 // }
//                 if (isStepSkipped(index)) {
//                   stepProps.completed = false;
//                 }
//                 return (
//                   <Step key={label} {...stepProps}>
//                     <StepLabel {...labelProps}>{label}</StepLabel>
//                   </Step>
//                 );
//               })}
//             </Stepper>
//             {activeStep === steps.length ? (
//               <React.Fragment>
//                 <div>
//                   { !loading && !warning && (
//                     <div className=" p-20 rounded-lg">
//                       <div className="flex flex-col gap-10 mt-16 md:-mt-14 ">
//                         <Fade top duration={2000}>
//                           <div className="flex flex-col items-center gap-4">
//                             {/* <div className="w-12 h-12 relative overflow-hidden  ">
//                               <Image
//                                 src={Logo}
//                                 alt="logo"
//                                 fill
//                                 className="absolute rounded-full "
//                               />
//                             </div> */}
//                             <p className="text-center text-xl ">
//                               {/* <span className="font-semibold text-4xl block mb-1">
//                                 🎉🎉 <span className="text-gradient">Congratulations!</span> 🎉🎉
//                               </span> */}
//                               <br />
//                               <span className=" font-semibold">
//                                 You have slected {pack[0]?.lenseType.lensName}{" "}
//                                 {state.radd.value || state.ladd.value
//                                   ? state.powerType.value
//                                   : ""}{" "}
//                                 lens <br />
//                                 Here are the three packages for you
//                               </span>
//                             </p>
//                           </div>
//                         </Fade>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                           {pack.map((el) => (
//                             <Fade bottom duration={2000}>
//                               <div
//                                 className="flex flex-col p-4 shadow-lg rounded-md  border bg-[#080a36] text-white"
//                                 key={el._id}
//                               >
//                                 <div className="text-2xl font-semibold mb-3">
//                                   {el.package.packageName}
//                                 </div>
//                                 <div>
//                                   {state.frameType.value && el.rimlessAvailable ? (
//                                     <p className="font-semibold text-xl">
//                                       SAR-{el.lensePrice + el.rimlessPrice}
//                                     </p>
//                                   ) : state.frameType.value && !el.rimlessAvailable ? (
//                                     <p className="font-semibold text-xl">{el.remarks}</p>
//                                   ) : !state.frameType.value ? (
//                                     <p className="font-semibold text-xl">SAR-{el.lensePrice}</p>
//                                   ) : null}
//                                 </div>
//                                 <div>
//                                   {state.frameType.value && el.rimlessAvailable ? (
//                                     <p>{el.rimlessAttributes}</p>
//                                   ) : state.frameType.value &&
//                                     !el.rimlessAvailable ? null : !state.frameType.value ? (
//                                       <p>{el.attributes}</p>
//                                     ) : null}
//                                 </div>
//                                 <div>
//                                   {state.frameType.value && el.rimlessAvailable ? (
//                                     <p>{el.lenseType.lensName}</p>
//                                   ) : state.frameType.value &&
//                                     !el.rimlessAvailable ? null : !state.frameType.value ? (
//                                       <p>{el.lenseType.lensName}</p>
//                                     ) : null}
//                                 </div>
//                               </div>
//                             </Fade>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                   <Box sx={{ flex: '1 1 auto' }} />
//                   <button className='text-white bg-primaryColor px-4 py-2 rounded-md' onClick={handleReset}>Reset</button>
//                 </Box>
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
//                 {/* <div dir={state.lang.value === "ar" ? 'rtl' : 'ltr'} id="animated" className={`animate__animated `}> */}
//                 {/* {state.step === 1 && <Langaguage />} */}
//                 <div className='mt-12'>
//                   {activeStep === 0 && <Power />}
//                   {/* {state.step === 3 && <PowerType />} */}
//                   {activeStep === 1 && <LensType />}
//                   {activeStep === 2 && <FrameType />}
//                 </div>
//                 {/* </div> */}
//                 <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                   <Button
//                     color="inherit"
//                     disabled={activeStep === 0}
//                     onClick={handleBack}
//                     sx={{ mr: 1 }}
//                   >
//                     Back
//                   </Button>
//                   <Box sx={{ flex: '1 1 auto' }} />
//                   {/* {isStepOptional(activeStep) && (
//                     <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                       Skip
//                     </Button>
//                   )} */}

//                   <Button onClick={handleNext}>
//                     {activeStep === steps.length - 1 ? <button
//                       id="next"
//                       // onClick={nextStep}
//                       className="  font-medium bg-[#080a36] text-lg select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90  self-end w-[150px]"
//                     >
//                       Finish
//                       {/* {lang?.[state.lang.value]?.["Next Step"]} */}
//                     </button> : <button
//                       id="next"
//                       // onClick={nextStep}
//                       className="  font-medium bg-[#080a36] text-lg select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90  self-end w-[150px]"
//                     >
//                       Next
//                       {/* {lang?.[state.lang.value]?.["Next Step"]} */}
//                     </button>}
//                   </Button>
//                 </Box>
//               </React.Fragment>
//             )}
//           </div>
//       }

//     </Box>
//   );
// }































"use client";

import React, { useEffect } from "react";
// import SectionHeading from "./SectionHeading";
// import { FORMDETAILS } from "../utils/constants";
import { useFormContext } from "../../context/FormContext";
import Power from "./power";
import PowerType from "./PowerType/powerType";
import LensType from "./LensType/LensType";
import FrameType from "./FrameType/frameType";
import Langaguage from "./Langugage/langaguage";

const MultiStepForm = () => {
  const { state, handleChange, resetError } = useFormContext();
  useEffect(() => {
    const animated = document.querySelector("#animated");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");

    console.log(prevButton)

    if (state.step >= 2 && state.buttonClicked === "next") {

      animated.classList.add("animate__slideInRight");
    }
    if (state.buttonClicked === "prev") {
      animated.classList.add("animate__slideInLeft");
    }
    // animated.addEventListener("animationstart", () => {
    //   if (prevButton) prevButton.disabled = true;
    // });

    animated.addEventListener("animationend", () => {
      // prevButton.disabled = false;

      if (animated.classList.contains("animate__slideInRight")) {
        animated.classList.remove("animate__slideInRight");
      }
      if (animated.classList.contains("animate__slideInLeft")) {
        animated.classList.remove("animate__slideInLeft");
      }
    });
  }, [state.step, state.buttonClicked]);

  return (
    <div dir={state.lang.value === "ar" ? 'rtl' : 'ltr'} id="animated" className={``}>

      {/* <div>
        <div className={`${state.step > 1 ? "block": "hidden"} w-full md:w-[50%] flex items-center justify-between mx-12`}>
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
      </div> */}
      {state.step === 1 && <Langaguage />}
      {state.step === 2 && <Power />}
      {state.step === 3 && <PowerType />}
      {state.step === 4 && <LensType />}
      {state.step === 5 && <FrameType />}
    </div>
  );
};

export default MultiStepForm;
