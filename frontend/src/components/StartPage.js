import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const StartPage = () => {



   

    return(
        <MainWrapper>
            <Title>ABC CBT</Title>
<Link to="/about">About</Link>
            <InputWrapper>
            <Form>
                <label>Username or email</label>
                <input 
                type="text"
                placeholder="username"
                id="username"
                required={true}
                />
                

                <label>Password</label>
                <input 
                type="password"
                placeholder="password"
                id="password"
                required={true}
                />
                

                <button>Sign in</button>

                </Form>

                
                <label>I agree to the terms and conditions</label>
                <input
                type="checkbox"
                id="terms"
                required={true}
                />
                
                

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