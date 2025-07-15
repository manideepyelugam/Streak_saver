import React from "react";
import {Link, Links} from 'react-router-dom'

const LandingPage = () => {


  const handleLogin = () => {

    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;

}


  return (

    <div className="h-screen bg-[#040404] bg-[url('/Frame%208177.jpg')] bg-cover bg-center">
    <div className="  h-[97%]  text-[#f5f5f5] flex flex-col items-center justify-center p-6">


      <div className="flex flex-col items-center justify-between h-[230px]">
        
      <h1 className="text-7xl tracking-tight font-medium mb-3 text-center drop-shadow-lg">
         Keep Your GitHub Streak Alive
      </h1>
      <p className="text-xl tracking-wide leading-8 font-light max-w-3xl text-center text-[#cecece]">
        Never lose your commit streak again. Automate daily GitHub commits even when life gets busy. 100% safe, customizable, and effortless.
      </p>

      <div className="flex gap-4 items-center justify-center">
      <button  onClick={handleLogin}
        className="font-light mt-4  tracking-wide hover:bg-[#ececec] hover:text-black px-4 py-2 flex items-center flex-row rounded-lg shadow-custom transition text-[15px]"
      > <div className="bg-[#3aff04] h-4 w-4 rounded-sm mr-2.5"></div> Start Saving Streak</button>

<a
        href="/dashboard"
        className=" font-light mt-4 tracking-wide hover:bg-[#ececec] hover:text-black px-4 py-2 flex items-center flex-row rounded-lg shadow-custom transition text-[15px]"
      > <i className="fa-solid fa-star mr-2"></i> Star this project</a>


      </div>
     

</div>

    
     
    </div>


<div className=" text-center text-white/80 text-sm">
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
