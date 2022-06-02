import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'


const SignUp = () => {
    return(
        <MainWrapper>
            <Title>ABC CBT</Title>

            <InputWrapper>
            <Form>
            <input 
                type="email"
                placeholder="email"
                id="email"
                />
                <input 
                type="text"
                placeholder="username"
                id="username"
                />
                <input 
                type="password"
                placeholder="password"
                id="password"
                />
                <button>Sign up</button>
                </Form>

                <label>I agree to the terms and conditions
                <input
                type="checkbox"
                id="terms"
                required={true}
                />
                </label> 

            </InputWrapper>

            {/* <div>
                <button>sign up</button>
            </div> */}

            <div>
                <Link to="/">Home</Link>
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

export default SignUp