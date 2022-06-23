import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import styled from 'styled-components'

import AddNote from './components/AddNote';
import Diary from './components/Diary';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Note from './components/Note';
import About from './components/About';
import SignUpSuccess from './components/SignUpSuccess';
import Welcome from './components/Welcome';
import Start from './components/Start';
import Demo from './components/Demo';

const App = () => {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/note/:noteId" element={<Note />} />
          <Route path="/about" element={<About />} />
          <Route path="/success" element={<SignUpSuccess />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.div`

`

export default App;
