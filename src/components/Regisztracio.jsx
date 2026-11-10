import { useRef, useState, useEffect } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "react-bootstrap"
import styles from "./Regisztracio.module.css"

const emailRegex = /^[a-zA-Z0-9._%+-]+@ipari\.vein\.hu$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Regisztracio(){
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    useEffect(() => {
        setValidName(name.trim().length >= 3);
    }, [name]);

    useEffect(() => {
        setValidEmail(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(passwordRegex.test(password));
    }, [password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validEmail || !validPassword || !validName) {
            alert("Kérjük töltsd ki az összes mezőt!"); //Modalra kell módosítani
            return;
        }

        console.log("Sikeres regisztráció! Beküldött adatok:", {name, email, password});
    }
 
    return (
        <>
            <Card className="mx-auto mt-5 text-center" style={{ width: '30rem' }}>
                <Card.Header as="h5">Regisztráció</Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="teljesnev">
                            Teljes név:
                        </label>
                        <br/>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="teljesnev" autoComplete="off" required/>
                        {validName && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validName && name && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="email">Iskolai e-mail cím:</label>
                        <br/>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="@ipari.vein.hu" autoComplete="off" required/>
                        {validEmail && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validEmail && email && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="jelszo">Jelszó:</label>
                        <br/>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="jelszo" autoComplete="off" required/>
                        {validPassword && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validPassword && password && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <button type="submit" disabled={!validName || !validEmail || !validPassword}>Regisztrálok!</button>
                        <br/><br/>
                        <p>Már van fiókod? <a href="/bejelentkezes">Jelentkezz be!</a></p>
                    </form>
                </Card.Body>
            </Card>
        </>
    )
}