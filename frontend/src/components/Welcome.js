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

      <h5>{`Welcome ${username}`}</h5>
      <LinkTo to="/diary">Diary</LinkTo>
      <LinkTo to="/addnote">Add note</LinkTo>
      <button onClick={() => {
        sessionStorage.clear()
        navigate("/")
      }}>Sign out</button>
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