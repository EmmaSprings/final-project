import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { API_URL, GET_NOTE } from '../urls/api'



const Diary = () => {

  const {noteId} = useParams()

  const [notes, setNotes] = useState([])
  const accessToken = sessionStorage.getItem("accessToken")
  const navigate = useNavigate()

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
    fetchNotes()
  }, [])

  const fetchNotes = () => {

    fetch(API_URL("notes"), options)
      .then(res => res.json())
      .then(data => setNotes(data))
  }
  console.log(notes)

  const deleteNote = () => {
    fetch(GET_NOTE(noteId), {method: "DELETE"})
    .then(res => res.json())
    .then(data => {fetchNotes(data)})
  }

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  return (
    <MainWrapper>

    <Wrapper>
      <TitleWrapper>
        <Title>Diary</Title>
      </TitleWrapper>

      {notes.data?.map(note => {
        return (
          <Note>
            <LinkTitle key={note._id} to={`/note/${note._id}`}>{note.title}</LinkTitle>
            <DateText>{note.when}</DateText>
          </Note>
        )
      })}

      <LinkWrapper>
      <LinkBack to="/welcome">Profile</LinkBack>
      <LinkHome to="/addnote">Add Note</LinkHome>
      </LinkWrapper>
</Wrapper>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
background-image: url(./images/water-css.jpg);
display: flex;
flex-direction: column;
background-size:100vh;
background-position: center;
background-repeat: no-repeat;
height: 100vh;
filter: opacity(100%);

@media (min-width: 992px) {
  background-image: url(./images/bird-css.jpg);
  background-size: 100%;
  height: 100vh;

}
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`

const TitleWrapper = styled.div`

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

const Note = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 5px 20px 5px 20px;
width: 80vw;
height: 40px;
border-bottom: .3px solid black;
background-color: rgba(255, 255, 250, 0.80);
`

const LinkTitle = styled(Link)`
font-family: 'Heebo', sans-serif;
text-transform: uppercase;
font-weight: 300;
text-decoration: none;
color: #000;

&:hover {
  font-style: italic;
}
`

const DateText = styled.p`
font-family: 'Cormorant Garamond', serif;
text-transform: uppercase;
font-weight: 300;
color: #282828;
font-size: 14px;

`

const LinkWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
position: absolute;
z-index: 1;
bottom: 20px;
width: 50vw;

@media (min-width: 768px) {
  bottom: 50px;
}
`

const LinkBack = styled(Link)`
font-family: 'Cormorant Garamond', serif;
text-decoration: none;
font-size: 20px;
color: #154B5B;

@media (min-width: 768px) {
  bottom: 50px;
  font-size: 22px;
}

@media (min-width: 992px) {
  font-size: 22px;
  color: #fffffa;
}

`

const LinkHome = styled(LinkBack)`
`

export default Diary