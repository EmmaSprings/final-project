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
        <EmotionsWrapper>
      <AllEmotions>
            <NegSelectionsBtn type="button" onClick={() => setIsOpenNeg((s) => !s)}>Add Negative Emotions</NegSelectionsBtn>
            <NegEmotions isOpenNeg={isOpenNeg}>
                {negativeEmotions.map(negEmo => {
                    return (
                        <StyleBoxes key={negEmo.id}>
                            <NegLabel htmlFor={negEmo.emotion}>  {negEmo.emotion}
                                <input
                                    type="checkbox"
                                    name="negativeEmotions"
                                    onChange={onNegativeEmotionsChange}
                                    value={negEmo.emotion}
                                />
                            </NegLabel>

                        </StyleBoxes>
                    )
                })}
            </NegEmotions>
            </AllEmotions>

            <AllEmotions>
            <PosSelectionBtn type="button" onClick={() => setIsOpenPos((s) => !s)}>Add Positive Emotions</PosSelectionBtn>
            <PosEmotions isOpenPos={isOpenPos}>
                {positiveEmotions.map(posEmo => {
                    return (
                        <StyleBoxes key={posEmo.id}>
                            <PosLabel htmlFor={posEmo.emotion}> {posEmo.emotion}
                                <input
                                    name="positiveEmotions"
                                    type="checkbox"
                                    onChange={onPositiveEmotionsChange}
                                    value={posEmo.emotion}
                                />
                            </PosLabel>
                        </StyleBoxes>
                    )
                })}
            </PosEmotions>
           </AllEmotions>

           <AllEmotions>
            <ReactionSelectionBtn type="button" onClick={() => setIsOpenReactions((s) => !s)}>Add Physical Reactions</ReactionSelectionBtn>
            <Reactions isOpenReactions={isOpenReactions}>
                {physicalReactions.map(reaction => {
                    return (
                        <StyleBoxes key={reaction.id}>
                            <PhysicalLabel htmlFor={reaction.reaction}>{reaction.reaction}
                                <input
                                    type="checkbox"
                                    name="physicalReactions"
                                    onChange={onPhysicalReactionsChange}
                                    value={reaction.reaction}
                                />
                            </PhysicalLabel>
                        </StyleBoxes>
                    )
                })}
            </Reactions>
            </AllEmotions>
        </EmotionsWrapper>
    )
}


const EmotionsWrapper = styled.div`
display: flex;
flex-direction: column;
/* align-content: center; */

`

const AllEmotions = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
`

const StyleBoxes = styled.div`
margin:5px;

`

const NegEmotions = styled.div`
${props => {
        if (props.isOpenNeg) {
            return `
            display: grid;
grid-template-columns: repeat(3, 1fr); 
flex-wrap: wrap;
align-content: center;
border: none;
width: 80vw;
min-height: 28vh;
background-color: #fffffa;

@media (min-width: 768px) {
    width: 70vw;
}

@media (min-width: 992px) {
    width: 40vw;
}
    
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
border: none;
width: 80vw;
min-height: 28vh;
background-color: #fffffa;

@media (min-width: 768px) {
    width: 70vw;
}

@media (min-width: 992px) {
    width: 40vw;
}
    
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
border: none;
width: 80vw;
min-height: 28vh;
background-color: #fffffa;

@media (min-width: 768px) {
    width: 70vw;
}

@media (min-width: 992px) {
    width: 40vw;
}
  `;
        } else {
            return `
            display: none;
            `;
        }
    }}
    `

    const NegSelectionsBtn = styled.button`
    background: none;
    border:none;
    color:#154B5B;
    `

    const PosSelectionBtn = styled(NegSelectionsBtn)`
    `
    const ReactionSelectionBtn = styled(NegSelectionsBtn)`
    `

const NegLabel = styled.label`
display: flex;
flex-direction: row;
align-items: center;
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


export default CheckBoxes