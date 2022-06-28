import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../urls/api'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


import Checkboxes from './Checkboxes'

const AddNote = () => {
    const accessToken = sessionStorage.getItem("accessToken")
    const [dateInput, setDateInput] = useState(new Date())

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



    console.log(dateInput.toDateString())

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
                consequences: consequences,
                when: dateInput.toDateString()
            })

        };
        fetch(API_URL("notes"), options)
            .then(res => res.json())
        navigate("/diary")
    }


    return (
        <MainWrapper>
<<<<<<< HEAD
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


                       <DatePicker
                        selected={dateInput}
                        onChange={(date) => setDateInput(date)}

                        />
               
                    <Textarea 
                    placeholder="Activating event - describe what you were doing and/or where your were at or going to do" 
                    name="activatingEvent"
                    value={newNote.activatingEvent}
                    onChange={onNewNoteValueChange}
                    >

                    </Textarea>
                    <Textarea 
                    placeholder="Beliefs - describe the thoughts it gave you, irrational and/or rational" 
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
      <LinkBack to="/welcome">Profile</LinkBack>
      <LinkHome to="/diary">Diary</LinkHome>
      </LinkWrapper>
=======
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

                        <DateWrapper>
                            <DatePicker
                                selected={dateInput}
                                onChange={(date) => setDateInput(date)}

                            />
                        </DateWrapper>
                        <Textarea
                            placeholder="Activating event - describe what you were doing and/or where your were at or going to do"
                            name="activatingEvent"
                            value={newNote.activatingEvent}
                            onChange={onNewNoteValueChange}
                        >

                        </Textarea>
                        <Textarea
                            placeholder="Beliefs - describe the thoughts it gave you, irrational and/or rational"
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
                    <LinkBack to="/welcome">Profile</LinkBack>
                    <LinkHome to="/diary">Diary</LinkHome>
                </LinkWrapper>
>>>>>>> 12876d863fab228f97acad53ecf8026d65819eec

            </Wrapper>
        </MainWrapper>
    )
}

const MainWrapper = styled.div`
background-image: url(./images/daycloudsportrait-css.jpg);
background-size:200%;
background-position: center;
background-repeat: no-repeat;
min-height: 100vh;

`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`

const DateWrapper = styled(Wrapper)`
margin-top: 10px;
margin-bottom: 10px;
text-align: center;
font-family: 'Cormorant Garamond', serif;
border: none;
background-color: #fffffa;
`

const TitleWrapper = styled.div`

`

const Title = styled.h1`
font-family: 'Cormorant Garamond', serif;
text-transform: uppercase;
font-style: italic;
font-size: 50px;
font-weight: 300;
margin: 10px 0 10px 0;
color: #154B5B;

@media (min-width:992px) {
    font-size: 50px;

}
`

const NotesWrapper = styled.div`
display: flex;
flex-direction: column;
width: 80vw;
align-items: center;
min-height: calc(100vh - 70px);


@media (min-width: 992px) {
 
   
}
`

const TitleInput = styled.input`
width: 80vw;
font-family: 'Cormorant Garamond', serif;
border: none;
margin-bottom: 3.5px;
padding-left: 5px;
text-transform: uppercase;
background-color: #fffffa;


&:focus {
    outline: none;
}

&::placeholder {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
}

@media (min-width: 768px) {
    width: 70vw;
    height: 3vh;
    
    &::placeholder {
   font-size: 20px;
}
}

@media (min-width: 992px) {
    width: 40vw;
    height: 5vh;
    align-content: center;

    &::placeholder {
   font-size: 18px;
}
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
padding-left: 5px;
margin-bottom: 5px;

&:focus {
    outline: none;
}

&::placeholder {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
}

@media (min-width: 768px) {
    width: 70vw;
    height: 25vh;

    &::placeholder {
   font-size: 20px;
}
}

@media (min-width: 992px) {
    width: 40vw;
    height: 25vh;
    
    &::placeholder {
   font-size: 18px;
}
    
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
margin: 60px 0 100px 10px;
font-size: 20px;
cursor: pointer;


&:hover {
font-style: italic;
}

@media (min-width: 768px) {
font-size:22px;
}
@media (min-width: 992px) {
  font-size: 22px;
}

`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const LinkWrapper = styled.footer`
display: inline-flex;
flex-direction: row;
justify-content: space-evenly;
position: sticky;
background-color: #fffffa;
z-index: 1;
padding: 10px;
width: 100vw;
bottom: 10px;

@media (min-width: 992px) {
  bottom: 40px;
}
`

const LinkBack = styled(Link)`
font-family: 'Cormorant Garamond', serif;
text-decoration: none;
font-size: 20px;
color: #000;

&:hover {
  font-style: italic;
}

@media (min-width: 768px) {
 font-size: 22px;
}
`

const LinkHome = styled(LinkBack)`
`

export default AddNote