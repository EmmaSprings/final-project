import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUpSuccess = () => {

  const navigate = useNavigate()

  useEffect( () => {
    setTimeout( () => {
      navigate("/")
    }, 3000);

  })
  return (
    <MainWrapper>
    <Wrapper>
    <Title>Success!</Title>
    <RedirectText>Redirecting to login..</RedirectText>

    <IfNotWorkingWrapper>
    <NotWorkingText>Not working? Press</NotWorkingText>
    <LinkHome to="/">here</LinkHome>
    </IfNotWorkingWrapper>
    </Wrapper>
    </MainWrapper>   

  )
}

const MainWrapper = styled.div`
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
margin: 20px;
align-items: center;

`

const Title = styled.h1`
font-family: 'Heebo', sans-serif;
font-weight: 300;
font-size: 40px;
text-transform: uppercase;
<<<<<<< HEAD
=======

>>>>>>> 12876d863fab228f97acad53ecf8026d65819eec
`

const RedirectText = styled.h3`
font-family: 'Cormorant Garamond', serif;
animation: pulse 4s infinite;

@keyframes pulse {
  0% {
    transform: scale(0.95);
    
  }
  
  70% {
    transform: scale(1.5);
    
  }
  
  100% {
    transform: scale(0.95);
    
  }
}
`

const IfNotWorkingWrapper = styled.div`
display: flex;

`

const NotWorkingText = styled.p`
font-family: 'Cormorant Garamond', serif;
margin: 0;

`

const LinkHome = styled(Link)`
font-family: 'Cormorant Garamond', serif;
margin-left: 5px;
text-decoration: none;
color: black;

&:visited {
  color: black;
}

&:hover {
  font-style: italic;
}
`

export default SignUpSuccess