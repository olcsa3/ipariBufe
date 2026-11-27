import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import styles from "./Kinalat.module.css";
import Swal from "sweetalert2";

import sajtosZsemle from "../img/sajtos_zsemle.png";
import pizzacsiga from "../img/pizzacsiga.png";
import pizzaszeletSajtos from "../img/pizzaszelet_sajtos.png";
import pizzaszeletKukoricas from "../img/pizzaszelet_kukoricas.png";
import sonkasBagett from "../img/sonkas_sajtos_bagett.png";
import szalamisBagett from "../img/szalamis_bagett.png";
import csokisTart from "../img/csokis_tart.png";
import brownie from "../img/brownie.png";
import makosCsiga from "../img/makos_csiga.png";

const MIN_DB = 0;
const MAX_DB = 10;

const TERMEKEK = [
  { id: "sajtos-zsemle", nev: "Pogácsa", kep: sajtosZsemle, ar: 450 },
  { id: "pizzacsiga", nev: "Pizzacsiga", kep: pizzacsiga, ar: 650 },
  {
    id: "pizzaszelet-sajtos",
    nev: "Sajtos pizzaszelet",
    kep: pizzaszeletSajtos,
    ar: 650,
  },
  {
    id: "pizzaszelet-kukoricas",
    nev: "Kukoricás pizzaszelet",
    kep: pizzaszeletKukoricas,
    ar: 650,
  },
  {
    id: "sonkas-melegszendvics",
    nev: "Sonkás-sajtos melegszendvics",
    kep: sonkasBagett,
    ar: 830,
  },
  {
    id: "szalamis-melegszendvics",
    nev: "Szalámis melegszendvics",
    kep: szalamisBagett,
    ar: 830,
  },
  { id: "csokis-tart", nev: "Csokoládés tart", kep: csokisTart, ar: 600 },
  { id: "brownie", nev: "Brownie", kep: brownie, ar: 650 },
  { id: "makos-csiga", nev: "Kakaós csiga", kep: makosCsiga, ar: 650 },
];

export default function Kinalat() {
  const [mennyisegek, setMennyisegek] = useState([]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    Swal.fire({
      title: "Siker!",
      text: "asd"
    });
  };

  const modosit = (id, valtozas) => {
    setMennyisegek((elozo) => {
      const jelenlegi = elozo[id] ?? 0;
      const uj = Math.min(MAX_DB, Math.max(MIN_DB, jelenlegi + valtozas));
      return { ...elozo, [id]: uj };
    });
  };

  return (
    <div className={styles.kinalat}>
      <Container>
        <h1 className={styles.cim}>Kínálat</h1>

        <ul className={styles.lista}>
          {TERMEKEK.map((termek) => {
            const db = mennyisegek[termek.id] ?? 0;
            return (
              <li key={termek.id} className={styles.sor}>
                <img className={styles.kep} src={termek.kep} alt={termek.nev} />

                <div>
                  <h2 className={styles.nev}>{termek.nev}</h2>
                  <p className={styles.ar}>{termek.ar} Ft</p>
                </div>

                <div
                  className={styles.mennyiseg}
                  aria-label={`${termek.nev} mennyisége`}
                >
                  <Button
                    className={styles.gomb}
                    variant="outline-dark"
                    onClick={() => modosit(termek.id, -1)}
                    disabled={db <= MIN_DB}
                    aria-label={`${termek.nev}: eggyel kevesebb`}
                  >
                    −
                  </Button>

                  <span className={styles.szam} aria-live="polite">
                    {db}
                  </span>
                  <Button
                    className={styles.gomb}
                    variant="outline-dark"
                    onClick={() => modosit(termek.id, 1)}
                    disabled={db >= MAX_DB}
                    aria-label={`${termek.nev}: eggyel több`}
                    title={
                      db >= MAX_DB
                        ? "Egy termékből legfeljebb 10 darab rendelhető"
                        : undefined
                    }
                  >
                    +
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <Button
          className={styles.leadasgomb}
          variant="outline-dark"
          onClick={handleSubmit}
        >
          Rendelés leadása
        </Button>
      </Container>
    </div>
  );
}
