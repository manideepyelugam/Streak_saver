import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome, {user.name || user.login} 👋</h1>
      <img
        src={user.avatar}
        alt="Avatar"
        style={{ borderRadius: "50%", width: "150px", marginTop: "1rem" }}
      />
      <p style={{ marginTop: "1rem" }}>GitHub: @{user.login}</p>

      <button onClick={() => logout()}>Logout</button>

      <button onClick={() => save()}>Start Saver</button>


      <div>
  <h3>Recent Commits:</h3>
  {commit.length === 0 ? (
    <p>No commits yet</p>
  ) : (
    commit.map((timestamp, index) => (
      <p key={index}>{new Date(timestamp).toLocaleString()}</p>
    ))
  )}
</div>

    </div>
  );
};

export default Dashboard;
