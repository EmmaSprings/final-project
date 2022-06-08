import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import { API_URL } from '../urls/api'


const Diary = () => {
  const [notes, setNotes] = useState([])
  const accessToken = sessionStorage.getItem("accessToken")

  const options = {
    method: "GET",
    headers: { Authorization: accessToken }
  }

  useEffect( () => {
   fetch(API_URL("notes"), options)
   .then( res => res.json())
   .then( data => setNotes(data))
  }, [])
  console.log(notes)


    const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    return(
        <MainWrapper>
        <div>
            <h1>Diary</h1>
        </div>

        <Note>
        {notes.data?.map( note => {
      <p>{note.title}</p>
    })}
      {/* <p>{date}</p> */}
      <Icon src="./icons/pen.png" alt="pen" />
        </Note>
        <Link to="/welcome">Back</Link>

        <Link to="/">Home</Link>

        </MainWrapper>
    )
}

const MainWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Note = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 5px 20px 5px 20px;
width: 80vw;
height: 40px;
border: 1px solid black;
background-color: #EFEDDB;
`

const Icon = styled.img`
width: 5%;
`

export default Diary