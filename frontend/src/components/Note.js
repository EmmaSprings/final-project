import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { GET_NOTE } from '../urls/api'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'
// import pen from './icons/pen.png'

const Note = () => {
  const accessToken = sessionStorage.getItem("accessToken")
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [editTitle, setEditTitle] = useState(null)
  const [editActivatingEvent, setEditActivatingEvent] = useState(null)
  const [editAutomatingThought, setEditAutomatingThought] = useState(null)
  const [emotionArr, setEmotionArr] = useState(null)
  const [editConsequences, setEditConsequences] = useState(null)

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


  const fetchNote = () => {
    fetch(GET_NOTE(noteId), options)
    .then(res => res.json())
    .then(data => {
      setNotes(data)
      setEmotionArr(data.map(note => note.consequences))
    })
  }
  useEffect(() => {
    fetchNote()
  }, [])
  console.log(emotionArr)
  console.log(notes)
  // console.log(editConsequences)
  // console.log(editConsequences[0])


  const onPositiveEmotionsEdit = (event) => {
    event.preventDefault()
    const { value, checked } = event.target
    const { positiveEmotions } = editConsequences[0]
    if (checked) {
      setEditConsequences((prev) => ({
        ...prev,
        positiveEmotions: positiveEmotions.push(value)
      }))
    }
    // Case 2  : The user unchecks the box
    // remove the id from the array
    else {
      setEditConsequences((prev => ({
        ...prev,
        positiveEmotions: positiveEmotions.filter((e) => e !== value)
      })))
    }
  };


  const onEditNoteSubmit = (event) => {

    event.preventDefault()
    setEditTitle(null)
    setEditAutomatingThought(null)
    setEditActivatingEvent(null)
    setEditConsequences(null)
    const options = {
      method: "PATCH",
      headers: {
        "Authorization": accessToken,
        'Content-Type': 'application/json'
      },
    }

    const body = {
      title: editTitle,
      activatingEvent: editActivatingEvent,
      automatingThoughts: editAutomatingThought,
      consequences: editConsequences
    }
    if (editTitle !== null) {
      body.title = editTitle
    } else {
      body.title = notes[0].title
    }
    if (editActivatingEvent !== null) {
      body.activatingEvent = editActivatingEvent
    } else {
      body.activatingEvent = notes[0].activatingEvent
    }
    if (editAutomatingThought !== null) {
      body.automatingThoughts = editAutomatingThought
    } else {
      body.automatingThoughts = notes[0].automatingThought
    }

    if (editConsequences !== null) {
      body.consequences = editConsequences
    } else {
      body.consequences = notes[0].consequences
    }


    options.body = JSON.stringify(body)



    fetch(GET_NOTE(noteId), options)
      .then(res => res.json())
      .then(() => fetchNote())

  }

  const deleteNote = () => {

    fetch(GET_NOTE(noteId), { method: "DELETE" })
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

          <NotesWrapper key={note._id}>
            {!!editTitle ?
              <div>
                <TitleInput
                  type="text"
                  maxLength={25}
                  name="title"
                  value={editTitle.title}
                  onChange={(event) => setEditTitle(event.target.value)}
                />
                <button type="submit" onClick={onEditNoteSubmit}>Submit</button>
                <button type="button" onClick={() => setEditTitle(null)}>Cancel</button>
              </div>
              :

              <div>
                <p>{note.title}
                  <EditBtn type="button" onClick={() => setEditTitle(note)}>
                    <Icon role="img" src="/icons/pen.png" alt="pen" />
                  </EditBtn></p>
              </div>}

            {!!editActivatingEvent ?
              <div>
                <Textarea
                  name="activatingEvent"
                  value={editActivatingEvent.activatingEvent}
                  onChange={(event) => setEditActivatingEvent(event.target.value)}
                >
                </Textarea>
                <button type="submit" onClick={onEditNoteSubmit}>Submit</button>
                <button type="button" onClick={() => setEditActivatingEvent(null)}>Cancel</button>
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
              <>
                <Textarea
                  placeholder="Beliefs"
                  name="automatingThoughts"
                  value={editAutomatingThought.automatingThoughts}
                  onChange={(event) => setEditAutomatingThought(event.target.value)}
                >
                </Textarea>
                <button type="submit" onClick={onEditNoteSubmit}>Submit</button>
                <button type="button" onClick={() => setEditAutomatingThought(null)}>Cancel</button>
              </>
              :
              <div>
                <p>Automating thoughts: {note.automatingThoughts}
                  <EditBtn type="button" onClick={() => setEditAutomatingThought(note)}>
                    <Icon role="img" src="/icons/pen.png" alt="pen" />
                  </EditBtn></p>
              </div>}


            {!!editConsequences ?
              <>
                <h3>Emotions and reactions     <EditBtn type="button" onClick={() => setEditConsequences(emotionArr)}>
                  <Icon role="img" src="/icons/pen.png" alt="pen" />
                </EditBtn></h3>
                <EmotionInput>{negativeEmotions.map((item) => {
                  return (
                    <div className="wrapper" key={item.id}>
                      <label htmlFor={item.emotion}>          </label>
                      {item.emotion}
                      <input
                        type="checkbox"
                        name="negativeEmotions"
                        value={item.emotion}
                        defaultChecked={editConsequences[0].negativeEmotions.includes(item.emotion)}
                      // onChange={onNegativeEmotionsEdit}
                      />
                    </div>
                  );
                })}
                </EmotionInput>

                <EmotionInput>
                  {positiveEmotions.map((item) => {
                    return (
                      <div className="wrapper" key={item.id}>
                        <label htmlFor={item.emotion}>        </label>
                        {item.emotion}
                        <input
                          type="checkbox"
                          name="positiveEmotions"
                          value={item.emotion}
                          defaultChecked={editConsequences[0].positiveEmotions.includes(item.emotion)}
                          onChange={onPositiveEmotionsEdit}
                        />

                      </div>
                    );
                  })}   </EmotionInput>

                <EmotionInput>
                  {physicalReactions.map((item) => {
                    return (
                      <div className="wrapper" key={item.id}>
                        <label htmlFor={item.emotion}>    </label>
                        {item.reaction}
                        <input
                          type="checkbox"
                          name="physicalReactions"
                          value={item.reaction}
                          defaultChecked={editConsequences[0].physicalReactions.includes(item.reaction)}
                        // onChange={onPhysicalReactionsEdit}
                        />

                      </div>
                    );
                  })}</EmotionInput>
                <button type="button" onClick={() => setEditConsequences(null)}>Cancel edit</button>
                <button type="submit" onClick={onEditNoteSubmit}>Submit</button>
              </>

              :

              <>
                <h3>Emotions and reactions     <EditBtn type="button" onClick={() => setEditConsequences(emotionArr)}>
                  <Icon role="img" src="/icons/pen.png" alt="pen" />
                </EditBtn></h3>
                <EmotionInput>{negativeEmotions.map((item) => {
                  return (
                    <div className="wrapper" key={item.id}>
                      <label htmlFor="negativeEmotions">
                        {item.emotion}
                        <input
                          type="checkbox"
                          name="negativeEmotions"
                          value={item.emotion}
                          checked={emotionArr[0].negativeEmotions.includes(item.emotion)}
                        />
                      </label>
                    </div>
                  );
                })}
                </EmotionInput>
                <EmotionInput>
                  {positiveEmotions.map((item) => {
                    return (
                      <div className="wrapper" key={item.id}>
                        <label htmlFor="positiveEmotions">
                          {item.emotion}
                          <input
                            type="checkbox"
                            name="positiveEmotions"
                            value={item.emotion}
                            checked={emotionArr[0].positiveEmotions.includes(item.emotion)}
                          />
                        </label>
                      </div>
                    );
                  })}   </EmotionInput>
                <EmotionInput>
                  {physicalReactions.map((item) => {
                    return (
                      <div className="wrapper" key={item.id}>
                        <label htmlFor="physicalReactions">
                          {item.reaction}
                          <input
                            type="checkbox"
                            name="physicalReactions"
                            value={item.reaction}
                            checked={emotionArr[0].physicalReactions.includes(item.reaction)}
                          />
                        </label>
                      </div>
                    );
                  })}</EmotionInput>
              </>
            }

            <DeleteBtn type="submit" onClick={() => { deleteNote(note._id) }}>Delete</DeleteBtn>
          </NotesWrapper>

        )
      })}

      <Link to="/diary">Diary</Link>
      <Link to="/welcome">Profile</Link>
      <Link to="/">Home</Link>

    </MainWrapper>
  )
}


const EmotionInput = styled.div`
display: flex;
border: 1px solid black;
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