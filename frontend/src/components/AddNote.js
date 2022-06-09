import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'
import { BadEmotions, GoodEmotions, reactions } from '../data'
import { API_URL } from '../urls/api'

const AddNote = () => {
    const [emotion, setEmotion] = useState([])
    const [addNote, setAddNote] = useState([])
    const accessToken = sessionStorage.getItem("accessToken")
    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
          navigate("/");
        }
      }, [])

    const options = {
        method: "POST",
        headers: { Authorization: accessToken },
        // body: JSON.stringify({
        //     email: email,
        //     username: username,
        //     password: password,
        //   })

    };

    useEffect(() => {
        fetch(API_URL("notes"), options)
            .then(res => res.json())
            .then(data => setAddNote(data))
    }, [])

    return (
        <MainWrapper>
            <div>
                <h1>Add note</h1>
            </div>

            <NotesWrapper>
                <Form>
                    <TitleInput
                        type="text"
                        id="title"
                        placeholder="Title"
                        maxLength={25}
                    />

                    <Textarea placeholder="Activating event" ></Textarea>
                    <Textarea placeholder="Beliefs" ></Textarea>
                </Form>

                <Emotions >
                    {/* <p>Emotions</p> */}
                    {/* <EmoBtn></EmoBtn> */}
                    {BadEmotions.map(emotion => {
                        return (
                            <div>
                                <EmoBtn value={emotion.emotion} key={emotion.id}>{emotion.emotion}</EmoBtn>
                            </div>
                        )
                    })}

                </Emotions>

                <Reaction >
                    {GoodEmotions.map(goodEmo => {
                        return (
                            <div>
                                <ReactionBtn key={goodEmo.id}>{goodEmo.emotion}</ReactionBtn>
                            </div>
                        )
                    })}
                </Reaction>

                <Emotions >
                    {reactions.map(reaction => {
                        return (
                            <div>
                                <GoodBtn key={reaction.id}>{reaction.reaction}</GoodBtn>
                            </div>
                        )
                    })}
                </Emotions>

                <Form onSubmit={() => options}>
                    <button type="submit">Add</button>
                </Form>

            </NotesWrapper>
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