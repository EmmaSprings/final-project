import React, { useState } from 'react'
import styled from 'styled-components'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'


const CheckBoxes = ({ consequences, setConsequences }) => {
    const [isOpenNeg, setIsOpenNeg] = useState(false)
    const [isOpenPos, setIsOpenPos] = useState(false)
    const [isOpenReactions, setIsOpenReactions] = useState(false)
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
      
            <button type="button" onClick={() => setIsOpenNeg((s) => !s)}>Negative Emotions</button>
            <NegEmotions isOpenNeg={isOpenNeg}>
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
            </NegEmotions>

            <button type="button" onClick={() => setIsOpenPos((s) => !s)}>Positive Emotions</button>
            <PosEmotions isOpenPos={isOpenPos}>
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
            </PosEmotions>

            <button type="button" onClick={() => setIsOpenReactions((s) => !s)}>Physical Reactions</button>
            <Reactions isOpenReactions={isOpenReactions}>
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
            </Reactions>
        </div>
    )
}

// const Emotions = styled.div`
//     display: grid;
// grid-template-columns: repeat(3, 1fr); 
// flex-wrap: wrap;
// align-content: center;
// border: .3px solid black;
// width: 80vw;
// `



const NegEmotions = styled.div`
${props => {
        if (props.isOpenNeg) {
            return `
            display: grid;
grid-template-columns: repeat(3, 1fr); 
flex-wrap: wrap;
align-content: center;
border: .3px solid black;
width: 80vw;
    
  `;
        } else {
            return `
  display: none;
`;
        }
    }}
`

const PosEmotions = styled.div`
${props => {
        if (props.isOpenPos) {
            return `
display: grid;
grid-template-columns: repeat(3, 1fr); 
flex-wrap: wrap;
align-content: center;
border: .3px solid black;
width: 80vw;
    
  `;
        } else {
            return `
            display: none;
            `;
        }
    }}
    `
    
    const Reactions = styled.div`
    ${props => {
        if (props.isOpenReactions) {
            return `
            display: grid;
grid-template-columns: repeat(3, 1fr); 
flex-wrap: wrap;
align-content: center;
border: .3px solid black;
width: 80vw;
    
  `;
        } else {
            return `
            display: none;
            `;
        }
    }}
    `
const CheckboxWrap = styled.div`
/* height: 40px; */
/* display: grid;
grid-template-columns: repeat(1, 1fr);
flex-wrap: wrap;
border: 1px solid green; */
`



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


export default CheckBoxes