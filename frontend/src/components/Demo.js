import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Demo = () => {
  return (
    <div>
       <TitleWrapper>
        <Title>Demo</Title>
      </TitleWrapper>

<UserInfo>
<DemoUser>Want to take a look around first?</DemoUser>
<DemoUser>Feel free to use:</DemoUser> 
      <Username><UserSpan>USER:</UserSpan> princesselsa</Username>
      <Password><UserSpan>PASSWORD:</UserSpan> testpassword</Password>
      </UserInfo>

      <LinkWrapper>

          <LinkTo to="/">Start</LinkTo>
          <LinkTo to="/signin">Sign in</LinkTo>
          

        </LinkWrapper>
   
    </div>
  )
}

const TitleWrapper = styled.div`
display: flex;
justify-content: center;
`

const Title = styled.h1`
font-family: 'Cormorant Garamond', serif;
text-transform: uppercase;
font-style: italic;
color: #154B5B;
font-size: 50px;
font-weight: 400;
margin: 10px 0 10px 0;
`

const UserInfo = styled.div`
display: flex;
flex-direction: column;
margin: 20px;
`

const DemoUser = styled.h2`
font-family: 'Heebo', sans-serif;
font-weight: 300;
font-size: 18px;
margin: 0;

`

const Username = styled.h3`
font-family: 'Cormorant Garamond', serif;
margin: 10px 0 0 0;
color: 
`

const UserSpan = styled.h3`
display: inline;
font-family: 'Cormorant Garamond', serif;
font-weight: 300;
margin: 10px 0 0 0;
`

const Password = styled(Username)`
`
const LinkWrapper = styled.div`
font-family: 'Cormorant Garamond', serif;
display: flex;
flex-direction: row;
justify-content: space-evenly;
position: sticky;
z-index: 1;
padding: 10px;
width: 100vw;
background: #fffffa;

`

const LinkTo = styled(Link)`
text-decoration: none;
font-style:normal;
color: #154B5B;

&:visited{
  color: #154B5B;
}

&:hover{
  font-style: italic;
}

`



export default Demo