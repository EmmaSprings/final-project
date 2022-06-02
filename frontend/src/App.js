import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import AddNote from './components/AddNote';
import Diary from './components/Diary';
import SignUp from './components/SignUp';
import StartPage from './components/StartPage';

function App() {
  return (
    <BrowserRouter>
    <Main>
    <Routes>
      <Route path="/" element={<StartPage />}/>
      <Route path="/addnote" element={<AddNote />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/diary" element={<Diary />}/>
    </Routes>
    </Main>
    </BrowserRouter>
   
  );
}

const Main = styled.div`
background-color: #FFFEF6;
min-width: 100vw;
min-height: 100vh;
`

export default App;
