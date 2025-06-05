

import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";


export default function Navbar() {

    const {authentificated, logout} = useAuth()

    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link>
                {!authentificated && <Link to="/login">se connecter</Link>}
                {!authentificated && <Link to="/register">register</Link>}
                {authentificated && <Link to="/ajoutproduit">mettre un produit</Link>}
                {authentificated && <button onClick={logout}>deconnexion</button>}
                {authentificated && <Link to="/message">message</Link>}
                {authentificated && <Link to="/profil">profil</Link>}
                <Link to="/panier">panier</Link>
            </nav>
        </div>
    )
}