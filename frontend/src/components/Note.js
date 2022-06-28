import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { GET_NOTE } from '../urls/api'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'


const Note = () => {
  const accessToken = sessionStorage.getItem("accessToken")
  const navigate = useNavigate()
  const [note, setNote] = useState({})
  const [editTitle, setEditTitle] = useState(null)
  const [editActivatingEvent, setEditActivatingEvent] = useState(null)
  const [editAutomatingThought, setEditAutomatingThought] = useState(null)
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
      .then(data => setNote(data))
  }


  useEffect(() => {
    fetchNote()
  }, [])


  console.log(note)
  console.log(editConsequences)

  const onPositiveEmotionsEdit = (event) => {
    const { value, checked } = event.target
    const { positiveEmotions } = editConsequences
    if (checked) {
      setEditConsequences((prev) => ({
        ...prev,
        positiveEmotions: [...positiveEmotions, value]
      }))
    }
    else {
      setEditConsequences((prev => ({
        ...prev,
        positiveEmotions: positiveEmotions.filter((e) => e !== value)
      })))
    }
  }

  const onNegativeEmotionsEdit = (event) => {
    const { value, checked } = event.target
    const { negativeEmotions } = editConsequences
    if (checked) {
      setEditConsequences((prev) => ({
        ...prev,
        negativeEmotions: [...negativeEmotions, value]
      }))
    }
    else {
      setEditConsequences((prev => ({
        ...prev,
        negativeEmotions: negativeEmotions.filter((e) => e !== value)
      })))
    }
  }

  const onPhysicalReactionsEdit = (event) => {
    const { value, checked } = event.target
    const { physicalReactions } = editConsequences
    if (checked) {
      setEditConsequences((prev) => ({
        ...prev,
        physicalReactions: [...physicalReactions, value]
      }))
    }
    else {
      setEditConsequences((prev => ({
        ...prev,
        physicalReactions: physicalReactions.filter((e) => e !== value)
      })))
    }
  }




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
      body.title = note.title
    }
    if (editActivatingEvent !== null) {
      body.activatingEvent = editActivatingEvent
    } else {
      body.activatingEvent = note.activatingEvent
    }
    if (editAutomatingThought !== null) {
      body.automatingThoughts = editAutomatingThought
    } else {
      body.automatingThoughts = note.automatingThought
    }

    if (editConsequences !== null) {
      body.consequences = editConsequences
    } else {
      body.consequences = note.consequences
    }


    options.body = JSON.stringify(body)



    fetch(GET_NOTE(noteId), options)
      .then(res => res.json())
      .then(() => fetchNote())

  }

  const deleteNote = () => {

    fetch(GET_NOTE(noteId), { method: "DELETE" })
      .then(res => res.json())
      .then(data => setNote(data))

    navigate("/diary")
  }

  return (
    <MainWrapper>
      <Wrapper>
        <TitleWrapper>
          <Title>{`${note.title}`}</Title>
        </TitleWrapper>
        <NotesWrapper>
          {!!editTitle ?
            <TitleWrapper>
              <TitleInput
                type="text"
                maxLength={25}
                name="title"
                value={editTitle.title}
                onChange={(event) => setEditTitle(event.target.value)}
              />
              <ButtonWrapper>
                <SubmitBtn type="submit" onClick={onEditNoteSubmit}>Submit</SubmitBtn>
                <CancelBtn type="button" onClick={() => setEditTitle(null)}>Cancel</CancelBtn>

              </ButtonWrapper>
            </TitleWrapper>
            :

            <TitleEditBtnWrap>
              <NoteTitle>{note.title}</NoteTitle>
              <EditBtnWrapper>
                <EditBtn type="button" onClick={() => setEditTitle(note)}>
                  <Icon role="img" src="/icons/pen.png" alt="pen" />
                </EditBtn>
              </EditBtnWrapper>
            </TitleEditBtnWrap>
          }

          {!!editActivatingEvent ?
            <div>
              <Textarea
                name="activatingEvent"
                value={editActivatingEvent.activatingEvent}
                onChange={(event) => setEditActivatingEvent(event.target.value)}
              >
              </Textarea>
              <ButtonWrapper>
                <SubmitBtn type="submit" onClick={onEditNoteSubmit}>Submit</SubmitBtn>
                <CancelBtn type="button" onClick={() => setEditActivatingEvent(null)}>Cancel</CancelBtn>
              </ButtonWrapper>
            </div>
            :
            <>
              <TitleEditBtnWrap>
                <NoteTitle>Activating event:</NoteTitle>
                <EditBtnWrapper>
                  <EditBtn type="button" onClick={() => setEditActivatingEvent(note)}>
                    <Icon role="img" src="/icons/pen.png" alt="pen" />
                  </EditBtn>
                </EditBtnWrapper>
              </TitleEditBtnWrap>
              <EventWrapper>
                <Notes>{note.activatingEvent}</Notes>
              </EventWrapper>
            </>

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
              <ButtonWrapper>
                <SubmitBtn type="submit" onClick={onEditNoteSubmit}>Submit</SubmitBtn>
                <CancelBtn type="button" onClick={() => setEditAutomatingThought(null)}>Cancel</CancelBtn>
              </ButtonWrapper>
            </>
            :

            <>
              <TitleEditBtnWrap>
                <NoteTitle>Beliefs:</NoteTitle>
                <EditBtnWrapper>
                  <EditBtn type="button" onClick={() => setEditAutomatingThought(note)}>
                    <Icon role="img" src="/icons/pen.png" alt="pen" />
                  </EditBtn>
                </EditBtnWrapper>
              </TitleEditBtnWrap>
              <EventWrapper>
                <Notes>{note.automatingThoughts}</Notes>
              </EventWrapper>
            </>

          }


          {!!editConsequences ?
            <>
              <EmotionsTitle>Consequences <EditBtn type="button" onClick={() => setEditConsequences(note.consequences)}>
                <Icon role="img" src="/icons/pen.png" alt="pen" />
              </EditBtn></EmotionsTitle>
              <EmotionInput>{negativeEmotions.map((item) => {
                return (
                  <div className="wrapper" key={item.id}>
                    <NegLabelEdit htmlFor={item.emotion}>
                      {item.emotion}
                      <input
                        type="checkbox"
                        name="negativeEmotions"
                        value={item.emotion}
                        defaultChecked={editConsequences.negativeEmotions.includes(item.emotion)}
                        onChange={onNegativeEmotionsEdit}
                      />
                    </NegLabelEdit>
                  </div>
                );
              })}
              </EmotionInput>

              <EmotionInput>
                {positiveEmotions.map((item) => {
                  return (
                    <div className="wrapper" key={item.id}>
                      <PosLabelEdit htmlFor={item.emotion}>
                        {item.emotion}
                        <input
                          type="checkbox"
                          name="positiveEmotions"
                          value={item.emotion}
                          defaultChecked={editConsequences.positiveEmotions.includes(item.emotion)}
                          onChange={onPositiveEmotionsEdit}
                        />
                      </PosLabelEdit>
                    </div>
                  );
                })}   </EmotionInput>

              <EmotionInput>
                {physicalReactions.map((item) => {
                  return (
                    <div className="wrapper" key={item.id}>
                      <PhysicalLabelEdit htmlFor={item.emotion}>
                        {item.reaction}
                        <input
                          type="checkbox"
                          name="physicalReactions"
                          value={item.reaction}
                          defaultChecked={editConsequences.physicalReactions.includes(item.reaction)}
                          onChange={onPhysicalReactionsEdit}
                        />
                      </PhysicalLabelEdit>
                    </div>
                  );
                })}</EmotionInput>
              <ButtonWrapper>
                <CancelBtn type="button" onClick={() => setEditConsequences(null)}>Cancel edit</CancelBtn>
                <SubmitBtn type="submit" onClick={onEditNoteSubmit}>Submit</SubmitBtn>
              </ButtonWrapper>
            </>

            :

            <>
              <EmotionsTitle>Consequences    <EditBtn type="button" onClick={() => setEditConsequences(note.consequences)}>
                <Icon role="img" src="/icons/pen.png" alt="pen" />
              </EditBtn>

              </EmotionsTitle>
              <EmotionInput>{negativeEmotions.map((item) => {
                return (
                  <div className="wrapper" key={item.id}>
                    <NegLabel htmlFor="negativeEmotions">
                      {item.emotion}
                      <input
                        type="checkbox"
                        name="negativeEmotions"
                        value={item.emotion}
                        checked={note?.consequences?.negativeEmotions.includes(item.emotion)}
                      />
                    </NegLabel>
                  </div>
                );
              })}
              </EmotionInput>
              <EmotionInput>
                {positiveEmotions.map((item) => {
                  return (
                    <div className="wrapper" key={item.id}>
                      <PosLabel htmlFor="positiveEmotions">
                        {item.emotion}
                        <input
                          type="checkbox"
                          name="positiveEmotions"
                          value={item.emotion}
                          checked={note?.consequences?.positiveEmotions.includes(item.emotion)}
                        />
                      </PosLabel>
                    </div>
                  );
                })}   </EmotionInput>
              <EmotionInput>
                {physicalReactions.map((item) => {
                  return (
                    <div className="wrapper" key={item.id}>
                      <PhysicalLabel htmlFor="physicalReactions">
                        {item.reaction}
                        <input
                          type="checkbox"
                          name="physicalReactions"
                          value={item.reaction}
                          checked={note?.consequences?.physicalReactions.includes(item.reaction)}
                        />
                      </PhysicalLabel>
                    </div>
                  );
                })}</EmotionInput>
            </>
          }

          <DeleteBtn type="submit" onClick={() => { deleteNote(note._id) }}>Delete Note</DeleteBtn>
        </NotesWrapper>

        <LinkWrapper>

          <LinkTo to="/diary">Diary</LinkTo>
          <LinkTo to="/welcome">Profile</LinkTo>
          <LinkTo to="/">Home</LinkTo>

        </LinkWrapper>

      </Wrapper>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
display: flex;
justify-content: center;
background-size:100vh;
background-position: center;
background-repeat: no-repeat;
min-height: 100vh;

`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Cormorant Garamond', serif;
color: #154B5B;
font-size: 20px;
font-weight: 400;
margin: 10px 0 10px 0;
`



const Title = styled.h1`
font-family: 'Cormorant Garamond', serif;
text-transform: uppercase;
font-style: italic;
color: #154B5B;
font-size: 30px;
font-weight: 400;
margin: 10px 0 10px 0;
width: 80vw;
min-height: 5vh;
text-align: center;


@media (min-width: 768px) {
 font-size: 35px;
}
`

const NoteTitle = styled.p`
filter: opacity(40%);
margin:10px 0 0 0;
font-size: 14px;
color: forestgreen;


@media (min-width: 768px) {
 font-size: 20px;
}
`

const EmotionsTitle = styled(NoteTitle)`
margin-bottom: 20px;
`

const Notes = styled.p`
margin: 0;
font-size: 16px;
margin-top: 8px;
margin-bottom: 12px;

@media (min-width: 768px) {
 font-size: 20px;
}
`

const EmotionInput = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr); 
flex-wrap: wrap;
align-content: center;
border-top: .3px solid black;
width: 80vw;
min-height: 28vh;
background-color: #fffffa;

`
const NotesWrapper = styled.div`
display: flex;
flex-direction: column;
width: 80vw;
min-height: calc(160vh - 70px);
background-color: #fffffa;
`

const TitleWrapper = styled.div`
font-family: 'Cormorant Garamond', serif;
`

const TitleInput = styled.input`
width: 80vw;
border-top: none;
border-right:none;
border-left: none;
border-bottom: 1px dashed gray;
margin-bottom: 10px;
/* text-transform: uppercase; */
background: #fffffa;
font-family: 'Cormorant Garamond', serif;
font-size: 20px;
 
`

const LinkWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
position: sticky;
z-index: 1;
bottom: 20px;
padding: 10px;
width: 100vw;
background: #fffffa;

`

const LinkTo = styled(Link)`
text-decoration: none;
font-style:normal;

&:visited{
  color: #000;
}

&:hover{
  font-style: italic;
}

`

const Icon = styled.img`
width: 35%;
`

const TitleEditBtnWrap = styled.div`
display: flex;
justify-content: space-between;

`

const EventWrapper = styled.div`
display: block;

`

const EditBtnWrapper = styled.div`
height: 20px;
margin-top: 0;

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
filter: opacity(40%);
`

const DeleteBtn = styled.button`
display: flex;
background-size: 100%;
font-family: 'Cormorant Garamond', serif;
background-repeat: no-repeat;
font-size:18px;
filter: opacity(50%);
cursor: pointer;
align-self: center;
margin-top: 140px;
margin-bottom: 100px;
height: 20px;
border: none;
padding:0;
color: tomato;
background-color: rgba(255, 255, 250, 0.20);

&:hover {
  font-style: italic;
}

@media (min-width: 768px) {
    font-size: 22px;
    margin-top: 180px;
}
`

const SubmitBtn = styled.button`
display: flex;
background-size: 100%;
background-repeat: no-repeat;
filter: opacity(50%);
cursor: pointer;
align-self: center;
border: none;
padding:0;
background-color: rgba(255, 255, 250, 0.20);
color: #155B22;
margin-bottom: 8px;

&:hover {
  font-style: italic;
}
`

const CancelBtn = styled(SubmitBtn)`

color: tomato;
`

const ButtonWrapper = styled.div`

display: flex;
justify-content: space-evenly
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
margin-bottom: 8px;

&:focus {
  outline: none;
}
`

const NegLabel = styled.label`
display: flex;
flex-direction: row;
align-items: center;
margin: 5px;
font-family: 'Cormorant Garamond', serif;
font-size:14px;
padding: 2px;

@media (min-width: 768px) {
    font-size: 20px;
}
`

const PosLabel = styled(NegLabel)`
`

const PhysicalLabel = styled(NegLabel)`
`

const NegLabelEdit = styled(NegLabel)`
color: blue;

@media (min-width: 768px) {
    font-size: 20px;
}
`

const PosLabelEdit = styled(NegLabelEdit)`

`

const PhysicalLabelEdit = styled(NegLabelEdit)`

`



export default Note