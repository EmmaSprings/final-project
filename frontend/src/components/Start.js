import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Start = () => {

  return(
    <MainWrapper>
    <TextWrap>
    <StartWrap>
      <CBT>CBT</CBT>
      <HeadSpan>/</HeadSpan>
      <ABC>ABC</ABC>
      </StartWrap>

      <LoginWrap>
        <Login to="/signin">Login</Login>
      </LoginWrap>

      <DemoWrap>
        <Demo to="/demo">Demo</Demo>
      </DemoWrap>
      </TextWrap>
<AboutWrap>
      <AboutText>
      <AboutSpan>This app is based on</AboutSpan> the Cognitive Behavioral Therapy model <ABCSpan>ABC</ABCSpan>, that helps you keep track of your
          emotions by dividing them into three different parts - <ABCSpan>A</ABCSpan>ctivating event, <ABCSpan>B</ABCSpan>eliefs and <ABCSpan>C</ABCSpan>onsequences -
          so that you can see patterns between your emotions and behavior, to better understand yourself and improve your mental health.
          </AboutText>
       <AboutText>
       <AboutSpan>Disclaimer:</AboutSpan> This is not created by proffessional therapists and it's not made
          for proffessional use. It is created in
          the hope of helping anyone who wants to sort their thoughts and
          emotions out in an easy and effective way.
      </AboutText>
      </AboutWrap>

     

    </MainWrapper>
  )
}

const MainWrapper = styled.div`
background-image: url(./images/ocean-css.jpg);
display: flex;
flex-direction: column;
background-size:70vh;
background-position: center;
background-repeat: no-repeat;
height: 100vh;
width: 40vw;

@media (min-width: 992px) {
  background-image: url(./images/ocean-css.jpg);
background-size: 100%;
}
`

const StartWrap = styled.div`
display: flex;
flex-direction: column;
position: relative;

@media (min-width: 992px)  {

}

`

const TextWrap = styled.div`
position: relative;
top: -5vh;
left: 1.8vw;

@media (min-width: 768px) {
top: -3vh;
left: 4vw;
}

@media (min-width: 992px)  {
top: 5vh;
left: 8vw;
}
`
const CBT = styled.h1`
font-family: 'Heebo', sans-serif;
font-weight: 300;
color: #fffffa;
  font-size: 80px;
  /* margin: 20px 0 0 10px; */
  line-height: 80px;
  letter-spacing: -5px;

  @media (min-width: 768px) {
  font-size: 140px;
  
  }

@media (min-width: 992px)  {
  font-weight: 300;
  font-size: 220px;
  margin: 50px 0 0 80px;
  line-height: 80px;
  letter-spacing: -15px;

}
`

const ABC = styled(CBT)`
position: absolute;
left: 40vw;
top: 1.8vh;
color: blue;
font-style: italic;
font-size: 110px;

@media (min-width: 768px) {
font-size: 180px;
left: 39vw;
    
}

@media (min-width: 992px)  {
font-size: 240px;
left: 34vw;
top: 4vh;
}

`

const HeadSpan = styled.span`
position: absolute;
top:6.8vh;
left: 33.7vw;
font-family: 'Cormorant Garamond', serif;
font-weight: lighter;
font-style: italic;
font-size: 100px;

@media (min-width: 768px) {
font-size: 180px;
top: 3vh;
}

@media (min-width: 992px)  {
font-size: 220px;
top: -6vh;
left: 29.5vw;
}
`

const LoginWrap = styled.div`
position: absolute;
display: flex;
top: 81vh;
left: 32vw;

@media (min-width: 768px) {
   top: 70vh; 
}

@media (min-width: 992px)  {
top: 60vh;
left: 36vw;
}
`

const Login = styled(Link)`
font-family: 'Cormorant Garamond', serif;
font-size: 70px;
font-weight: 200;
margin: 0;
text-decoration: none;
color: black;

&:visited {
 color: black;
}

&:hover {
  font-style: italic;
  color: blue;
}

@media (min-width: 768px) {
font-size: 120px;
    
}

@media (min-width: 992px)  {
font-size: 140px;
}
`

const DemoWrap = styled.div`
display: flex;
position: absolute;
bottom: -75vh;
left: 18.5vw;

@media (min-width: 768px) {
bottom: -70vh;
}

@media (min-width: 992px)  {
left: 20vw;
}
`

const Demo = styled(Link)`
margin-left: 50vw;
font-family: 'Heebo', sans-serif;
font-size: 40px;
letter-spacing: -5px;
font-weight: 100;
text-decoration: none;

&:visited {
 color: black;
}

&:hover {
  /* font-style: italic; */
  text-decoration: underline;
}
@media (min-width: 768px) {
font-size: 60px;
    
}

@media (min-width: 992px)  {
margin-left: 50vw;
font-size: 80px;
font-weight: 100;
}
`

const AboutWrap = styled.div`
position: absolute;
top: 20.8vh;
left: 42.8vw;
width: 54.5vw;

@media (min-width: 768px) {
width: 49vw;
top: 28vh;
left: 45vw;
    
}

@media (min-width: 992px) {
  width: 38vw;
  top: 34vh;
  left: 54vw;
}
`

const AboutText = styled.p`
font-family: 'Cormorant Garamond', serif;
font-size: 15px;

@media (min-width: 768px) {
  font-size: 21px;
}

@media (min-width: 992px) {
font-size: 20px;
}
`

const AboutSpan = styled(AboutText)`
display: inline;
font-style: italic;
font-weight: 600;
`

const ABCSpan = styled(AboutSpan)`
font-style: normal;
font-weight: 800;
`

export default Start

