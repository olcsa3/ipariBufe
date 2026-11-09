import { useState } from 'react'
import NavBar from './components/NavBar'
import Kinalat from './components/Kinalat'
import Regisztracio from './components/Regisztracio'
import Fooldal from './components/Fooldal'
import Footer from './components/Footer'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Fooldal />} />
          <Route path="/kinalat" element={<Kinalat />} />
          <Route path="/regisztracio" element={<Regisztracio />} />
        </Routes>
      <main className="container flex-grow-1 py-4">
      </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
