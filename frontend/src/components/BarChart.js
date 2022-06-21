import React, {useEffect, useState} from 'react'
import {Bar, Chart} from 'react-chartjs-2'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { API_URL, GET_NOTE } from '../urls/api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { positiveEmotions } from '../data'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)

const BarChart = () => {
  const accessToken = sessionStorage.getItem("accessToken")
  const navigate = useNavigate()
  const [chart, setChart] = useState([])
  const [emotions, setEmotions] = useState([])

  useEffect(() => {
    if (!accessToken) {
        navigate("/");
    }
}, [])

const option = {
  method: "GET",
  headers: { Authorization: accessToken }
}

useEffect(() => {
fetchNotes()
}, [])



const fetchNotes = () => {

  fetch(API_URL("notes"), option)
      .then(res => res.json())
      .then(data => {setChart(data)
      setEmotions(chart?.data?.map(item => item.consequences))})
      console.log(emotions)
}

console.log(chart)


  const data = {
    labels: positiveEmotions.map(item => item.emotion),
    datasets: [{
        label: ["Emotions"],
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

const options =  {
  scales: {
      y: {
          beginAtZero: true
      }
  },
  legend: {
    labels: {
      fontSize: 26
    }
  }
}
  return (
  <Bar 
  data={data}
  options={options}
  />
  )
}

export default BarChart