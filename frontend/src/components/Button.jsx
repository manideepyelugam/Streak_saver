import React from 'react'

const Button = ({text,onClick}) => {
  return (
    <button onClick={onClick}
    className="font-normal mt-4 tracking-wide hover:bg-[#7ed554] text-white hover:text-black  py-2 text-[14px] sm:px-4 sm:py-2 flex justify-center items-center flex-row rounded-lg shadow-custom transition sm:text-[15px]"
  >{text}</button>  )
}

export default Button