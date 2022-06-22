import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../urls/api";

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: ""
  })
  const [isDuplicate, setIsDuplicate] = useState(false)
  const navigate = useNavigate();

  const onNewUserValueChange = (event) => {
    setIsDuplicate(false)
    const { name, value } = event.target
    setNewUser((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

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
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newUser.email,
        username: newUser.username,
        password: newUser.password
      }),
    };

    fetch(API_URL("signup"), options)
      .then((res) => res.json())
      .then((data) => {
        if (!!data.success) {
          navigate("/success")
        } else {
          setIsDuplicate(true)
        }
      })
  }

  return (
    <MainWrapper>
    <Wrapper>
    <Title>CBT /</Title>
      <TitleSpan>ABC</TitleSpan>

      <InputWrapper>
        <Form onSubmit={onUserSubmit}>
          <LabelEmail htmlFor="email">Email</LabelEmail>
            <EmailInput
              type="email"
              placeholder="Please enter"
              name="email"
              onChange={onNewUserValueChange}
              value={newUser.email}
            />
          
          <LabelUser htmlFor="username">Username</LabelUser>
          <UserInput
            type="text"
            placeholder="Please enter"
            name="username"
            onChange={onNewUserValueChange}
            value={newUser.username}
          />
          <div>
          <LabelPassword htmlFor="password">Password</LabelPassword>
          <ShowPassword type="button" onClick={togglePassword}>
              {passwordIcon()}
            </ShowPassword>
            </div>
          <PasswordInput
            type={passwordShown ? "text" : "password"}
            placeholder="Please enter"
            name="password"
            onChange={onNewUserValueChange}
            value={newUser.password}
          />
          <Validation isDuplicate={isDuplicate}>
            <p>
              The username or email has already been taken.
              Please use a different username or information.
            </p>
          </Validation>
          
          <TermsText>
            I agree to the terms and conditions
            <input
              onChange={() => setIsAgreed((s) => !s)}
              type="checkbox"
              id="terms"
              required={true}
            />
          </TermsText>
        <Terms isAgreed={isAgreed}>
          <TermsTextInfo>We dont save anything</TermsTextInfo>
        </Terms>

        <SignUpBtn type="submit">Sign up</SignUpBtn>
        </Form>

      </InputWrapper>
        <LinkSignIn to="/signin">Already have an account? Sign in here</LinkSignIn>
      <LinkWrapper>

        <LinkHome to="/">Home</LinkHome>
      </LinkWrapper>
      </Wrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
background-image: url(./images/ocean-css.jpg);
display: flex;
flex-direction: column;
background-size:100vh;
background-position: center;
background-repeat: no-repeat;
height: 100vh;

@media (min-width: 992px) {
  background-image: url(./images/ocean-horizontal-css.jpg);
  object-fit: cover;
  background-size: 100%;
}
`;

const Wrapper = styled.div`
display: flex;
margin-top: 20px;
flex-direction: column;
justify-content: center;
align-items: center;

`

const Title = styled.h1`
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
color: #fffffa;
}

@media (min-width: 992px) {
font-size: 140px;
font-weight: 400;
left: 30vw;
color: #8D9E65;
letter-spacing: -11px;

}
`
const TitleSpan = styled(Title)`
margin: 0;
color: #002CDD;
position: absolute;
top: 5vh;
left: 53vw;
font-style: italic;
font-weight: 300;

@media (min-width: 992px) {
left: 50vw;
}
`

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-color: #FFFFFA;
border: .3px solid #5E5E5E;
width: 70vw;
min-height: 50vh;
margin: 120px 0 20px 0;

@media (min-width: 768px) {
  width: 50vw;
margin-top: 240px;
}

@media (min-width: 992px) {
  width: 25vw;
  height: 50vh;
  margin-top: 180px;
}
`;

const Form = styled.form`
display: flex;
flex-direction: column;
margin: 10px;
`

const LabelEmail = styled.label`
font-family: 'Cormorant Garamond', serif;
font-size: 16px;
margin: 10px 0 0 0;

`

const LabelUser = styled(LabelEmail)`
`

const LabelPassword = styled(LabelEmail)`
`

const EmailInput = styled.input`
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
`

const UserInput = styled(EmailInput)`
`

const PasswordInput = styled(EmailInput)`
`


const Validation = styled.div`
${props => {
  if (props.isDuplicate) {
    return `
    width: 100;
    font-family: 'Cormorant Garamond', serif;
    color: #9E4D4D;
    font-style: italic;
    font-size: 14px;
    
  `;
  } else {
    return `
  display: none;
`;
  }
}}
`;

const TermsText = styled.p`
font-family: 'Cormorant Garamond', serif;
color: #707070;
font-size: 16px;
margin: 20px 0 0 0;

`

const TermsTextInfo = styled(TermsText)`
margin: 8px 0 0 0;`

const Terms = styled.div`
${props => {
  if (props.isAgreed) {
    return `
    display: none;
    
    `;
  } else {
    return `
   margin:0;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    

    
`;
  }
}}
`;

const SignUpBtn = styled.button`
font-family: 'Cormorant Garamond', serif;
background: none;
border: none;
margin: 20px 0 20px 10px;
font-size: 16px;

&:hover {
font-style: italic;
}

@media (min-width: 992px) {
  font-size: 18px;
}
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

const LinkSignIn = styled(Link)`
font-family: 'Cormorant Garamond', serif;
text-decoration: none;
color: black;
background-color: #fffffa;

@media (min-width: 768px) {
font-size: 22px;   
}
`

const LinkHome = styled(LinkSignIn)`
`

export default SignUp;
