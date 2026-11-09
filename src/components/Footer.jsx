import { Container } from "react-bootstrap"

export default function Footer(){
    return (
        <>
           <footer className="bg-dark text-light py-4 mt-auto">
                <div className="container">
                    <div className="row text-center text-md-start">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5 className="fw-bold">Ipari Büfé</h5>
                        <img src="src\img\logo.png" alt="logo" width="160" height="130"/>
                    </div>

                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5 className="fw-bold">Linkek</h5>
                        <ul className="list-unstyled">
                        <li><a href="/" className="text-light text-decoration-none opacity-75">Főoldal</a></li>
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Adatkezelési tájékoztató</a></li>
                        <li><a href="https://ipariszakkozep.hu" target="_blank" className="text-light text-decoration-none opacity-75">Iskola weboldala</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h5 className="fw-bold">Kapcsolat</h5>
                        <p className="mb-1 opacity-75">Email: isk@ipariszakkozep.hu</p>
                        <p className="mb-1 opacity-75">Telefon: +36 20 233 6321</p>
                        <p className="opacity-75">Cím: 8200 Veszprém, Iskola u. 4.</p>
                    </div>
                    </div>

                    <hr className="my-3 border-secondary" />

                    <div className="row align-items-center">
                    <div className="col-md-12 text-center">
                        {new Date().getFullYear()} | Veszprémi Szakképzési Centrum Ipari Technikum
                    </div>
                    </div>
                </div>
            </footer>
        </>
    )
}