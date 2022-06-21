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
      This app is based on the ABC, cognitive behavioral therapy, model ABC where you keep track of your
          emotions by dividing them into three different parts- activating event
          (what happened) Beliefs - What did it make you think or believe?
          (Irrational and/or rational?) and consequences - emotions it gave you,
          so that you can sort them instead of let them be there and not knowing
          why.
          </AboutText>
       <AboutText>
          Disclaimer: This is not created by proffessional therapists and is not made
          for proffessional use. It is created in
          the hope of helping anyone who wants to sort their thoghts and
          emotions out in an easy and effective way.
      </AboutText>
      </AboutWrap>

      {/* <OceanImg src="./images/ocean-css.jpg" alt="ocean" /> */}

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



@media (min-width: 992px)  {

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


@media (min-width: 992px)  {
  font-weight: 300;
  font-size: 150px;
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


@media (min-width: 992px)  {

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


@media (min-width: 992px)  {

}
`

const LoginWrap = styled.div`
position: absolute;
display: flex;
top: 79vh;
left: 32vw;

@media (min-width: 992px)  {

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

@media (min-width: 992px)  {

}
`

const DemoWrap = styled.div`
display: flex;
position: absolute;
bottom: -75vh;
left: 18.5vw;
`

const Demo = styled(Link)`
margin-left: 50vw;
font-family: 'Heebo', sans-serif;
font-size: 45px;
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

@media (min-width: 992px)  {
margin-left: 50vw;
font-size: 100px;
font-weight: 100;
}
`

const AboutWrap = styled.div`
position: absolute;
top: 20.2vh;
left: 42.8vw;
width: 54.5vw;
`

const AboutText = styled.p`
font-family: 'Cormorant Garamond', serif;
font-size: 14px;
`

// const OceanImg = styled.img`
// position: absolute;
// width: 40vw;
// z-index: -1;
// top: 0;

// `

export default Start

