

import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import '../styles/navbar.css'
import { useCart } from "../context/cartcontext";
import { Navigate } from "react-router-dom";



export default function Navbar() {

    const {authentificated, logout, user, image} = useAuth()
    const {search, setsearch, setchamp} = useCart()
    

    return (
        <div className="navbar">
                 
            <h1>Le coin bon</h1>

            <Link to="/ajoutproduit" className="AjoutProduit">mettre un produit</Link>


            <div className="search">
                <input onChange={(e)=>setsearch(e.target.value)} 
                value={search} 
                placeholder="rechercher" 
                onFocus={()=>setchamp(true)}
                onBlur={()=>setchamp(false)} />
            </div>
            
            <nav className="nav">
                <Link to="/">Accueil</Link>                            
                <Link to={user ? `/message/${user._id}` : '/message'}>message</Link>
                <Link to="/profil">profil</Link>
                <Link to={user ? `/panier/${user._id}` : "/panier"}>panier</Link>
                {!authentificated && <Link to="/register"><FaUser/></Link>}
            </nav>    

            <div className="utilisateur">
                {image && (
                    <img 
                    src={`http://localhost:5000/uploads/${image}`} 
                    style={{width:'30px', height: 'auto'}}
                    />)}
                
                {authentificated && <button onClick={logout}><FaSignOutAlt/></button>}
                
            </div>
            
            

        </div>
        
    )
}