import React from 'react'

const userLoginURL = "http://localhost:8080/v1/auth/userLogin"

const Landing = () => {
    return (
        <div>
            <h1>Landing</h1>
            <button onClick={() => { window.location.href = userLoginURL }}>Google Sign In</button>
        </div>
    )
}

export default Landing;