

import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";


export default function Navbar() {

    const {authentificated, logout, user} = useAuth()

    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link>
                {!authentificated && <Link to="/login">se connecter</Link>}
                {!authentificated && <Link to="/register">register</Link>}
                {authentificated && <Link to="/ajoutproduit">mettre un produit</Link>}
                {authentificated && <button onClick={logout}>deconnexion</button>}
                {authentificated && user && <Link to={`/message/${user._id}`}>message</Link>}
                {authentificated && <Link to="/profil">profil</Link>}
                <Link to={user ? `/panier/${user._id}` : "/panier"}>panier</Link>

            </nav>
        </div>
    )
}