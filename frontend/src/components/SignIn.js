import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'

import { API_URL } from '../urls/api'

const SignIn = () => {

  const [loginInput, setLoginInput] = useState("")
  const [isCorrectCredentials, setIsCorrectCredentials] = useState(true)
  const [passwordInput, setPasswordInput] = useState("")

  const navigate = useNavigate()

  const isEmail = (str) => {
    // Check if email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
      return true
    }
    else {
      return false
    }
  }

  const onLoginValueChange = (event) => {
    setLoginInput(event.target.value)
    setIsCorrectCredentials(true)
  }


  const onPasswordValueChange = (event) => {
    setPasswordInput(event.target.value)
    setIsCorrectCredentials(true)
  }

  const onUserSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },

    };

    const body =
    {
      password: passwordInput
    }

    if (isEmail(loginInput)) {
      body.email = loginInput
    } else {
      body.username = loginInput
    }
    options.body = JSON.stringify(body)

    fetch(API_URL("signin"), options)
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          sessionStorage.setItem("accessToken", data.accessToken)
          sessionStorage.setItem("username", data.username)
          navigate("/welcome")
        } else {
          setIsCorrectCredentials(false)
        }
      }
      )
  }

  return (
    <MainWrapper>
      <Title>ABC CBT</Title>
      <Link to="/about">About</Link>
      <InputWrapper>
        <Form onSubmit={onUserSubmit}>
          <label>Username or email</label>
          <input
            type="text"
            placeholder="username or email"
            id="username"
            required={true}
            value={loginInput}
            onChange={onLoginValueChange}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            required={true}
            value={passwordInput}
            onChange={onPasswordValueChange}
          />
          <Validation isCorrectCredentials={isCorrectCredentials}>
            <p>Wrong username, email or password. Please try again.</p>
          </Validation>

          <button>Sign in</button>

        </Form>
      </InputWrapper>
      <div>
        <Link to="/signup">Don't have an account? Sign up here</Link>
      </div>
      <div>
        <button>Demo</button>
      </div>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
display: flex;
margin-top: 20px;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Title = styled.h1`
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-color: #EFEDDB;
border: 1px solid black;
width: 70vw;
height: 40vh;
margin: 20px 0 20px 0;
`

const Form = styled.form`
display: flex;
flex-direction: column;
margin: 10px;

`

const Validation = styled.div`
${props => {
    if (props.isCorrectCredentials) {
      return `
    display: none;
    `;
    } else {
      return `
    width: 100;
    `;
    }
  }
  }
`

export default SignIn