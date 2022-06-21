import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatDistance } from 'date-fns'

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
            {/* <button>
            <Icon role="img" src="./icons/pen.png" alt="pen" /> 
            </button> */}
            
             {/* <DeleteBtn onClick={() => deleteNote(note._id)}></DeleteBtn> */}
          </Note>
        )
      })}

      <LinkWrapper>
      <LinkBack to="/welcome">Back</LinkBack>
      <LinkHome to="/">Home</LinkHome>
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
/* text-transform: uppercase; */
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

const Icon = styled.img`
width: 5%;
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
/* font-family: 'Heebo', sans-serif; */
font-family: 'Cormorant Garamond', serif;
text-transform: uppercase;
font-weight: 300;
color: darkgray;
font-size: 14px;

`

const DeleteBtn = styled.button`
display: flex;
background-image:url(./icons/delete.png);
background-size: 100%;
background-repeat: no-repeat;
filter: opacity(50%);
align-self: center;
width: 20px;
height: 20px;
border: none;
background-color: rgba(255, 255, 250, 0.20);
/* background: none; */
`

const LinkWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
position: absolute;
z-index: 1;
bottom: 20px;
width: 50vw;

@media (min-width: 992px) {
  bottom: 40px;
}
`

const LinkBack = styled(Link)`
font-family: 'Cormorant Garamond', serif;
text-decoration: none;
font-size: 16px;
color: #000;

@media (min-width: 992px) {
 font-size: 22px;
}
`

const LinkHome = styled(LinkBack)`
`

export default Diary