import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import AddNote from './components/AddNote';
import Diary from './components/Diary';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Note from './components/Note';
import About from './components/About';
import SignUpSuccess from './components/SignUpSuccess';
import Welcome from './components/Welcome';

function App() {
  return (
    <BrowserRouter>
    <Main>
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/addnote" element={<AddNote />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/diary" element={<Diary />}/>
      <Route path="/note/:noteId" element={<Note />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/success" element={<SignUpSuccess />}/>
      <Route path="/welcome" element={<Welcome />}/>

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
