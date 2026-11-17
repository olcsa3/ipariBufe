import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'
import { faUser, faPizzaSlice, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavBar(){
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        };

        window.addEventListener('authChange', checkAuthStatus);
        window.addEventListener('storage', checkAuthStatus);

        return () => {
            window.removeEventListener('authChange', checkAuthStatus);
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, [])

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        window.dispatchEvent(new Event("authChange"));
        navigate('/');
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={NavLink} to="/" className={styles['nav-brand-custom']}>
                            <img src='src/img/logo.png' width="120" height="100" alt='logo'></img>
                            <span>Ipari Büfé</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="kinalat" className={`px-5 ${styles['custom-nav-link']}`}>
                            Kínálat
                            <FontAwesomeIcon icon={faPizzaSlice} className="ms-2"/>
                        </Nav.Link>
                        {isLoggedIn ? (
                            <Nav.Link href="/" onClick={handleLogout} className={`px-5 ${styles['custom-nav-link']}`}>
                                Kijelentkezés
                                <FontAwesomeIcon icon={faRightFromBracket} className="ms-2"/>
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={NavLink} to="regisztracio" className={`px-5 ${styles['custom-nav-link']}`}>
                                Regisztráció
                                <FontAwesomeIcon icon={faUser} className={`ms-2 ${styles['icon-circle']}`}/>
                            </Nav.Link>
                        )}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}