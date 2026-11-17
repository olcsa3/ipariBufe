import { useState, useEffect } from "react"
import { faCheck, faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "react-bootstrap"
import styles from "./Regisztracio.module.css"

const emailRegex = /^[a-zA-Z0-9._%+-]+@ipari\.vein\.hu$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;

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


    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showMatchPassword, setShowMatchPassword] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!validEmail || !validPassword || !validMatchPassword || !validFirstName || !validSurname) {
            alert("Kérjük, töltsd ki az összes mezőt!"); //Modalra kell módosítani
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName, surname, email, password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.error || "Hiba történt a regisztráció során.");
            } 
            else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.dispatchEvent(new Event("authChange"));

                setSuccessMsg("Sikeres regisztráció!");
                setFirstName('');
                setSurname('');
                setEmail('');
                setPassword('');
                setMatchPassword('');
                //console.log("Sikeres regisztráció! Beküldött adatok:", {firstName, surname, email, password});
            }
        } catch (err) {
            console.error("Hálózati hiba:", err);
            setErrorMsg("Nem sikerült kapcsolódni a szerverhez.");
        } finally {
            setIsLoading(false);
        }

    }
 
    return (
        <>
            <Card className="mx-auto mt-5 text-center" style={{ width: '30rem' }}>
                <Card.Header as="h5">Regisztráció</Card.Header>
                <Card.Body>
                    {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
                    {successMsg && <div className="alert alert-success" role="alert">{successMsg}</div>}

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="vezeteknev">
                            Vezetéknév:
                        </label>
                        <br/>
                        <input className={styles['form-input']} type="text" value={surname} onChange={(e) => setSurname(e.target.value)} id="vezeteknev" autoComplete="off" maxLength="50" required/>
                        {validSurname && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validSurname && surname && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="keresztnev">
                            Keresztnév:
                        </label>
                        <br/>
                        <input className={styles['form-input']} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="keresztnev" autoComplete="off" maxLength="50" required/>
                        {validFirstName && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validFirstName && firstName && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="email">Iskolai e-mail cím:</label>
                        <br/>
                        <input className={styles['form-input']} type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="@ipari.vein.hu" autoComplete="off" maxLength="50" required/>
                        {validEmail && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validEmail && email && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="jelszo">Jelszó:</label>
                        <br/>
                        <div className={styles['password-wrapper']}>
                            <input className={`${styles['form-input']} ${styles['password-input']}`} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} id="jelszo" autoComplete="new-password" maxLength="24" required placeholder="Pl.: Pelda123!"/>
                            <button type="button" className={styles['toggle-password-button']} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                            </button>
                        </div>
                        {validPassword && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validPassword && password && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <label htmlFor="jelszoMegerosites">Jelszó megerősítése:</label>
                        <br/>
                        <div className={styles['password-wrapper']}>
                            <input className={`${styles['form-input']} ${styles['password-input']}`} type={showMatchPassword ? "text" : "password"} value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} id="jelszoMegerosites" autoComplete="new-password" maxLength="24" required/>
                            <button type="button" className={styles['toggle-password-button']} onClick={() => setShowMatchPassword(!showMatchPassword)} aria-label={showMatchPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}>
                                <FontAwesomeIcon icon={showMatchPassword ? faEyeSlash : faEye}/>
                            </button>
                        </div>
                        {validMatchPassword && <FontAwesomeIcon icon={faCheck} className={`ms-2 text-success ${styles['validation-icon']}`}/>}
                        {!validMatchPassword && matchPassword && <FontAwesomeIcon icon={faTimes} className={`ms-2 text-danger ${styles['validation-icon']}`}/>}
                        <br/><br/>
                        <button type="submit" disabled={!validFirstName || !validSurname || !validEmail || !validPassword || !validMatchPassword || isLoading}>
                            {isLoading ? "Folyamatban..." : "Regisztráció"}
                        </button>
                        <br/><br/>
                        <p>Már van fiókod? <a href="/bejelentkezes">Jelentkezz be!</a></p>
                    </form>
                </Card.Body>
            </Card>
        </>
    )
}