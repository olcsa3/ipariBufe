import { useRef, useState, useEffect } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "react-bootstrap"

const emailRegex = /^[a-zA-Z0-9._%+-]+@ipari\.vein\.hu$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Regisztracio(){
    return (
        <>
            <Card className="mx-auto mt-5 text-center" style={{ width: '30rem' }}>
                <Card.Header as="h5">Regisztráció</Card.Header>
                <Card.Body>
                    <form>
                        <label htmlFor="teljesnev">Teljes név:</label>
                        <br/>
                        <input type="text" id="teljesnev" autocomplete="off" required/>
                        <br/><br/>
                        <label htmlFor="email">Iskolai e-mail cím:</label>
                        <br/>
                        <input type="email" id="email" placeholder="@ipari.vein.hu" autocomplete="off" required/>
                        <br/><br/>
                        <label htmlFor="jelszo">Jelszó:</label>
                        <br/>
                        <input type="password" id="jelszo" autocomplete="off" required/>
                        <br/><br/>
                        <button type="submit">Regisztrálok!</button>
                        <br/><br/>
                        <p>Már van fiókod? <a href="/bejelentkezes">Jelentkezz be!</a></p>
                    </form>
                </Card.Body>
            </Card>
        </>
    )
}