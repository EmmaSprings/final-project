import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatDistance } from 'date-fns'

import { API_URL, GET_NOTE } from '../urls/api'

const Summary = () => {
    const accessToken = sessionStorage.getItem("accessToken")
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()

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
        fetchNotes()
    }, [])

    const fetchNotes = () => {

        fetch(API_URL("notes"), options)
            .then(res => res.json())
            .then(data => setNotes(data))
    }
    console.log(notes)

    return (
        <div></div>
    )
}

export default Summary