import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import GitHubCalendar from 'react-github-calendar';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const login = searchParams.get("login");
  const [user, setUser] = useState(null);
  const [commit,setCommit] = useState([])
  const navigate = useNavigate();


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
        setCommit(res.data.commitTimestamps); // fixed: use res.data
      } catch (err) {
        console.error("Failed to fetch commits", err);
      }
    };
  
    if (login) fetchCommits();
  }, [login]); // only refetch when login changes
  

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
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }


  


  if (!login) return <p>No login found in URL</p>;
  if (!user) return <p>Loading user...</p>;

  return (
    <div  className="bg-[#090909] text-[#f3f3f3] min-h-screen flex flex-col items-center justify-center">

      <div className="flex items-center justify-between w-2/3 mt-14">

          <div className="flex flex-col items-start justify-normal mr-10">

             <h1 className="font-medium tracking-tight text-5xl">Welcome, {user.name || user.login} </h1>
             <p className="font-normal mt-3 text-[#c9c9c9]">GitHub: @{user.login}</p>

             <div className="flex gap-5  items-start ">

           <Button onClick={logout} text={"Logout"}/>
           <Button onClick={save} text={"Start Saver"}/>
      </div>

          </div>


             <img
                src={user.avatar}
                alt="Avatar"
                style={{ borderRadius: "50%", width: "150px", marginTop: "1rem" }}
              />



      </div>

     
     
     


      <div className="w-3/4 ">
  <h3 className="font-medium tracking-tight text-3xl">Recent Commits:</h3>
  {commit.length === 0 ? (
    <p>No commits yet</p>
  ) : (
    commit.map((timestamp, index) => (
      <p key={index}>{new Date(timestamp).toLocaleString()}</p>
    ))
  )}
</div>

<GitHubCalendar  blockSize={15}
  blockMargin={5}
  fontSize={16}
  showTotalCount username="manideepyelugam" />

  </div>
  );
};

export default Dashboard;
