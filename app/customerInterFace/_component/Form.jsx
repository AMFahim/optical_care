"use client";
import React, { useEffect, useState } from "react";
import MultiStepForm from "./MultiStepForm";
import { useFormContext } from "../../context/FormContext";
import { lang } from "@/utils/lang";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Fade } from "react-reveal";
const Form = () => {
  const { state, handleChange, dispatch } = useFormContext();

  const [pack, setPack] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  // useEffect(() => {
  //   setLoading(true);

  //   // Simulate data loading with a 5-second delay
  //   const loadingTimeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);

  //   // Cleanup the timeout to avoid memory leaks
  //   return () => clearTimeout(loadingTimeout);
  // }, []);

  // useEffect(() => {
  //   if (pack.length <= 0) {
  //     const loadingTimeout = setTimeout(() => {
  //       setLoading(true);
  //     }, 5000);

  //     return () => clearTimeout(loadingTimeout);
  //   }
  // }, []);


  // if (state.step > 5) {
  //   setLoading(true)
  //   const loadingTimeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  //   return () => clearTimeout(loadingTimeout);
  // }

  const nextStep = () => {
    if (state.step === 2 && !state.rs.value) {
      dispatch({
        key: "rs",
        payload: { newValue: "", error: "Required" },
      });
      return;
    }
    if (state.step === 2 && !state.ls.value) {
      dispatch({
        key: "ls",
        payload: { newValue: "", error: "Required" },
      });
      return;
    }
    dispatch({
      key: "buttonClicked",
      payload: { newValue: "next" },
    });
    if ((!state.radd.value || !state.ladd.value) && state.step === 2) {
      handleChange("step", state.step + 2);
    } else {
      handleChange("step", state.step + 1);
    }
  };

  const prevStep = () => {
    if (state.step === 1) return;
    dispatch({
      key: "buttonClicked",
      payload: { newValue: "prev" },
    });
    if ((!state.radd.value || !state.ladd.value) && state.step === 4) {
      handleChange("step", state.step - 2);
    } else {
      handleChange("step", state.step - 1);
    }
  };

  const handleQuote = async () => {
    console.log("quote");
    try {
      setLoading(true);

      const res = await fetch("/api/quote", {
        method: "POST",
        body: JSON.stringify({
          leftEyeSpherical: state.ls.value,
          ...(state.lc.value
            ? { leftEyeCylindrical: state.lc.value }
            : { leftEyeCylindrical: 0 }),
          leftEyeAdditional: state.ladd.value,
          rightEyeSpherical: state.rs.value,
          ...(state.rc.value
            ? { rightEyeCylindrical: state.rc.value }
            : { rightEyeCylindrical: 0 }),
          rightEyeAdditional: state.radd.value,
          lensType: state.lensType.value,
          frameType: state.frameType.value,
          ...(state.ladd.value || state.radd.value
            ? { powerType: state.powerType.value }
            : {}),
        }),
        cache: "no-store",
      });
      const result = await res.json();

      console.log(result)

      if (res.ok && result.Message === "Package found") {
        setTimeout(() => {
          setPack(result.packages);
          setLoading(false);
        }, 5000);

      }
      if (res.ok && result.Message === "Package found" && result.packages.length === 0) {
        setTimeout(() => {
          setWarning(true);
          setLoading(false);
        }, 5000);
      }
      if (res.ok && result.Message === "No Package found") {
        setTimeout(() => {
          setWarning(true);
          setLoading(false);
        }, 5000);
      }





    } catch (error) {

    } finally {
      // setTimeout(() => {
        // setLoading(false);
      // }, 5000);
     
    }

  };

  return (
    <div className=" flex justify-center items-center w-full  h-screen text-[#080a36] py-10 px-4">
      {/* <div>
      <div className='w-full md:w-[50%] flex items-center justify-between mx-12'>
                <div className='w-10 h-10 rounded-full flex justify-center items-center bg-[#080a36]'>
                    <p className='text-white font-semibold text-lg'>1</p>
                </div>
                <div className={`w-[calc((100%_-_136px)_/_2)] h-[10px]  rounded-full ${state.step > 1 ? "bg-[#080a36]" : "bg-gray-300"}`}></div>
                <div className={`w-10 h-10 rounded-full flex justify-center items-center ${state.step > 2 ? "bg-[#080a36]" : "bg-gray-300"}`} >
                    <p className='text-white font-semibold text-lg'>2</p>
                </div>
                <div className={`w-[calc((100%_-_136px)_/_2)] h-[10px]  rounded-full ${state.step > 2 ? "bg-[#080a36]" : "bg-gray-300"}`}></div>
                <div className={`w-10 h-10 rounded-full flex justify-center items-center ${state.step > 3 ? "bg-[#080a36]" : "bg-gray-300"}`}>
                    <p className='text-white font-semibold text-lg'>3</p>
                </div>
            </div>
      </div> */}
      {/* {state.step === 5 && pack.length > 1 && (
        <Button
          onClick={() => location.reload()}
          className="absolute right-20 top-20"
        >
          Refresh{" "}
        </Button>
      )}
      {state.step === 5 && warning && (
        <Button
          onClick={() => location.reload()}
          className="absolute right-20 top-20"
        >
          Refresh{" "}
        </Button>
      )} */}
      {pack.length <= 0 && !loading && !warning && (
        <div className="flex flex-col lg:absolute h-[400px] gap-10 w-full md:w-[410px] xl:w-[490px]">
          {/* <div>
      <div className='w-full md:w-[50%] flex items-center justify-between mx-12'>
                <div className='w-10 h-10 rounded-full flex justify-center items-center bg-[#080a36]'>
                    <p className='text-white font-semibold text-lg'>1</p>
                </div>
                <div className={`w-[calc((100%_-_136px)_/_2)] h-[10px]  rounded-full ${state.step > 1 ? "bg-[#080a36]" : "bg-gray-300"}`}></div>
                <div className={`w-10 h-10 rounded-full flex justify-center items-center ${state.step > 2 ? "bg-[#080a36]" : "bg-gray-300"}`} >
                    <p className='text-white font-semibold text-lg'>2</p>
                </div>
                <div className={`w-[calc((100%_-_136px)_/_2)] h-[10px]  rounded-full ${state.step > 2 ? "bg-[#080a36]" : "bg-gray-300"}`}></div>
                <div className={`w-10 h-10 rounded-full flex justify-center items-center ${state.step > 3 ? "bg-[#080a36]" : "bg-gray-300"}`}>
                    <p className='text-white font-semibold text-lg'>3</p>
                </div>
            </div>
      </div> */}
          <MultiStepForm />

          {state.step > 1 && (
            <>
              {state.step === 5 ? (
                <button
                  onClick={handleQuote}
                  className="font-medium bg-[#080a36] text-lg  select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90  self-end  w-[160px] "
                >
                  {lang?.[state.lang.value]?.["Get Quote"]}
                </button>
              ) : (
                <button
                  id="next"
                  onClick={nextStep}
                  className="  font-medium bg-[#080a36] text-lg select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90  self-end w-[150px]"
                >
                  {lang?.[state.lang.value]?.["Next Step"]}
                </button>
              )}
            </>
          )}
        </div>
      )}
      {pack.length > 1 && !loading && !warning && (
        <div className=" rounded-lg mt-[-70px]">
          <div className="flex flex-col gap-10 mt-16 md:-mt-14 ">
            <Fade duration={1000}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 relative overflow-hidden ">
                  <Image
                    src={Logo}
                    alt="logo"
                    fill
                    className="absolute rounded-full "
                  />
                </div>
                <p className="text-center text-xl ">
                  {/* <span className="font-semibold text-4xl block mb-1">
                    🎉🎉 <span className="text-gradient">Congratulations!</span> 🎉🎉
                  </span> */}
                  <span className="font-semibold">
                    You have slected {pack[0].lenseType.lensName}{" "}
                    {state.radd.value || state.ladd.value
                      ? state.powerType.value
                      : ""}{" "}
                    lens <br />
                    Here are the three packages for you
                  </span>
                </p>
              </div>
            </Fade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pack.map((el) => (
                // bg-[#080a36]
                <Fade duration={1000}>
                  <div
                    className="flex flex-col p-4 shadow-lg rounded-md  border-2  border-[#080a36] bg-white"
                    key={el._id}
                  >
                    <div className="text-2xl font-semibold mb-3">
                      {el.package.packageName}
                    </div>
                    <div>
                      {state.frameType.value && el.rimlessAvailable ? (
                        <p className="font-semibold text-xl">
                          SAR-{el.lensePrice + el.rimlessPrice}
                        </p>
                      ) : state.frameType.value && !el.rimlessAvailable ? (
                        <p className="font-semibold text-xl">{el.remarks}</p>
                      ) : !state.frameType.value ? (
                        <p className="font-semibold text-xl">SAR-{el.lensePrice}</p>
                      ) : null}
                    </div>
                    <div>
                      {state.frameType.value && el.rimlessAvailable ? (
                        <p>{el.rimlessAttributes}</p>
                      ) : state.frameType.value &&
                        !el.rimlessAvailable ? null : !state.frameType.value ? (
                          <p>{el.attributes}</p>
                        ) : null}
                    </div>
                    <div>
                      {state.frameType.value && el.rimlessAvailable ? (
                        <p>{el.lenseType.lensName}</p>
                      ) : state.frameType.value &&
                        !el.rimlessAvailable ? null : !state.frameType.value ? (
                          <p>{el.lenseType.lensName}</p>
                        ) : null}
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      )}
      {pack.length <= 0 && !loading && warning && (
        <div className="flex flex-col items-center justify-center mt-[-50px] gap-4">
          <div className="w-20 h-20 relative overflow-hidden  ">
            <Image
              src={Logo}
              alt="logo"
              fill
              className="absolute rounded-full "
            />
          </div>
          <div className="shadow-lg rounded-md border-2  border-[#080a36] bg-white p-4">
            <p>
              Your Power requires more specifications.
              <br />
              please consult with one of our doctors
            </p>
          </div>
        </div>
      )}


      {state.step === 5 && pack.length > 1 && (
        <Button
          onClick={() => location.reload()}
          className="absolute right-20 bottom-20"
        >
          Refresh{" "}
        </Button>
      )}
      {state.step === 5 && warning && (
        <Button
          onClick={() => location.reload()}
          className="absolute right-20 bottom-20"
        >
          Refresh{" "}
        </Button>
      )}
      {pack.length <= 0 && loading && (
        <div className="flex justify-center items-center  h-[400px] w-[600px] gap-10">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )}
    </div>
  );
};

export default Form;
