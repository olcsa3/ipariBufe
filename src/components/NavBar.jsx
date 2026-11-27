import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPizzaSlice,
  faPiggyBank,
  faUser,
  faRightToBracket,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import logo from '../img/logo.png'
import styles from './Navbar.module.css'

const LINKEK = [
  { to: '/kinalat', label: 'Kínálat', icon: faPizzaSlice },
  { to: '/ibp', label: 'IBP', icon: faPiggyBank },
  { to: '/regisztracio', label: 'Regisztráció', icon: faUser },
]

export default function NavBar() {
  const [nyitva, setNyitva] = useState(false)
  const bezar = () => setNyitva(false)

  const linkOsztaly = ({ isActive }) => `${styles.link} ${isActive ? styles.aktiv : ''}`

  return (
    <header className={styles.header}>
      <div className={styles.sav}>
        <Link to="/" className={styles.brand} onClick={bezar}>
          <img src={logo} alt="Veszprémi Szakképzési Centrum Ipari Technikum" className={styles.logo} />
          <span className={styles.szoveg}>
            <span className={styles.nev}>Ipari Büfé</span>
            <span className={styles.alcim}>Előrendelés</span>
          </span>
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={nyitva ? 'Menü bezárása' : 'Menü megnyitása'}
          aria-expanded={nyitva}
          onClick={() => setNyitva((n) => !n)}
        >
          <FontAwesomeIcon icon={nyitva ? faXmark : faBars} />
        </button>

        <nav className={`${styles.menu} ${nyitva ? styles.nyitva : ''}`}>
          {LINKEK.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkOsztaly} onClick={bezar}>
              {l.label} <FontAwesomeIcon icon={l.icon} className={styles.ikon} />
            </NavLink>
          ))}

          <NavLink to="/bejelentkezes" className={styles.belepes} onClick={bezar}>
            <FontAwesomeIcon icon={faRightToBracket} /> Bejelentkezés
          </NavLink>
        </nav>
      </div>
    </header>
  )
}