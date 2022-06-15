import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUpSuccess = () => {

  const navigate = useNavigate()

  useEffect( () => {
    setTimeout( () => {
      navigate("/")
    }, 3000);

  })
  return (
    <>
    <div>
    <h1>Success!</h1>
    <h3>Redirecting to profile..</h3>
    Not working? Press <Link to="/welcome">here</Link>
    </div>
    </>   

  )
}

export default SignUpSuccess