import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'
import { API_URL } from '../urls/api'

import Checkboxes from './Checkboxes'

const AddNote = () => {
    const accessToken = sessionStorage.getItem("accessToken")

    const [consequences, setConsequences] = useState({
        negativeEmotions: [],
        positiveEmotions: [],
        physicalReactions: []
    })

    console.log(consequences)

    const [newNote, setNewNote] = useState({
        title: "",
        activatingEvent: "",
        automatingThoughts: "",
    })

    const navigate = useNavigate()

      const onNewNoteValueChange = (event) => {
        const { name, value } = event.target
        setNewNote((prev) => {
          return {
              ...prev,
            [name]: value
          }
        })
      }
      
    useEffect(() => {
        if (!accessToken) {
            navigate("/signin");
        }
    }, [])

 const onNoteSubmit = () => {   

    const options = {
        method: "POST",
        headers: {
            "Authorization": accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newNote.title,
            activatingEvent: newNote.activatingEvent,
            automatingThoughts: newNote.automatingThoughts,
            consequences: consequences
          })

    };
        fetch(API_URL("notes"), options)
            .then(res => res.json())
            navigate("/diary")
 }

    return (
        <MainWrapper>
        <Wrapper>
        <TitleWrapper>
        <Title>My note</Title>
      </TitleWrapper>

            <NotesWrapper>
                <Form onSubmit={onNoteSubmit}>
                    <TitleInput
                        type="text"
                        placeholder="Title"
                        maxLength={25}
                        name="title"
                        value={newNote.title}
                        onChange={onNewNoteValueChange}
                        required={true}
                    />

                    <Textarea 
                    placeholder="Activating event" 
                    name="activatingEvent"
                    value={newNote.activatingEvent}
                    onChange={onNewNoteValueChange}
                    >

                    </Textarea>
                    <Textarea 
                    placeholder="Beliefs" 
                    name="automatingThoughts"
                    value={newNote.automatingThoughts}
                    onChange={onNewNoteValueChange}
                    >
                    </Textarea>

                <Checkboxes consequences={consequences} setConsequences={setConsequences} />
                <AddBtnWrapper>
                <AddBtn type="submit">Add</AddBtn>
                </AddBtnWrapper>
                </Form>

            </NotesWrapper>
            <LinkWrapper>
      <LinkBack to="/welcome">Back</LinkBack>
      <LinkHome to="/">Home</LinkHome>
      </LinkWrapper>

            </Wrapper>
        </MainWrapper>
    )
}

const MainWrapper = styled.div`
background-image: url(./images/daycloudsportrait-css.jpg);
background-size:110%;
background-position: center;
background-repeat: no-repeat;
height: 100vh;

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

const NotesWrapper = styled.div`
display: flex;
flex-direction: column;
width: 80vw;
`

const Emotions = styled.div`
display: flex;
border: 1px solid black;
`

const Reaction = styled(Emotions)`
`



// const EmoBtn = styled.button`
// width: 60px;
// height: 60px;
// background-color: paleturquoise;
// border-radius: 50%;
// border:none;
// margin: 3px;
// cursor: pointer;
// `
// const ReactionBtn = styled(EmoBtn)`
// background-color: palevioletred;
// `

// const GoodBtn = styled(EmoBtn)`
// background-color: palegreen;`

const TitleInput = styled.input`
width: 80vw;
font-family: 'Cormorant Garamond', serif;
border: none;
margin-bottom: 10px;
background-color: #fffffa;
font-family: 'Heebo', sans-serif;
/* text-transform: uppercase; */

&:focus {
    outline: none;
}

&::placeholder {
    font-family: 'Cormorant Garamond', serif;
}
`

const Textarea = styled.textarea`
resize: none;
height: 20vh;
width: 80vw;
background: none;
border:none;
font-family: 'Cormorant Garamond', serif;
background-color: #fffffa;

&:focus {
    outline: none;
}

&::placeholder {
    font-family: 'Cormorant Garamond', serif;
}
`

const AddBtnWrapper = styled.div`
display: flex;
justify-content: center;
`

const AddBtn = styled.button`

font-family: 'Cormorant Garamond', serif;
background: none;
border: none;
margin: 20px 0 20px 10px;
font-size: 16px;


&:hover {
font-style: italic;
}

@media (min-width: 992px) {
  font-size: 18px;
}

`

const Form = styled.form`
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

export default AddNote