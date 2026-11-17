import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import styles from "./Bejelentkezes.module.css"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Bejelentkezes(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!email || !password) {
            setErrorMsg("Kérjük, töltsd ki az összes mezőt!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.error || "Hiba történt a bejelentkezés során.");
            }
            else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.dispatchEvent(new Event("authChange"));

                setSuccessMsg(`Üdvözlünk, ${data.user.first_name}!`);
                setEmail('');
                setPassword('');

                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
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
                <Card.Header as="h5">Bejelentkezés</Card.Header>
                <Card.Body>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Fiókod e-mail címe:</label>
                        <br/>
                        <input className={styles['form-input']} value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="@ipari.vein.hu" maxLength="50" required/>
                        <br/><br/>
                        <label htmlFor="jelszo">Jelszavad:</label>
                        <br/>
                        <div className={styles['password-wrapper']}>
                            <input className={`${styles['form-input']} ${styles['password-input']}`} value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} id="jelszo" maxLength="24" required placeholder="Pl.: Pelda123!"/>
                            <button type="button" className={styles['toggle-password-button']} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                            </button>
                        </div>
                        <br/><br/>
                        <button type="submit" disabled={!email || !password || isLoading}>
                            {isLoading ? "Bejelentkezés..." : "Bejelentkezés"}
                        </button>
                        <br/><br/>
                         <p>Még nincs fiókod? <a href="/regisztracio">Regisztrálj!</a></p>
                    </form>
                </Card.Body>
            </Card>
        </>
    )
}