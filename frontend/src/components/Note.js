import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { GET_NOTE } from '../urls/api'

const Note = () => {
  const accessToken = sessionStorage.getItem("accessToken")
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])

  const { noteId } = useParams()

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [])

  const options = {
    method: "GET",
    headers: { Authorization: accessToken }
  }

  useEffect(() => {
    fetch(GET_NOTE(noteId), options)
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])
  console.log(notes)


  return (
    <MainWrapper>
      <div>
        <h1>My note</h1>
      </div>

      {notes.map(note => {

        return (
          <NotesWrapper>
            <p>{note.title}</p>
            <p>{note.activatingEvent}</p>
            <p>{note.automatingThoughts}</p>
            <p>{note.consequences}</p>
          </NotesWrapper>
        )
      })}

      {/* <NotesWrapper>
        <h4>hello `${username}`</h4>
            <p>T {title}</p>
            <Event><p>A {activatingEvent}</p></Event>
            <Thought><p>B {beliefs}</p></Thought>
            <Emotions>Emotions</Emotions>
        </NotesWrapper> */}

      <Link to="/welcome">Profile</Link>
      <Link to="/">Home</Link>

    </MainWrapper>
  )
}

const MainWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const NotesWrapper = styled.div`
display: flex;
flex-direction: column;
width: 80vw;
`

const Emotions = styled.div`
border: 1px solid black;

`

const Event = styled.div`
height: 200px;
border: 1px solid gray;
`
const Thought = styled(Event)`
`

export default Note