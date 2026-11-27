import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faBell, faLock, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './SzunetValasztas.module.css'

// Tartalék lista, ha nem jön adat a backendről (a `breaks` tábla mezőivel azonos)
const ALAP_SZUNETEK = [
  { id: 1, name: '1. szünet', start_time: '08:45:00', end_time: '08:55:00' },
  { id: 2, name: '2. szünet', start_time: '09:40:00', end_time: '09:50:00' },
  { id: 3, name: '3. szünet', start_time: '10:35:00', end_time: '10:50:00' },
  { id: 4, name: '4. szünet', start_time: '11:35:00', end_time: '11:50:00' },
  { id: 5, name: '5. szünet', start_time: '12:35:00', end_time: '12:50:00' },
  { id: 6, name: '6. szünet', start_time: '13:35:00', end_time: '13:45:00' },
]

// Hány perccel a szünet kezdete előtt zárul a rendelés (0 = a kezdésig lehet)
const ZARAS_PERC = 0

const percbe = (ido) => {
  const [h, m] = ido.split(':').map(Number)
  return h * 60 + m
}

const rovidIdo = (ido) => ido.slice(0, 5)

const mentettKosar = () => {
  try {
    return JSON.parse(localStorage.getItem('kosar')) || []
  } catch {
    return []
  }
}

export default function SzunetValasztas() {
  const navigate = useNavigate()
  const location = useLocation()

  const kosar = location.state?.kosar ?? mentettKosar()
  const osszeg = location.state?.osszeg ?? Number(localStorage.getItem('kosarOsszeg') || 0)

  const [szunetek, setSzunetek] = useState(ALAP_SZUNETEK)
  const [most, setMost] = useState(new Date())
  const [valasztott, setValasztott] = useState(null)
  const [kuldes, setKuldes] = useState(false)

  // Üres kosárral nincs mit rendelni, vissza a kínálathoz
  useEffect(() => {
    if (kosar.length === 0) navigate('/kinalat', { replace: true })
  }, [kosar.length, navigate])

  // Szünetek betöltése a backendről
  useEffect(() => {
    fetch('/api/breaks')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((adat) => Array.isArray(adat) && adat.length && setSzunetek(adat))
      .catch(() => {})
  }, [])

  // Óra frissítése 20 másodpercenként, hogy a lejárt szünetek maguktól letiltódjanak
  useEffect(() => {
    const t = setInterval(() => setMost(new Date()), 20000)
    return () => clearInterval(t)
  }, [])

  const maiNap = useMemo(
    () =>
      most.toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      }),
    [most]
  )

  const mostPerc = most.getHours() * 60 + most.getMinutes()

  const lista = szunetek.map((sz) => ({
    ...sz,
    mult: mostPerc >= percbe(sz.start_time) - ZARAS_PERC,
  }))

  const elsoElerheto = lista.find((sz) => !sz.mult)

  // Ha a kiválasztott szünet közben lejárt, töröljük a választást
  useEffect(() => {
    if (valasztott && lista.find((s) => s.id === valasztott)?.mult) {
      setValasztott(null)
    }
  }, [mostPerc]) // eslint-disable-line react-hooks/exhaustive-deps

  const leadas = async () => {
    const sz = lista.find((s) => s.id === valasztott)
    if (!sz || sz.mult) return

    setKuldes(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          break_id: sz.id,
          items: kosar.map((t) => ({ product_id: t.product_id, quantity: t.quantity })),
          total_price: osszeg,
          date: most.toISOString().slice(0, 10),
        }),
      })
      if (!res.ok) throw new Error()

      localStorage.removeItem('kosar')
      localStorage.removeItem('kosarOsszeg')
      localStorage.removeItem('kosarMennyisegek')

      await Swal.fire({
        icon: 'success',
        title: 'Rendelésed leadtuk!',
        text: `Átvétel: ${sz.name} (${rovidIdo(sz.start_time)} – ${rovidIdo(sz.end_time)})`,
        confirmButtonColor: '#e8590c',
      })
      navigate('/')
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Hoppá!',
        text: 'Nem sikerült leadni a rendelést, próbáld újra.',
        confirmButtonColor: '#e8590c',
      })
    } finally {
      setKuldes(false)
    }
  }

  return (
    <div className={styles.oldal}>
      <div className={styles.overlay} />
      <Container className={styles.tartalom}>
        <button type="button" className={styles.vissza} onClick={() => navigate('/kinalat')}>
          <FontAwesomeIcon icon={faArrowLeft} /> Vissza a kínálathoz
        </button>

        <div className={`text-center ${styles.fej}`}>
          <span className={styles.datum}>
            <FontAwesomeIcon icon={faClock} /> {maiNap}
          </span>
          <h1>Melyik szünetben vennéd át?</h1>
          <p>Csak a mai nap még elérhető szünetei közül választhatsz.</p>
        </div>

        {!elsoElerheto && (
          <div className={`text-center ${styles.ures}`}>
            <FontAwesomeIcon icon={faBell} size="2x" />
            <h4>Mára már nincs több szünet</h4>
            <p>Holnaptól újra tudsz rendelni, addig is jó étvágyat!</p>
          </div>
        )}

        <Row className="g-4 justify-content-center">
          {lista.map((sz) => {
            const kivalasztva = valasztott === sz.id
            return (
              <Col key={sz.id} xs={12} sm={6} lg={4}>
                <button
                  type="button"
                  disabled={sz.mult}
                  onClick={() => setValasztott(sz.id)}
                  className={`${styles.kartya} ${kivalasztva ? styles.aktiv : ''} ${sz.mult ? styles.letiltva : ''}`}
                >
                  <div className={styles.ikon}>
                    <FontAwesomeIcon icon={sz.mult ? faLock : kivalasztva ? faCheck : faBell} />
                  </div>
                  <h3>{sz.name}</h3>
                  <div className={styles.ido}>
                    {rovidIdo(sz.start_time)} – {rovidIdo(sz.end_time)}
                  </div>
                  {sz.mult && <span className={styles.cimke}>Már elmúlt</span>}
                  {!sz.mult && sz.id === elsoElerheto?.id && !kivalasztva && (
                    <span className={`${styles.cimke} ${styles.kovetkezo}`}>Következő</span>
                  )}
                </button>
              </Col>
            )
          })}
        </Row>

        <div className={`text-center ${styles.alja}`}>
          <div className={styles.osszeg}>
            Fizetendő: <strong>{osszeg.toLocaleString('hu-HU')} Ft</strong>
          </div>
          <button type="button" className={styles.gomb} disabled={!valasztott || kuldes} onClick={leadas}>
            {kuldes ? 'Küldés...' : 'Rendelés megerősítése'}
          </button>
        </div>
      </Container>
    </div>
  )
}