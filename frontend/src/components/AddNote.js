import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'
import { API_URL } from '../urls/api'

const AddNote = () => {
    const navigate = useNavigate()
    const accessToken = sessionStorage.getItem("accessToken")
    const [newNote, setNewNote] = useState({
        title: "",
        activatingEvent: "",
        automatingThoughts: "",
    })

    const [consequences, setConsequences] = useState({
        negativeEmotions: [],
        positiveEmotions: [],
        physicalReactions: []
    })
    console.log(consequences)

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
            navigate("/");
        }
    }, [])

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
            consequences: consequences
          })

    };
        fetch(API_URL("notes"), options)
            .then(res => res.json())
            navigate("/diary")
 }

 const onPositiveEmotionsChange = (event) => {
     event.preventDefault()
     const {value, checked} = event.target
     const {positiveEmotions} = consequences
     if (checked) {
        setConsequences((prevState => ({
            ...prevState, 
            positiveEmotions: [...positiveEmotions, value]
            })))
     } 
      // Case 2  : The user unchecks the box
      //remove the id from the array
      else {
        setConsequences((prevState => ({
            ...prevState, 
            positiveEmotions: positiveEmotions.filter((e) => e !== value),
            })))
      }
    };

 const onNegativeEmotionsChange = (event) => {
     event.preventDefault()
     const {value, checked} = event.target
     const {negativeEmotions} = consequences
     if (checked) {
        setConsequences((prevState => ({
            ...prevState, 
            negativeEmotions: [...negativeEmotions, value]
            })))
     } 
    
      // Case 2  : The user unchecks the box
      //remove the id from the array
      else {
        setConsequences((prevState => ({
            ...prevState, 
            negativeEmotions: negativeEmotions.filter((e) => e !== value),
            })))
      }
    };
 const onPhysicalReactionsChange = (event) => {
     event.preventDefault()
     const {value, checked} = event.target
     const {physicalReactions} = consequences
     if (checked) {
        setConsequences((prevState => ({
            ...prevState, 
            physicalReactions: [...physicalReactions, value]
            })))
     }
      // Case 2  : The user unchecks the box
      //remove the id from the array
      else {
        setConsequences((prevState => ({
            ...prevState, 
            physicalReations: physicalReactions.filter((e) => e !== value),
            })))
      }
    };
//  const onEmotionsChange = (event) => {
//      event.preventDefault()
//      const {value, checked} = event.target
//      const {negativeEmotions, positiveEmotions, physicalReactions} = consequences
//      if (checked) {
//         setConsequences({
//           negativeEmotions: [...negativeEmotions, value],
//           positiveEmotions: [...positiveEmotions, value],
//           physicalReactions: [...physicalReactions, value]
//         })
//      }
    
//       // Case 2  : The user unchecks the box
//       //remove the id from the array
//       else {
//         setConsequences({
//           negativeEmotions: negativeEmotions.filter((e) => e !== value),
//           positiveEmotions: positiveEmotions.filter((e) => e !== value),
//           physicalReactions: physicalReactions.filter((e) => e !== value),
//         });
//       }
//     };



    return (
        <MainWrapper>
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

                <Emotions >
                    {negativeEmotions.map(negEmo => {
                        return (
                            <div>
                                <label>  {negEmo.emotion}
                                <input
                                type="checkbox"
                                name="negativeEmotions"
                                onChange={onNegativeEmotionsChange} 
                                value={negEmo.emotion} 
                                key={negEmo.id}
                                />
                                  </label>
                                
                            </div>
                        )
                    })}

                </Emotions>

                <Reaction >
                    {positiveEmotions.map(posEmo => {
                        return (
                            <div>
                            <label>{posEmo.emotion}
                                <input
                                 name="positiveEmotions"
                                 type="checkbox"
                                 onChange={onPositiveEmotionsChange}
                                 value={posEmo.emotion} 
                                 key={posEmo.id}
                                 />
                                 </label>
                                 </div>
                        )
                    })}
                </Reaction>

                <Emotions >
                    {physicalReactions.map(reaction => {
                        return (
                            <div>
                                <label>{reaction.reaction}
                                <input 
                                 type="checkbox"
                                 name="physicalReactions"
                                 onChange={onPhysicalReactionsChange}
                                 value={reaction.reaction} 
                                 key={reaction.id} 
                              />
                              </label>
                            </div>
                        )
                    })}
                </Emotions>

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