import React, {useEffect} from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'


const Welcome = () => {
const accessToken = sessionStorage.getItem("accessToken")
const username = sessionStorage.getItem("username")

const navigate = useNavigate()

useEffect(() => {
  if (!accessToken) {
    navigate("/");
  }
}, [])
  return(
    <MainWrapper>
    <Wrapper>

      <UserWrapper>
      <UserName>Welcome <UserSpan>{`${username}`}</UserSpan></UserName>
      </UserWrapper> 

      <LinkTo to="/diary">Diary</LinkTo>
      <LinkTo to="/addnote">Add note</LinkTo>
      </Wrapper>
      <SignOutBtn onClick={() => {
        sessionStorage.clear()
        navigate("/")
      }}>Sign out</SignOutBtn>
    </MainWrapper>
  )
}


const MainWrapper = styled.div`
display: flex;
flex-direction: column;
background-image: url(./images/bright-clouds-css.jpg);
background-size:100vh;
background-position: center;
background-repeat: no-repeat;
height: 100vh;

`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
margin: 20px


`

const UserWrapper = styled.div`

`


const UserName = styled.h5`
display: inline;
font-family: 'Heebo', sans-serif;
font-size: 16px;
font-weight: 300;
`

const UserSpan = styled(UserName)`
font-style: italic;
`

const LinkTo = styled(Link)`
font-family: 'Cormorant Garamond', serif;
margin-bottom: 20px;
text-decoration: none;
color: #fffffa;
font-size: 40px;
`

const SignOutBtn = styled.button`
font-family: 'Cormorant Garamond', serif;
background: none;
border: none;
font-size: 40px;
color: #fffffa;
position: absolute;
bottom: 40px;


&:hover {
  font-style: italic;
}

`

export default Welcome