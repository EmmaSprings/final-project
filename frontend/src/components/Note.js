import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const Note = ({title, activatingEvent, beliefs}) => {
const accessToken = sessionStorage.getItem("accessToken")
const username = sessionStorage.getItem("username")


    return(
        <MainWrapper>
        <div>
            <h1>My note</h1>
        </div>

        <NotesWrapper>
        <h4>hello `${username}`</h4>
            <p>T {title}</p>
            <Event><p>A {activatingEvent}</p></Event>
            <Thought><p>B {beliefs}</p></Thought>
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

const Event = styled.div`
height: 200px;
border: 1px solid gray;
`
const Thought = styled(Event)`
`

export default Note