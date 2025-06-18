

import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import '../styles/navbar.css'
import { useCart } from "../context/cartcontext";


export default function Navbar() {

    const {authentificated, logout, user} = useAuth()
    const {search, setsearch} = useCart()

    return (
        <div className="navbar">
            <div>
                <h1>Le coin bon</h1>
            </div>
            <nav>
                <Link to="/">Accueil</Link>
                {!authentificated && <Link to="/login">se connecter</Link>}
                {!authentificated && <Link to="/register">register</Link>}
                <Link to="/ajoutproduit">mettre un produit</Link>
                {authentificated && <button onClick={logout}>deconnexion</button>}
                {authentificated && user && <Link to={`/message/${user._id}`}>message</Link>}
                <Link to="/profil">profil</Link>
                <Link to={user ? `/panier/${user._id}` : "/panier"}>panier</Link>
                 
            </nav>

            <div className="search">
                <input onChange={(e)=>setsearch(e.target.value)} value={search} placeholder="rechercher"/>
            </div>
 
            
        </div>
        
    )
}