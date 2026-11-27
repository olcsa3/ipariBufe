import NavBar from './components/NavBar'
import Kinalat from './components/Kinalat'
import Regisztracio from './components/Regisztracio'
import Ibp from './components/Ibp'
import Fooldal from './components/Fooldal'
import Footer from './components/Footer'
import Bejelentkezes from './components/Bejelentkezes'
import SzunetValasztas from './components/SzunetValasztas'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <main className="flex-grow-1 d-flex flex-column">
          <Routes>
            <Route path="/" element={<Fooldal />} />
            <Route path="/kinalat" element={<Kinalat />} />
            <Route path="/szunet" element={<SzunetValasztas />} />
            <Route path="/ibp" element={<Ibp />} />
            <Route path="/regisztracio" element={<Regisztracio />} />
            <Route path="/bejelentkezes" element={<Bejelentkezes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App