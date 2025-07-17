import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import GitHubCalendar from 'react-github-calendar';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ToastContainer, toast } from 'react-toastify';



const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const login = searchParams.get("login");
  const [user, setUser] = useState(null);
  const [commit,setCommit] = useState([])
  const [profileDetails,setProfileDetails] = useState();
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();


  const stop = async() => {
    try {
      if(!login) console.log("User not logged in");


      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/start/${login}/stop`)
      .then((res) => {
            console.log("Job stopped successfully");
            toast("Job stopped successfully")
            setRefresh(prev => !prev); 
      })
      .catch((e) => {
        console.log(e)
        toast(e.response.data)
      })
    } catch (error) {
         console.log(error)

    }
}

  useEffect(() => {
    if (login) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${login}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user", err));
    }
  }, [login]);


  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/start/${login}/getUpdates`);
        setCommit(res.data.commits); // fixed: use res.data
        setProfileDetails(res.data)
        console.log(res.data)

      } catch (err) {
        console.error("Failed to fetch commits", err);
      }
    };
  
    if (login) fetchCommits();
  }, [login,refresh]); // only refetch when login changes
  

  const logout = () => {
        try {
          if(!login) console.log("User not logged in")
            console.log(user.login)

          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout/${user.login}`)
          .then((res) =>{ console.log("logged out success")
                navigate("/")
              localStorage.removeItem("loginToken")}
              )
          .catch((err) => console.log(err))


        } catch (error) {
          console.log(error)
        }
  }



  const save = async() => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/start/${login}`)
      //console.log(res)
      toast(res.data)
      setRefresh(prev => !prev); 

    } catch (error) {
      console.log(error)
      toast("Error in backend")
    }
  }




  if (!login) return <p>No login found in URL</p>;
  if (!user) return <p>Loading user...</p>;


  return (
    <div  className="bg-[#090909] text-[#f3f3f3] min-h-screen flex flex-col items-center justify-center">

      <div className="flex flex-col items-center justify-between mt-16 sm:mt-32  w-full">

      <div className="flex items-center  flex-col-reverse sm:flex-row justify-center sm:justify-between  sm:w-[58%]  px-6 ">

          <div className="flex flex-col sm:items-start items-center justify-normal">

             <h1 className="font-medium tracking-tight text-3xl mt-10 sm:mt-0   sm:text-5xl flex items-center"><div className="sm:h-7 sm:w-7 h-4 w-4 sm:mr-5 mr-3 rounded-sm bg-[#7ed554]"></div> Welcome, {user.name || user.login} </h1>
             <p className="font-normal sm:mt-3 mt-2  text-[#c9c9c9]">GitHub: @{user.login}</p>

             <div className="sm:flex sm:gap-5  gap-x-5  items-center sm:mt-2 mt-6  grid grid-cols-2 sm:w-full w-[90%] ">

           <Button onClick={logout} text={"Logout"}/>
           <Button onClick={save} text={"Start Saver"}/>
           <Button onClick={stop} text={"Stop Job"}/>


            {profileDetails?.active == true ? (<div className="mt-4 flex items-center justify-center sm:justify-start py-2 sm:px-4 text-[14px] sm:text-[15px] rounded-lg shadow-custom2">
                <div className="h-3 w-3 bg-[#7ed650] pulse mr-3 rounded-full"></div> In progress
           </div>) : null}

          
      </div>

      {profileDetails?.active == true ? ( <div className="sm:mt-6 mt-10 flex flex-col sm:flex-row gap-3  sm:gap-4">

<p className="text-[14px] sm:text-sm "><span className="text-[#7ed650] font-semibold">Started At: </span>{profileDetails?.startedAt ? new Date(profileDetails.startedAt).toLocaleString() : ""}</p>
<p className="text-[14px] sm:text-sm "><span className="text-[#7ed650] font-semibold">Expires At: </span>{profileDetails?.expiresAt ? new Date(profileDetails.expiresAt).toLocaleString() : ""}</p>

</div>) : null}

     

          </div>


             <img
                src={user.avatar}
                alt="Avatar"
                style={{ borderRadius: "50%", width: "150px", marginTop: "1rem" }}
              />
      </div>



      <div className="my-24  h-[200px] w-[330px] sm:h-[200px] sm:w-auto ">
                    <GitHubCalendar  blockSize={15}
              blockMargin={5}
              fontSize={16}
              showTotalCount username="manideepyelugam" />
      </div>
      </div>


      <div className="flex items-start flex-col my-10  px-8 sm:px-0 sm:w-[55%]">
        
            <h1 className="font-medium sm:text-center  text-xl sm:text-3xl flex items-start sm:items-center text-start leading-[32px] justify-center"><div className="sm:h-5 sm:w-5 h-4 w-5 mr-4 sm:mr-4 mt-2 sm:mt-0 rounded-sm bg-[#7ed554]"></div>Things to do before starting streak saver</h1>

            <div className="sm:mt-5 mt-4 font-light text-[14px] flex flex-col gap-2 sm:text-[18px] tracking-wide text-[#ffffffc4]">
                  <p>1. Create a new repository with name <span className="text-[#7ed554] font-medium">auto_commit</span></p>
                  <p>2. Select the branch to  <span className="text-[#7ed554] font-medium">main</span></p>
                  <p>3. Create a file with name  <span className="text-[#7ed554] font-medium">dummy_txt</span></p>
            </div>
      </div>
     
     
     


      <div
  className="sm:w-[55%] w-[93%] h-[350px] mb-20 mt-20 p-5 rounded-2xl bg-[#46454525]"
  style={{
    boxShadow: '0px 0px 3px 3px #7fd55448',
  }}
>
  <h3 className="font-medium tracking-tight text-xl sm:text-2xl mb-4 flex items-center"><div className="h-4 w-4 mr-4 rounded-sm bg-[#7ed554]"></div>Recent Commits:</h3>

  <div className="flex items-center my-6 sm:px-10 text-[#ffffffa6] w-full">
      <p className="w-1/4 text-[#9fff70] font-medium">Date</p>
      <p className="w-1/4 text-[#9fff70] font-medium">Time</p>
      <p className="w-1/4 text-[#9fff70] font-medium">Commit</p>
  </div>

  <div
    className="w-full h-[200px] sm:px-10 overflow-y-auto space-y-1
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-[#7fd554]
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-[#7fd554]"
  >
   {commit.length === 0 ? (
  <p className="text-gray-500 dark:text-gray-400">No commits yet</p>
) : (
  [...commit].reverse().map((com, index) => (
    <div key={index} className="flex sm:py-1 py-1.5 items-center">
      <p className="font-normal text-[12px] sm:text-[16px] text-[#ffffffb7] w-1/4 sm:font-medium ">
        {new Date(com.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <p className="font-normal text-[12px] sm:text-[16px] w-1/4 text-[#ffffffb7] sm:font-medium">
        {new Date(com.timestamp).toLocaleTimeString()}
      </p>
      <p className="font-normal text-[12px] sm:text-[16px] w-2/4 text-[#ffffffb7] sm:font-medium">
        {com.commitMessage}
      </p>
    </div>
  ))
)}
  </div>
</div>



<ToastContainer position="top-center"
 theme="dark"  // optional built-in theme
  toastStyle={{ background: '#46454573', color: '#7ed650', width: window.innerWidth < 600 ? "90%" : "400px",
    fontSize: window.innerWidth < 600 ? "14px" : "16px",
    background: '#1a1a1a',
    color: '#7ed650',
    fontWeight: 'bold', }}
  progressStyle={{ background: 'green' }}/>

  </div>
  );
};

export default Dashboard;
