import { React,useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from "./pages/HomePage"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import JobOpenings from './pages/JobOpenings'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/JobOpenings" element={<JobOpenings/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
