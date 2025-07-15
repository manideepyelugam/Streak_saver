import React from 'react'

const Button = ({text,onClick}) => {
  return (
    <button onClick={onClick}
    className="font-normal mt-4  tracking-wide hover:bg-[#ececec] text-white hover:text-black px-4 py-2 flex items-center flex-row rounded-lg shadow-custom transition text-[15px]"
  >{text}</button>  )
}

export default Button