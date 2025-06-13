import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Addsuplement from './pages/Addsuplement'
import Prehomepage from './pages/Prehomepage'
import Machine from './pages/Machine'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Prehomepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addsuplement' element={<Addsuplement/>}/>
        <Route path='/machine' element={<Machine/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
