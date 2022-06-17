import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'

import { API_URL } from '../urls/api'

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
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

  ////PAssword whon not shown

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const passwordIcon = () => {
    if (!passwordShown) {
      return (
        <>
          <HidePassword type="button">{"\u2600"}</HidePassword>
        </>
      );
    } else {
      return (
        <>
          <ShowPassword type="button">{"\u2601"}</ShowPassword>
        </>
      );
    }
  };



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
    <ImageWrap>
    <Image  src="./images/cloud-css.jpg" alt="forest"/>
    </ImageWrap>

      <Title>ABC /</Title>
      <TitleSpan>CBT</TitleSpan>
      <InputWrapper>
        <Form onSubmit={onUserSubmit}>
          <UserLabel>Username or email</UserLabel>
          <UserInput
            type="text"
            placeholder="Please enter"
            id="username"
            required={true}
            value={loginInput}
            onChange={onLoginValueChange}
          />
<div>
          <PasswordLabel>Password</PasswordLabel>
          <ShowPassword type="button" onClick={togglePassword}>
              {passwordIcon()}
            </ShowPassword>
            </div>
          <PasswordInput
            type={passwordShown ? "text" : "password"}
            placeholder="Please enter"
            id="password"
            required={true}
            value={passwordInput}
            onChange={onPasswordValueChange}
          />
          <Validation isCorrectCredentials={isCorrectCredentials}>
            <p>Wrong username, email or password. Please try again.</p>
          </Validation>

          <SignInBtn>Sign in</SignInBtn>

        </Form>
      </InputWrapper>
      <div>
        <Link to="/signup">Don't have an account? Sign up here</Link>
      </div>

      <div>
      <Link to="/about">About</Link>
      <Link to="/">Start</Link>
      </div>
      <div>
        <button>Demo</button>
      </div>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
/* background-image: url('./images/forest-css.jpg'); */
display: flex;
position: relative;
flex-direction: column;
justify-content: center;
align-items: center;
`

const ImageWrap = styled.div`
min-width: 375px;
min-height: 667px;
object-fit: fill;
position: absolute;
z-index: -1;


`
const Image = styled.img`
z-index: -1;
width: 600px;
filter: opacity(50%)
`

const Title = styled.h1`
font-family: 'Heebo', sans-serif;
font-weight: 200;
margin: 20px 0 0 0;
font-size: 70px;
`

const TitleSpan = styled(Title)`
margin: 0;
color: yellow;
position: absolute;
top: 40px;
left: 240px;
`

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-color: #FFFFFA;
border: .3px solid black;
width: 70vw;
height: 40vh;
margin: 20px 0 20px 0;
`

const Form = styled.form`
display: flex;
flex-direction: column;
margin: 10px;

`

const UserLabel = styled.label`
font-family: 'Cormorant Garamond', serif;
font-size: 14px;

`

const PasswordLabel = styled(UserLabel)`

`
const UserInput = styled.input`
font-family: 'Cormorant Garamond', serif;
border: none;
border-bottom: 0.3px solid black;
background: none;
margin-top: 10px;
padding-bottom: 5px;

&:focus {
  outline: none;
}
`
const PasswordInput = styled(UserInput)`

`

const SignInBtn = styled.button`
font-family: 'Cormorant Garamond', serif;
background: none;
border: none;
margin: 10px 0 0 10px;

&:hover {
font-style: italic;
}
`

const ShowPassword = styled.button`
 background: none;
  border: none;
  font-size: 16px;
  margin: 2px 0 0 0;
  padding: 0;
  text-decoration: none;
`

const HidePassword = styled(ShowPassword)`
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