import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../urls/api";

const SignUp = ({ onFormSubmit }) => {
  const [isAgreed, setIsAgreed] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onUserSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    };

    fetch(API_URL("signup"), options)
      .then((res) => res.json())
      .then(() => navigate("/success"))
      
  };


  return (
    <MainWrapper>
      <Title>ABC CBT</Title>

      <InputWrapper>
        <Form onSubmit={onUserSubmit}>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label htmlFor="username"></label>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
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

        <div className={`${isAgreed ? "shown" : "hidden"}`}>
          <p>We dont save anything</p>
        </div>
      </InputWrapper>

      <div>
        <Link to="/">Home</Link>
      </div>
    </MainWrapper>
  );
};

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
