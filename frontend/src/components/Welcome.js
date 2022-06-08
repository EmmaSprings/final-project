import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'


const Welcome = () => {
const accessToken = sessionStorage.getItem("accessToken")
const username = sessionStorage.getItem("username")

  return(
    <div>

      <h5>{`Welcome ${username}`}</h5>
      <Link to="/diary">Diary</Link>
      <Link to="/addnote">Add note</Link>
    </div>
  )
}

export default Welcome