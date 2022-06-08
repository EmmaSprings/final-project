import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'

import { API_URL } from '../urls/api'

const StartPage = () => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const navigate = useNavigate()


    const onUserSubmit = (e) => {
        e.preventDefault()
    
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
             
            },
            body: JSON.stringify({ username: username, password: password }),
          };
    
    fetch(API_URL("signin"), options)
    .then(res => res.json())
    .then(() => navigate("/diary"))
    }
    

   

    return(
        <MainWrapper>
            <Title>ABC CBT</Title>
<Link to="/about">About</Link>
            <InputWrapper>
            <Form onSubmit={onUserSubmit}>
                <label>Username or email</label>
                <input 
                type="text"
                placeholder="username"
                id="username"
                required={true}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                

                <label>Password</label>
                <input 
                type="password"
                placeholder="password"
                id="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                

                <button>Sign in</button>

                </Form>

                
                {/* <label>I agree to the terms and conditions</label>
                <input
                type="checkbox"
                id="terms"
                required={true}
                /> */}
                
                

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

export default StartPage