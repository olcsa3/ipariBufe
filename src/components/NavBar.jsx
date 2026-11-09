import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'

export default function NavBar(){
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
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="regisztracio" className={`px-5 ${styles['custom-nav-link']}`}>
                            Regisztráció
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}