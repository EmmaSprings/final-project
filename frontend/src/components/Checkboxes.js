import React, { useState } from 'react'
import styled from 'styled-components'
import { negativeEmotions, positiveEmotions, physicalReactions } from '../data'


const Checkboxes = ({consequences, setConsequences, goodMood, badMood, reaction}) => {

    // console.log(selectedConsequences.map(item => item.positiveEmotions))
    console.log(badMood)
    const onPositiveEmotionsChange = (event) => {
        event.preventDefault()
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
        event.preventDefault()
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
        event.preventDefault()
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
                        <div>
                            <label>  {negEmo.emotion}
                                <input
                                    type="checkbox"
                                    name="negativeEmotions"
                                    onChange={onNegativeEmotionsChange}
                                    value={negEmo.emotion}
                                    key={negEmo.id}
                                    checked={badMood}
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
        </div>
    )
}

const Emotions = styled.div`
display: flex;
border: 1px solid black;
`

const Reaction = styled(Emotions)`
`

export default Checkboxes