import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'

const Checkboxes = () => {
    const [toggleEmotions, setToggleEmotions] = useState(true)
    const [consequences, setConsequences] = useState({
        negativeEmotions: [],
        positiveEmotions: [],
        physicalReactions: []
    })

console.log(consequences)

// useEffect(()=> {
//     setConsequences({
//         negativeEmotions= checkedData.negativeEmotions,
//         positiveEmotions= checkedData.positiveEmotions,
//         physicalReactions= checkedData.physicalReactions,
//     })
// },[])

sessionStorage.setItem("CheckBoxesData", JSON.stringify(consequences))

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
           physicalReactions: physicalReactions.filter((e) => e !== value),
           })))
     }
   };

  return (
    <div >
<ToggleEmotions toggleEmotions={toggleEmotions} onChange={() => setToggleEmotions((s) => !s)}>Negative emotions
       <Emotions  >
                    {negativeEmotions.map(negEmo => {
                        return (
                        
                            <CheckboxWrap>
                                <NegLabel>  {negEmo.emotion}
                                <input
                                type="checkbox"
                                name="negativeEmotions"
                                onChange={onNegativeEmotionsChange} 
                                value={negEmo.emotion} 
                                key={negEmo.id}
                                />
                                  </NegLabel>
                                
                            </CheckboxWrap>
                        )
                    })}

                </Emotions>
                </ToggleEmotions>
                <div><p>Positive emotions</p></div>
                <Reaction >
                    {positiveEmotions.map(posEmo => {
                        return (
                            <CheckboxWrap>
                            <PosLabel>{posEmo.emotion}
                                <input
                                 name="positiveEmotions"
                                 type="checkbox"
                                 onChange={onPositiveEmotionsChange}
                                 value={posEmo.emotion} 
                                 key={posEmo.id}
                                 />
                                 </PosLabel>
                                 </CheckboxWrap>
                        )
                    })}
                </Reaction>

                <div><p>Physical reactions</p></div>
                <Emotions >
                    {physicalReactions.map(reaction => {
                        return (
                            <CheckboxWrap>
                                <PhysicalLabel>{reaction.reaction}
                                <input 
                                 type="checkbox"
                                 name="physicalReactions"
                                 onChange={onPhysicalReactionsChange}
                                 value={reaction.reaction} 
                                 key={reaction.id} 
                              />
                              </PhysicalLabel>
                            </CheckboxWrap>
                        )
                    })}
                </Emotions>
    </div>
  )
}

const Emotions = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr); 
flex-wrap: wrap;
align-content: center;
border: .3px solid black;
width: 80vw;
`

const CheckboxWrap = styled.div`
/* height: 40px; */
/* display: grid;
grid-template-columns: repeat(1, 1fr);
flex-wrap: wrap;
border: 1px solid green; */
`

const ToggleEmotions = styled.button`
${props => {
  if (props.toggleEmotions) {
    return `
    width: 100;
    font-family: 'Cormorant Garamond', serif;
    color: #9E4D4D;
    font-style: italic;
    font-size: 14px;
    
  `;
  } else {
    return `
  display: none;
`;
  }
}}
`;


const NegLabel = styled.label`
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Heebo', sans-serif;
font-size:14px;
padding: 2px;
/* text-transform: uppercase; */
/* border: 1px solid red; */
`

const PosLabel = styled(NegLabel)`

`

const PhysicalLabel = styled(NegLabel)`

`

const Reaction = styled(Emotions)`
`

export default Checkboxes