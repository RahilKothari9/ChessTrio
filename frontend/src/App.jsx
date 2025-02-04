import { useState } from 'react'
import { Routes, Route } from "react-router";
import Landing from './screens/Landing';
import Game from './screens/Game'
import './App.css'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  )
}

export default App
