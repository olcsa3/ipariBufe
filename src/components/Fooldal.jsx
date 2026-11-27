
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import "./Fooldal.css";

export default function Fooldal() {
    return (
        <div className="fooldal">

            {/* HERO RÉSZ */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <Badge bg="warning" text="dark" className="mb-3 hero-badge">
                            </Badge>

                            <h1>
                                Rendelj előre,
                                <span> és töltsd mással a szünetet!</span>
                            </h1>

                            <p className="hero-description">
                                Rendeld meg előre, amit szeretnél, fizesd ki
                                bankkártyával, és a szünetben már csak át kell
                                venned a rendelésedet.
                            </p>

                            <Button
                                variant="warning"
                                size="lg"
                                href="/kinalat"
                                className="hero-button"
                            >
                                Megnézem a kínálatot →
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* AZ OLDAL CÉLJA */}
            <section className="purpose-section">
                <Container>
                    <div className="section-heading">
                        <Badge bg="warning" text="dark">
                            MIÉRT ÉRDEMES INNEN RENDELNI?
                        </Badge>

                        <h2>
                            A szünet ne a sorban állásról szóljon!
                        </h2>

                        <p>
                            Biztosan veled is előfordult már, hogy a hosszú sor
                            miatt alig maradt időd enni a szünetben. Ezen szeretnénk
                            változtatni! Az oldalon előre kiválaszthatod és
                            kifizetheted, amit szeretnél, így több időd marad
                            a szünetből. Neked csak a generált kódot kell bemutatnod,
                            és már meg is kapod a rendelésed.
                        </p>
                    </div>
                </Container>
            </section>

            {/* HASZNÁLAT */}
            <section className="steps-section">
                <Container>
                    <div className="section-heading">
                        <Badge bg="warning" text="dark">
                            3 EGYSZERŰ LÉPÉS
                        </Badge>

                        <h2>Hogyan tudsz rendelni?</h2>

                        <p>
                            A rendelés leadása nem bonyolult,
                            csak kövesd ezt a három lépést!
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col md={4}>
                            <div className="step-card">
                                <div className="step-number">01</div>
                                <div className="step-icon">🛒</div>
                                <h4>Válaszd ki, amit szeretnél!</h4>
                                <p>
                                    Nézd meg a büfé kínálatát, válaszd ki
                                    a kedvenc termékeidet, és tedd őket
                                    a kosaradba.
                                </p>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="step-card">
                                <div className="step-number">02</div>
                                <div className="step-icon">💳</div>
                                <h4>Fizesd ki a rendelésed!</h4>
                                <p>
                                    Ha mindent kiválasztottál, ellenőrizd
                                    a kosarad tartalmát, majd fizesd ki
                                    a rendelést bankkártyával.
                                </p>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="step-card">
                                <div className="step-number">03</div>
                                <div className="step-icon">🥪</div>
                                <h4>Vedd át a büfében!</h4>
                                <p>
                                    Sikeres fizetés után nincs más dolgod,
                                    mint a megfelelő időben elmenni a büféhez,
                                    és átvenni a rendelésedet.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ALSÓ RÉSZ */}
            <section className="cta-section">
                <Container>
                    <div className="cta-box">
                        <h2>Na, mit ennél ma? 😋</h2>

                    </div>
                </Container>
            </section>

        </div>
    );
}
