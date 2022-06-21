import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatDistance } from 'date-fns'

import BarChart from './BarChart'


import { API_URL, GET_NOTE } from '../urls/api'
import { Bar } from 'react-chartjs-2'

const Summary = () => {
    const accessToken = sessionStorage.getItem("accessToken")
    const [notes, setNotes] = useState([])
    // const [chartData, setChartData] = useState({
    //     labels: notes.data?.map(item => item.date),
    //     datasets: [{
    //         label: "Emotions",
    //         data: notes.data?.map(item => item.consequences.positiveEmotions)
    //     }]
    // })
    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            navigate("/");
        }
    }, [])

    // const options = {
    //     method: "GET",
    //     headers: { Authorization: accessToken }
    // }

    // useEffect(() => {
    //     fetchNotes()
    // }, [])

    // const fetchNotes = () => {

    //     fetch(API_URL("notes"), options)
    //         .then(res => res.json())
    //         .then(data => setNotes(data))
    // }
    // console.log(notes)
    // console.log(chartData)


    // const allNotes = notes.data?.map(item => {
    //     return (
    //         <div key={item._id}>
    //             <p>
    //                 {item.title}
    //             </p>
    //         </div>
    //     )
    // })

    return (
        <div>

    <BarChart/>
        </div>
    )
}

export default Summary