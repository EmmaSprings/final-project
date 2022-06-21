import React, { useState } from 'react'
import styled from 'styled-components'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'


const CheckBoxes = ({ consequences, setConsequences }) => {

    const onPositiveEmotionsChange = (event) => {
        const { value, checked } = event.target
        const { positiveEmotions } = consequences
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
        const { value, checked } = event.target
        const { negativeEmotions } = consequences
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
        const { value, checked } = event.target
        const { physicalReactions } = consequences
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
        <div>
            <Emotions >
                {negativeEmotions.map(negEmo => {
                    return (
                        <div key={negEmo.id}>
                            <label htmlFor={negEmo.emotion}>  {negEmo.emotion}
                                <input
                                    type="checkbox"
                                    name="negativeEmotions"
                                    onChange={onNegativeEmotionsChange}
                                    value={negEmo.emotion}
                                />
                            </label>

                        </div>
                    )
                })}
            </Emotions>

            <Reaction >
                {positiveEmotions.map(posEmo => {
                    return (
                        <div key={posEmo.id}>
                            <label htmlFor={posEmo.emotion}> {posEmo.emotion}
                                <input
                                    name="positiveEmotions"
                                    type="checkbox"
                                    onChange={onPositiveEmotionsChange}
                                    value={posEmo.emotion}
                                />
                            </label>
                        </div>
                    )
                })}
            </Reaction>

            <Emotions >
                {physicalReactions.map(reaction => {
                    return (
                        <div key={reaction.id}>
                            <label htmlFor={reaction.reaction}>{reaction.reaction}
                                <input
                                    type="checkbox"
                                    name="physicalReactions"
                                    onChange={onPhysicalReactionsChange}
                                    value={reaction.reaction}
                                />
                            </label>
                        </div>
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

export default CheckBoxes