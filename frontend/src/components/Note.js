import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { GET_NOTE } from '../urls/api'
import Checkboxes from './Checkboxes'
// import pen from './icons/pen.png'

const Note = () => {
  const accessToken = sessionStorage.getItem("accessToken")
  const consequences = sessionStorage.getItem("CheckBoxesData")
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [editTitle, setEditTitle] = useState(null)
  const [editActivatingEvent, setEditActivatingEvent] = useState(null)
  const [editAutomatingThought, setEditAutomatingThought] = useState(null)
  

  const { noteId } = useParams()

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
    fetch(GET_NOTE(noteId), options)
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])
  console.log(notes)

  const onEditNoteSubmit = (event) => {

    event.preventDefault()

    const options = {
      method: "PATCH",
      headers: {
          "Authorization": accessToken,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: editTitle,
        activatingEvent: editActivatingEvent,
        automatingThoughts: editAutomatingThought,
        // consequences: consequences
      })
    }

      fetch(GET_NOTE(noteId), options)
      .then(res => res.json())
      .then(data => setNotes(data))

  }

  const deleteNote = () => {

    fetch(GET_NOTE(noteId), {method: "DELETE"})
    .then(res => res.json())
    .then(data => setNotes(data))
    
    navigate("/diary")
  }


  return (
    <MainWrapper>
      <div>
        <h1>My note</h1>
      </div>

      {notes.map(note => {

        return (
          
          <NotesWrapper>
            {!!editTitle ?  
            <div>
                    <form htmlFor="title" onSubmit={onEditNoteSubmit} >
                        <TitleInput
                        type="text"
                        maxLength={25}
                        name="title"
                        value={editTitle.title}
                        onChange={(event) => setEditTitle(event.target.value)}  
                    /> 
                    <button type="submit" onClick={()=> setEditTitle(null)}>Submit</button>
                    <button type="button" onClick={()=> setEditTitle(null)}>Cancel</button>
                    </form> 
                    </div>
                    :
                  
                    <div>
                    <p>{note.title}
                    <EditBtn type="button" onClick={() => setEditTitle(note)}>
                    <Icon role="img" src="/icons/pen.png" alt="pen" /> 
                    </EditBtn></p>
                    </div>}

             {!!editActivatingEvent?
             <div>
              <form  htmlFor="activatingEvent" onSubmit={onEditNoteSubmit}>
                    <Textarea 
                    name="activatingEvent"
                    value={editActivatingEvent.activatingEvent}
                    onChange={(event) => setEditActivatingEvent(event.target.value)}
                    >
                      </Textarea>
                     <button type="submit" onClick={()=> setEditActivatingEvent(null)}>Submit</button>
                     <button type="button" onClick={()=> setEditActivatingEvent(null)}>Cancel</button>
                     </form>
                    </div>
                     :
                         <div>
                         <p>Activating event: {note.activatingEvent}
                         <EditBtn type="button" onClick={() => setEditActivatingEvent(note)}>
                         <Icon role="img" src="/icons/pen.png" alt="pen" /> 
                         </EditBtn></p>
                         </div>
             }       

             {!!editAutomatingThought ? 
             
             <form htmlFor="automatingThoughts" onSubmit={onEditNoteSubmit}>
             <Textarea 
                    placeholder="Beliefs" 
                    name="automatingThoughts"
                    value={editAutomatingThought.automatingThoughts}
                    onChange={(event) => setEditAutomatingThought(event.target.value)} 
                    >
            </Textarea>
            <button type="submit" onClick={()=> setEditAutomatingThought(null)}>Submit</button>
                    </form> 
                    :             
             <div>
            <p>Automating thoughts: {note.automatingThoughts}
            <EditBtn type="button" onClick={() => setEditAutomatingThought(note)}>
            <Icon role="img" src="/icons/pen.png" alt="pen" /> 
            </EditBtn></p>
            </div>}
            <Checkboxes checkedData={consequences} />
          

{/* 
            <div>
            {note.consequences.positiveEmotions.length > 0 ? 
            <p>Positive emotions: <>{note.consequences.positiveEmotions}
            <EditBtn type="button">
            <Icon role="img" src="/icons/pen.png" alt="pen" /> 
            </EditBtn></></p> 
            : null }
            </div>

            <div>
            {note.consequences.negativeEmotions.length > 0 ? 
            <p>Negative emotions: <>{note.consequences.negativeEmotions}
            <EditBtn type="button">
            <Icon role="img" src="/icons/pen.png" alt="pen" /> 
            </EditBtn></></p> 
            : null }
            </div>

            <div>
            {note.consequences.physicalReactions.length > 0 ? 
            <p>Physical reactions: <>{note.consequences.physicalReactions}
            <EditBtn type="button">
            <Icon role="img" src="/icons/pen.png" alt="pen" /> 
            </EditBtn></></p> 
            : null }
            </div> */}

          <DeleteBtn type="submit" onClick={() => {deleteNote(note._id)}}>Delete</DeleteBtn>
          </NotesWrapper>
         
        )
      })}

            {/* <div>
            <EditBtn>
            <Icon role="img" src="/icons/pen.png" alt="pen" /> 
            </EditBtn>
            </div> */}
      {/* <NotesWrapper>
        <h4>hello `${username}`</h4>
            <p>T {title}</p>
            <Event><p>A {activatingEvent}</p></Event>
            <Thought><p>B {beliefs}</p></Thought>
            <Emotions>Emotions</Emotions>
        </NotesWrapper> */}

        <Link to="/diary">Diary</Link>
      <Link to="/welcome">Profile</Link>
      <Link to="/">Home</Link>

    </MainWrapper>
  )
}


const TitleInput = styled.input`
width: 80vw;
border-top: none;
border-right:none;
border-left: none;
border-bottom: 1px dashed gray;
margin-bottom: 10px;
background: none;
`

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

const Icon = styled.img`
width: 50%;
`

const Event = styled.div`
height: 200px;
border: 1px solid gray;
`
const Thought = styled(Event)`
`

const EditBtn = styled.button`
width: 40px;
height: 25px;
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
`

const DeleteBtn = styled.button`

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

export default Note