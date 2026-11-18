import { Card } from "react-bootstrap";

export default function Fooldal() {
    return (
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-5 min-vh-100">
            <Card style={{ width: '36rem' }}>
                <Card.Body>
                    <Card.Title>Az oldal célja</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Miért használd?</Card.Subtitle>
                    <Card.Text>
                        Az Ipari Büfé weboldal azt a problémát hivatott kiküszöbölni, hogy a szünetekben kígyózó sorok miatt a diákok elkésnek óráról, vagy nem is jutnak hozzá ételükhöz. Rendszerünk lehetővé teszi, hogy már előre fizetve lehessen megrendelni a kívánt árut.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '36rem' }}>
                <Card.Body>
                    <Card.Title>Használat</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Hogyan használd?</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '36rem' }}>
                <Card.Body>
                    <Card.Title>Funkciók</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Miért éri meg használni az oldalt?</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}