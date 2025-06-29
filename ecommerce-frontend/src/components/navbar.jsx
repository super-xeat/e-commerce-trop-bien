

import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import '../styles/navbar.css'
import { useCart } from "../context/cartcontext";


export default function Navbar() {

    const {authentificated, logout, user, image} = useAuth()
    const {search, setsearch, setchamp} = useCart()


    console.log("image", image)
    return (
        <div className="navbar">
            
            <div>
                <h1>Le coin bon</h1>
            </div>
            <nav>
                <Link to="/">Accueil</Link>               
                {!authentificated && <Link to="/register">se connecter</Link>}
                <Link to="/ajoutproduit" className="AjoutProduit">mettre un produit</Link>
                {authentificated && user && <Link to={`/message/${user._id}`}>message</Link>}
                <Link to="/profil">profil</Link>
                <Link to={user ? `/panier/${user._id}` : "/panier"}>panier</Link>
                {image ? (<img src={`http://localhost:5000/uploads/${image}`} style={{width:'30px', height: 'auto'}}/>) : '' }
                {authentificated && <button onClick={logout}>deconnexion</button>}
            </nav>            
            
            
            <div className="search">
                <input onChange={(e)=>setsearch(e.target.value)} 
                value={search} 
                placeholder="rechercher" 
                onFocus={()=>setchamp(true)}
                onBlur={()=>setchamp(false)} />
            </div>

        </div>
        
    )
}