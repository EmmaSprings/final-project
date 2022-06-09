import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'


const Welcome = () => {
const accessToken = sessionStorage.getItem("accessToken")
const username = sessionStorage.getItem("username")

  return(
    <MainWrapper>

      <h5>{`Welcome ${username}`}</h5>
      <LinkTo to="/diary">Diary</LinkTo>
      <LinkTo to="/addnote">Add note</LinkTo>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 20px;
`

const LinkTo = styled(Link)`
margin-bottom: 20px;
`

export default Welcome