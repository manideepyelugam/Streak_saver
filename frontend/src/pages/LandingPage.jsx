import React from "react";
import {Link, Links} from 'react-router-dom'

const LandingPage = () => {


  const handleLogin = () => {

    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;

}


  return (

<div className="relative w-full h-screen overflow-hidden bg-[#040404] flex items-center justify-center flex-col bg-cover bg-center">

<div className="absolute  z-20 top-[-120px] left-[-300px] h-[700px] w-[700px] rounded-full 
bg-[#868686] opacity-0 md:opacity-[0.30] blur-[422.8px]"></div>

<div className="absolute z-20 top-[-120px] right-[-300px] h-[700px] w-[700px] rounded-full 
bg-[#868686] opacity-0 md:opacity-[0.30] blur-[422.8px]"></div>


<div className="absolute left-[91px] opacity-0 md:opacity-70 top-[170px] w-[139px] h-[138px] flex items-center justify-center">
  
  <div className="w-[8px] h-[8px] rounded-full bg-[#868686] z-10"></div>

  <div
  className="absolute w-[1px] h-[170px] rounded-full"
  style={{
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)'
  }}
></div>

<div
  className="absolute h-[1px] w-[170px]  rounded-full"
  style={{
    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)'
  }}
></div>

</div>

<div className="absolute left-[350px] opacity-0 md:opacity-70 top-[470px] w-[139px] h-[138px] flex items-center justify-center">
  
  <div className="w-[8px] h-[8px] rounded-full bg-[#868686] z-10"></div>

  <div
  className="absolute w-[1px] h-[170px] rounded-full"
  style={{
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)'
  }}
></div>

<div
  className="absolute h-[1px] w-[170px]  rounded-full"
  style={{
    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)'
  }}
></div>

</div>




<div className="absolute right-[350px] opacity-0 md:opacity-70 top-[20px] w-[139px] h-[138px] flex items-center justify-center">
  
  <div className="w-[8px] h-[8px] rounded-full bg-[#868686] z-10"></div>

  <div
  className="absolute w-[1px] h-[170px] rounded-full"
  style={{
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)'
  }}
></div>

<div
  className="absolute h-[1px] w-[170px]  rounded-full"
  style={{
    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)'
  }}
></div>

</div>



<div className="absolute right-[350px] opacity-0 md:opacity-70 top-[620px] w-[139px] h-[138px] flex items-center justify-center">
  
  <div className="w-[8px] h-[8px] rounded-full bg-[#868686] z-10"></div>

  <div
  className="absolute w-[1px] h-[170px] rounded-full"
  style={{
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)'
  }}
></div>

<div
  className="absolute h-[1px] w-[170px]  rounded-full"
  style={{
    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)'
  }}
></div>

</div>







<div className=" h-[98%] text-[#f5f5f5] z-10 flex flex-col items-center justify-center p-6">


      <div className="flex  flex-col items-center justify-between  h-[260px] lg:h-[230px]">
        
      <h1 className="lg:text-7xl  text-[44px] leading-[55px]  tracking-tight font-medium mb-4 mt-[-30px] text-center ">
         Keep Your GitHub Streak Alive
      </h1>
      <p className="lg:text-xl text-[16px] mt-[-20px] lg:mt-0 lg:tracking-wide leading-6 lg:leading-8 font-light max-w-3xl text-center text-[#cecece]">
        Never lose your commit streak again. Automate daily GitHub commits even when life gets busy. 100% safe, customizable, and effortless.
      </p>

      <div className="flex gap-4  lg:mt-0 items-center justify-center">
      <button  onClick={handleLogin}
        className="font-light text-[12px] mt-4 px-3 py-1.5 tracking-wide hover:bg-[#ececec] hover:text-black lg:px-4 lg:py-2 flex items-center flex-row rounded-lg shadow-custom transition  lg:text-[15px]"
      > <div className="bg-[#3aff04] lg:h-4 lg:w-4 h-3 w-3 rounded-sm mr-2.5"></div> Start Saving Streak</button>

<a
        href="https://github.com/manideepyelugam/Streak_saver" target="_blank"
        className=" font-light mt-4 tracking-wide px-3 py-1.5 text-[12px] hover:bg-[#ececec] hover:text-black lg:px-4 lg:py-2 flex items-center flex-row rounded-lg shadow-custom transition text-sm lg:text-[15px]"
      > <i className="fa-solid fa-star mr-2"></i> Star this project</a>


      </div>
     

</div>

    
     
    </div>


<div className="absolute z-40 bottom-0 text-center pb-5 text-white/80 text-sm">
        Built with ❤️ by manideep, for developers.
      </div>

      <div className="absolute bottom-[-2700px] h-[2950px] w-[3000px] rounded-full 
bg-[#0A0A0A] border border-white/10 
shadow-[inset_0px_4px_140.6px_rgba(128,128,128,0.67)] z-0">
</div>


      </div>



  );
};



export default LandingPage;
