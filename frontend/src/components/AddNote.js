import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const AddNote = ({title, activatingEvent, beliefs}) => {

    const onFormSubmit = (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            headers: {Authorization: "accessToken"},
          };
    }
    
    return(
        <MainWrapper>
        <div>
            <h1>Add note</h1>
        </div>

        <NotesWrapper>
        <Form onSubmit={onFormSubmit}>
            <TitleInput
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            maxLength={25}
            />
            
            <Textarea placeholder="Activating event" value={activatingEvent}></Textarea>
            <Textarea placeholder="Beliefs" value={beliefs}></Textarea>
             </Form>

            <Emotions>
            <p>Emotions</p>
            <EmoBtn></EmoBtn>
            <ReactionBtn></ReactionBtn>
            </Emotions>
 
             <Form>
            <button type="submit" onClick={onFormSubmit}>Add</button>
            </Form>

        </NotesWrapper>

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

const EmoBtn = styled.button`
width: 40px;
height: 40px;
background-color: paleturquoise;
border-radius: 50%;
border:none;
margin: 3px;
`
const ReactionBtn = styled(EmoBtn)`
background-color: palevioletred;
`

const TitleInput = styled.input`
width: 80vw;
border-top: none;
border-right:none;
border-left: none;
border-bottom: 1px dashed gray;
margin-bottom: 10px;
background: none;
`

const Textarea = styled.textarea`
resize: none;
height: 20vh;
width: 80vw;
background: none;
border-right: none;
border-left: none;
border-bottom: none;
`

const Form = styled.form`
`

export default AddNote