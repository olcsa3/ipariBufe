import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './Kinalat.module.css'

import sajtosZsemle from '../img/sajtos_zsemle.png'
import pizzacsiga from '../img/pizzacsiga.png'
import pizzaszeletKukoricas from '../img/pizzaszelet_kukoricas.png'
import pizzaszeletSajtos from '../img/pizzaszelet_sajtos.png'
import sonkasBagett from '../img/sonkas_sajtos_bagett.png'
import szalamisBagett from '../img/szalamis_bagett.png'
import csokisTart from '../img/csokis_tart.png'
import brownie from '../img/brownie.png'
import makosCsiga from '../img/makos_csiga.png'

const MAX_DB = 10
const AR = 750

// Az id-k egyezzenek az adatbázis products táblájának id-ival (lásd lent az SQL-t)
const TERMEKEK = [
  { id: 1, name: 'Sajtos zsemle', img: sajtosZsemle },
  { id: 2, name: 'Pizzacsiga', img: pizzacsiga },
  { id: 3, name: 'Pizzaszelet (kukoricás)', img: pizzaszeletKukoricas },
  { id: 4, name: 'Pizzaszelet (sajtos)', img: pizzaszeletSajtos },
  { id: 5, name: 'Sonkás sajtos bagett', img: sonkasBagett },
  { id: 6, name: 'Szalámis bagett', img: szalamisBagett },
  { id: 7, name: 'Csokis tart', img: csokisTart },
  { id: 8, name: 'Brownie', img: brownie },
  { id: 9, name: 'Mákos csiga', img: makosCsiga },
].map((t) => ({ ...t, price: AR }))

const betoltMennyisegek = () => {
  try {
    return JSON.parse(localStorage.getItem('kosarMennyisegek')) || {}
  } catch {
    return {}
  }
}

export default function Kinalat() {
  const navigate = useNavigate()
  const [mennyisegek, setMennyisegek] = useState(betoltMennyisegek)

  // A kosár megmarad, ha a felhasználó visszalép a szünetválasztóról
  useEffect(() => {
    localStorage.setItem('kosarMennyisegek', JSON.stringify(mennyisegek))
  }, [mennyisegek])

  const valtoztat = (id, valtozas) => {
    setMennyisegek((elozo) => {
      const uj = Math.min(MAX_DB, Math.max(0, (elozo[id] || 0) + valtozas))
      return { ...elozo, [id]: uj }
    })
  }

  const kosar = useMemo(
    () =>
      TERMEKEK.filter((t) => (mennyisegek[t.id] || 0) > 0).map((t) => ({
        product_id: t.id,
        name: t.name,
        quantity: mennyisegek[t.id],
        price: t.price,
      })),
    [mennyisegek]
  )

  const darab = kosar.reduce((s, t) => s + t.quantity, 0)
  const osszeg = kosar.reduce((s, t) => s + t.quantity * t.price, 0)

  const rendelesLeadas = () => {
    if (osszeg <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Üres a kosarad',
        text: 'Válassz ki legalább egy terméket!',
        confirmButtonColor: '#e8590c',
      })
      return
    }
    localStorage.setItem('kosar', JSON.stringify(kosar))
    localStorage.setItem('kosarOsszeg', String(osszeg))
    navigate('/szunet', { state: { kosar, osszeg } })
  }

  return (
    <div className={styles.oldal}>
      <div className={styles.overlay} />
      <Container className={styles.tartalom}>
        <div className={`text-center ${styles.fej}`}>
          <h1>Mai kínálatunk</h1>
          <p>Válaszd ki, mit kérnél, a szünetet a következő lépésben adhatod meg.</p>
        </div>

        <Row className="g-4 justify-content-center">
          {TERMEKEK.map((t) => {
            const db = mennyisegek[t.id] || 0
            return (
              <Col key={t.id} xs={12} lg={6}>
                <div className={`${styles.kartya} ${db > 0 ? styles.kivalasztva : ''}`}>
                  <div className={styles.kep}>
                    <img src={t.img} alt={t.name} />
                  </div>
                  <div className={styles.adatok}>
                    <h3>{t.name}</h3>
                    <div className={styles.ar}>{t.price} Ft</div>
                    <div className={styles.gombok}>
                      <button
                        type="button"
                        aria-label="Kevesebb"
                        disabled={db === 0}
                        onClick={() => valtoztat(t.id, -1)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className={styles.db}>{db}</span>
                      <button
                        type="button"
                        aria-label="Több"
                        disabled={db === MAX_DB}
                        onClick={() => valtoztat(t.id, 1)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </Container>

      <div className={styles.kosarSav}>
        <Container className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className={styles.kosarInfo}>
            <FontAwesomeIcon icon={faCartShopping} /> {darab} db &middot;{' '}
            <strong>{osszeg.toLocaleString('hu-HU')} Ft</strong>
          </div>
          <button type="button" className={styles.kosarGomb} onClick={rendelesLeadas}>
            Leadom a rendelést
          </button>
        </Container>
      </div>
    </div>
  )
}