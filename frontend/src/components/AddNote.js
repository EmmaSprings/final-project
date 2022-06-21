import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'
import { API_URL } from '../urls/api'
import Checkboxes from './Checkboxes'

const AddNote = () => {
    const navigate = useNavigate()
    const accessToken = sessionStorage.getItem("accessToken")
    const consequences = JSON.parse(sessionStorage.getItem("CheckBoxesData"))
    console.log(consequences)
    const [newNote, setNewNote] = useState({
        title: "",
        activatingEvent: "",
        automatingThoughts: "",
    })

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
    const consequences = JSON.parse(sessionStorage.getItem("CheckBoxesData"))
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
            <div>
                <h1>Add note</h1>
            </div>

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

                <Checkboxes />
                <AddBtnWrapper>

                <AddBtn type="submit">Add</AddBtn>
                </AddBtnWrapper>
                </Form>

            </NotesWrapper>
            <Link to="/welcome">Back</Link>
            <Link to="/">Home</Link>

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

const EmoBtn = styled.button`
width: 60px;
height: 60px;
background-color: paleturquoise;
border-radius: 50%;
border:none;
margin: 3px;
cursor: pointer;
`
const ReactionBtn = styled(EmoBtn)`
background-color: palevioletred;
`

const GoodBtn = styled(EmoBtn)`
background-color: palegreen;`

const TitleInput = styled.input`
width: 80vw;
border-top: none;
border-right:none;
border-left: none;
border-bottom: 1px dashed gray;
margin-bottom: 10px;
background: none;
font-family: 'Heebo', sans-serif;
text-transform: uppercase;

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
border-right: none;
border-left: none;
border-bottom: none;
font-family: 'Cormorant Garamond', serif;

&:focus {
    outline: none;
}

&::placeholder {
    font-family: 'Heebo', sans-serif;
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

export default AddNote