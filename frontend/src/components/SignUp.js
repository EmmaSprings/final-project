import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../urls/api";

const SignUp = () => {
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
          navigate("/welcome")
        } else {
          setIsDuplicate(true)
        }
      })
  }

  return (
    <MainWrapper>
      <Title>ABC CBT</Title>

      <InputWrapper>
        <Form onSubmit={onUserSubmit}>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={onNewUserValueChange}
              value={newUser.email}
            />
          </label>
          <label htmlFor="username"></label>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={onNewUserValueChange}
            value={newUser.username}
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={onNewUserValueChange}
            value={newUser.password}
          />
          <Validation isDuplicate={isDuplicate}>
            <p>
              The username or email has already been taken.
              Please use different usernanme or information.
            </p>
          </Validation>
          <button type="submit">Sign up</button>

          <label>
            I agree to the terms and conditions
            <input
              onChange={() => setIsAgreed((s) => !s)}
              type="checkbox"
              id="terms"
              required={true}
            />
          </label>
        </Form>
        <Terms isAgreed={isAgreed}>
          <p>We dont save anything</p>
        </Terms>
        <Link to="/signup">Already have an account? Sign in here</Link>
      </InputWrapper>

      <div>
        <Link to="/">Home</Link>
      </div>
    </MainWrapper>
  );
};


const Validation = styled.div`
${props => {
  if (props.isDuplicate) {
    return `
    width: 100;
  `;
  } else {
    return `
  display: none;
`;
  }
}}
`;
const Terms = styled.div`
${props => {
  if (props.isAgreed) {
    return `
    display: none;
`;
  } else {
    return `
    margin-left: 10px;
`;
  }
}}
`;


const MainWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #efeddb;
  border: 1px solid black;
  width: 70vw;
  height: 40vh;
  margin: 20px 0 20px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export default SignUp;
