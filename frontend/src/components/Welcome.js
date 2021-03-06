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
      <UserName>Welcome {`${username}`}<UserSpan>you're worth it</UserSpan></UserName>
      </UserWrapper> 
      <LinkWrapper>
      <LinkTo to="/diary">Diary</LinkTo>
      <LinkTo to="/addnote">Add note</LinkTo>
      </LinkWrapper>
      </Wrapper>
      <ButtonWrapper>
      <SignOutBtn onClick={() => {
        sessionStorage.clear()
        navigate("/")
      }}>Sign out</SignOutBtn>
      </ButtonWrapper>
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

@media (min-width: 992px) {
  background-image: url(./images/dayclouds-css.jpg);
  object-fit: cover;
  background-size: 100%;
}
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
margin: 20px;

`

const UserWrapper = styled.div`
display: flex;
justify-content: center;
text-align: center;

`


const UserName = styled.h5`
display: block;
font-family: 'Heebo', sans-serif;
font-size:30px;
font-weight: 600;
color: #154B5B;

@media (min-width: 768px) {
  font-size: 40px;
}
`

const UserSpan = styled.span`
font-family: 'Heebo', sans-serif;
display: block;
font-size:30px;
font-style: italic;
margin-top: 0;
font-weight: 300;

@media (min-width: 768px) {
  font-size: 40px;
}
`

const LinkWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 40px;
`

const LinkTo = styled(Link)`
font-family: 'Cormorant Garamond', serif;
margin-bottom: 20px;
text-decoration: none;
font-weight: 600;
color: #fffffa;
font-size: 40px;
text-transform: uppercase;

&:hover {
  font-style: italic;
  background-color: #fffffa;
  color: #154B5B;
}

@media (min-width: 768px) {
  font-size: 60px;
}
`

const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`

const SignOutBtn = styled.button`
font-family: 'Cormorant Garamond', serif;
background: none;
border: none;
font-size: 20px;
color: #154B5B;
position: absolute;
bottom: 40px;


&:hover {
  font-style: italic;
}

@media (min-width: 768px) {
  font-size: 24px;
}

`

export default Welcome