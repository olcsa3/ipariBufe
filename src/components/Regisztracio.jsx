import { useRef, useState, useEffect, use } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "react-bootstrap"
import styles from "./Regisztracio.module.css"
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

const emailRegex = /^[a-zA-Z0-9._%+-]+@ipari\.vein\.hu$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Regisztracio(){
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false)

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);

    useEffect(() => {
        setValidFirstName(firstName.trim().length >= 3);
    }, [firstName]);

    useEffect(() => {
        setValidSurname(surname.trim().length >= 3);
    }, [surname]);

    useEffect(() => {
        setValidEmail(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(passwordRegex.test(password));
    }, [password]);

    useEffect(() => {
        setValidMatchPassword(validPassword && matchPassword === password);
    }, [matchPassword, password, validPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validEmail || !validPassword || !validMatchPassword || !validFirstName || !validSurname) {
            alert("Kérjük töltsd ki az összes mezőt!"); //Modalra kell módosítani
            return;
        }

        console.log("Sikeres regisztráció! Beküldött adatok:", {firstName, surname, email, password});
    }
 
    return (
        <>
            <Card className="mx-auto mt-5 text-center" style={{ width: '30rem' }}>
                <Card.Header as="h5">Regisztráció</Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="vezeteknev">
                            Vezetéknév:
                        </label>
                        <br/>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} id="vezeteknev" autoComplete="off" maxLength="50" required/>
                        {validSurname && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validSurname && surname && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="keresztnev">
                            Keresztnév:
                        </label>
                        <br/>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="keresztnev" autoComplete="off" maxLength="50" required/>
                        {validFirstName && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validFirstName && firstName && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="email">Iskolai e-mail cím:</label>
                        <br/>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="@ipari.vein.hu" autoComplete="off" maxLength="50" required/>
                        {validEmail && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validEmail && email && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="jelszo">Jelszó:</label>
                        <br/>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="jelszo" autoComplete="new-password" maxLength="24" required/>
                        {validPassword && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validPassword && password && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="jelszoMegerosites">Jelszó megerősítése:</label>
                        <br/>
                        <input type="password" value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} id="jelszoMegerosites" autoComplete="new-password" maxLength="24" required/>
                        {validMatchPassword && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validMatchPassword && matchPassword && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <button type="submit" disabled={!validFirstName || !validSurname || !validEmail || !validPassword || !validMatchPassword}>Regisztrálok!</button>
                        <br/><br/>
                        <p>Már van fiókod? <a href="/bejelentkezes">Jelentkezz be!</a></p>
                    </form>
                </Card.Body>
            </Card>
        </>
    )
}