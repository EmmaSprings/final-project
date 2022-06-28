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
    <Wrapper>
      <CBT>CBT/</CBT>
      <ABC>ABC</ABC>
      <InputWrapper>
        <Form onSubmit={onUserSubmit}>
          <UserLabel>Username or Email</UserLabel>
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
      <SignUpWrapper>
        <SignUpLink to="/signup">Don't have an account? Sign up here</SignUpLink>
      </SignUpWrapper>

      <LinkWrapper>
      <DemoLink to="/demo">Demo</DemoLink>
      <StartLink to="/">Start</StartLink>
      </LinkWrapper>

</Wrapper>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
background-image: url(./images/forest-css.jpg);
display: flex;
flex-direction: column;
background-size:70vh;
background-position: center;
background-repeat: no-repeat;
height: 100vh;

@media (min-width: 768px) {
background-image: url(./images/forest-css.jpg);
background-size: 100%;

}

@media (min-width: 992px) {
  background-image: url(./images/mountains-css.jpg);
background-size: 100%;
}
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`


const CBT = styled.h1`
font-family: 'Heebo', sans-serif;
font-weight: 200;
margin: 0 0 0 0;
padding: 0;
font-size: 90px;
position: absolute;
top: 0;
left: 8vw;
letter-spacing: -6px;

@media (min-width: 768px) {
font-size: 150px;
left: 14vw;
}

@media (min-width: 992px) {
font-size: 140px;
left: 30vw;
color: #fffffa;
letter-spacing: -11px;

}
`
const ABC = styled(CBT)`
margin: 0;
color: #fffffa;
position: absolute;
top: 5vh;
left: 53vw;
font-style: italic;
font-weight: 300;

@media (min-width: 768px) {
font-size: 140px;
font-weight: 400;
left: 50vw;
top: 4vh;
}


@media (min-width: 992px) {
left: 50vw;
top: 0;
color: #6197A8;
}
`

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-color: #FFFFFA;
border: .3px solid #5E5E5E;
width: 70vw;
height: 40vh;
margin: 160px 0 20px 0;

@media (min-width: 768px) {
width: 50vw;
margin-top: 240px;
}

@media (min-width: 992px) {
  width: 25vw;
  height: 50vh;
  margin-top: 190px;
}
`

const Form = styled.form`
display: flex;
flex-direction: column;
margin: 10px;

`

const UserLabel = styled.label`
font-family: 'Cormorant Garamond', serif;
font-size: 16px;
color: #212121;

@media (min-width: 992px) {
  font-size: 18px;
}
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

&::placeholder {
  color: lightgrey;
  font-style: italic;
}

&:focus {
  outline: none;
}

@media (min-width: 992px) {
  margin-bottom: 20px;
  font-size: 16px;
}
`
const PasswordInput = styled(UserInput)`
`

const SignInBtn = styled.button`
font-family: 'Cormorant Garamond', serif;
background: none;
border: none;
margin: 20px 0 0 10px;
font-size: 16px;

&:hover {
font-style: italic;
}

@media (min-width: 992px) {
  font-size: 18px;
}
`

const SignUpWrapper = styled.div`
`

const SignUpLink = styled(Link)`
font-family: 'Cormorant Garamond', serif;
text-decoration: none;
font-size: 16px;
color: #fffffa;

&:hover {
  font-style: italic;
}

@media (min-width: 768px) {
font-size: 22px;   
}

@media (min-width: 992px) {
 font-size: 22px;
}

`

const LinkWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
position: absolute;
z-index: 1;
bottom: 20px;
width: 50vw;

@media (min-width: 992px) {
  bottom: 40px;
}
`


const DemoLink = styled(SignUpLink)`


`

const StartLink = styled(SignUpLink)`
`

const ShowPassword = styled.button`
 background: none;
  border: none;
  font-size: 16px;
  margin: 2px 0 0 8px;
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
    width: 100;
    font-family: 'Cormorant Garamond', serif;
    color: #9E4D4D;
    font-style: italic;
    font-size: 14px;
    `;
    }
  }
  }
`

export default SignIn