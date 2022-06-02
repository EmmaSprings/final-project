import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const AddNote = () => {
    return(
        <MainWrapper>
        <div>
            <h1>Add note</h1>
        </div>

        <NotesWrapper>
            <textarea>Title</textarea>
            <textarea>A</textarea>
            <textarea>B</textarea>
            <Emotions>Emotions</Emotions>
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

export default AddNote