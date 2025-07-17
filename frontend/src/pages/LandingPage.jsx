import React from "react";
import {Link, Links} from 'react-router-dom'

const LandingPage = () => {


  const handleLogin = () => {

    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;

}


  return (

    <div className="h-screen bg-[#040404] bg-[url('/Frame%208177.jpg')] flex items-center justify-center flex-col bg-cover bg-center">
    <div className=" h-[98%] text-[#f5f5f5] flex flex-col items-center justify-center p-6">


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


<div className=" text-center pb-5 text-white/80 text-sm">
        Built with ❤️ by manideep, for developers.
      </div>

      </div>


  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md hover:scale-105 transition">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-white/90">{description}</p>
  </div>
);

export default LandingPage;
