import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Start = () => {

  return(
    <div>
    <TextWrap>
    <StartWrap>
      <ABC>ABC/<HeadSpan>easy as</HeadSpan></ABC>
      <CBT>CBT</CBT>
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
      This app is based on the CBT, cognitive behavioral therapy, model ABC where you keep track of your
          emotions by dividing them into three different parts- activating event
          (what happened) Beliefs - What did it make you think or believe?
          (Irrational and/or rational?) and consequences - emotions it gave you,
          so that you can sort them instead of let them be there and not knowing
          why.
          </AboutText>
       <AboutText>
          Disclaimer: This is not created by proffessional therapists and is not made
          for proffessional use. It is created in
          the hope of helping everyone who wants to sort their thoghts and
          emotions out in an easy and effective way.
      </AboutText>
      </AboutWrap>

      <OceanImg src="./images/ocean-css.jpg" alt="ocean" />

    </div>
  )
}

const StartWrap = styled.div`
display: flex;
flex-direction: column;
position: relative;

`

const TextWrap = styled.div`
margin-left: 224px;
margin-top: 40px;
`
const ABC = styled.h1`
font-family: 'Heebo', sans-serif;
font-weight: 300;
font-size: 150px;
margin: 50px 0 0 80px;
line-height: 80px;
letter-spacing: -15px;
`

const CBT = styled(ABC)`
margin-left: 32vw;
color: blue;
font-style: italic;

`

const HeadSpan = styled.span`
font-family: 'Cormorant Garamond', serif;
font-weight:lighter;
font-style: italic;
font-size: 120px;
letter-spacing: -3px;


`

const LoginWrap = styled.div`
display: flex;
margin-top: 20px;
margin-left: 20vw;

`

const Login = styled(Link)`
font-family: 'Cormorant Garamond', serif;
font-size: 150px;
font-weight: 200;
margin: 0;
text-decoration: none;
color: black;

&:visited {
 color: black;
}

&:hover {
  font-style: italic;
}
`

const DemoWrap = styled.div`

`

const Demo = styled(Link)`
margin-left: 50vw;
font-family: 'Heebo', sans-serif;
font-size: 100px;
font-weight: 100;
text-decoration: none;

&:visited {
 color: black;
}

&:hover {
  /* font-style: italic; */
  text-decoration: underline;
}
`

const AboutWrap = styled.div`
position: absolute;
top: 60px;
left: 70vw;
width: 25vw;
`

const AboutText = styled.p`
font-family: 'Cormorant Garamond', serif;
font-size: 16px;
`

const OceanImg = styled.img`
position: absolute;
width: 40vw;
z-index: -1;
top: 0;

`

export default Start

