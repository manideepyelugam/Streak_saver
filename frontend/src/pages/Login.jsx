import React from 'react'

const Login = () => {

    const handleLogin = () => {

        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;

    }


  return (
    <div>
           <button onClick={handleLogin}>Login with Github</button>
    </div>
  )
}

export default Login