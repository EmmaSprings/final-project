import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { BadEmotions, GoodEmotions, reactions } from '../data'



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
            {/* <p>Emotions</p> */}
            {/* <EmoBtn></EmoBtn> */}
            {BadEmotions.map( emotion => {
                return (
                    <div>
                        <EmoBtn>{emotion.emotion}</EmoBtn>
                    </div>
                )
            })}
            
            </Emotions>

            <Reaction>
            {GoodEmotions.map( goodEmo => {
                return (
                    <div>
                        <ReactionBtn>{goodEmo.emotion}</ReactionBtn>
                    </div>
                )
            })}
            </Reaction>

            <Emotions>
                {reactions.map( reaction => {
                    return(
                        <div>
                    <GoodBtn>{reaction.reaction}</GoodBtn>
                    </div>
                    )
                })}
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