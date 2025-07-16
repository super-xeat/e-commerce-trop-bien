

import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import '../styles/navbar.css'
import { useCart } from "../context/cartcontext";
import { useState, useEffect } from "react";



export default function Navbar() {

    const {
        authentificated, 
        logout, 
        user, 
        image
    } = useAuth()


    const {
        search, 
        setsearch, 
        setchamp,
        categories,
        setcategorie
    } = useCart()


    const [menu, setmenu] = useState(false)

    useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 700) {
        setmenu(false); 
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="navbar">
                 

            <div className="petite-navbar">
                <div className="burgerlogo">
                    <button className="burger" onClick={() => setmenu(!menu)}>
                        ☰
                    </button>
                    
                    <h1 className="logo">Le coin bon</h1>

                </div>


                <div className="search">
                    <input onChange={(e)=>setsearch(e.target.value)} 
                    value={search} 
                    placeholder="rechercher" 
                    onFocus={()=>setchamp(true)}
                    onBlur={()=>setchamp(false)} />
                </div>
             
            </div>
 
            <div className={menu ? 'menu open' : 'menu'}>


                <h1 className={menu ? 'logo' : 'cache'}>Le coin bon</h1>

                <hr className="hr"/>

                <button onClick={()=>setmenu(!menu)} className={menu ? 'cacher-bouton' : 'cache'}>
                    caché
                </button>

                <div className="AjoutProduit">
                    <Link to="/ajoutproduit">mettre un produit</Link>
                </div>

                <hr className="hr"/>

                <nav className="liens">
                    <Link className="accueil" to="/">Accueil</Link>                            
                    <Link to={user ? `/message/${user._id}` : '/message'}>message</Link>
                    <Link to="/profil">profil</Link>
                    <Link to={user ? `/panier/${user._id}` : "/panier"}>panier</Link>
                    {!authentificated && <Link to="/register"><FaUser/></Link>}
                </nav>    

                <hr className="hr"/>

                <div className="utilisateur">
                    {image && (
                        <img 
                        src={`http://localhost:5000/uploads/${image}`} 
                        style={{width:'30px', height: 'auto'}}
                        />)}
                    
                    {authentificated && <button onClick={logout}><FaSignOutAlt/></button>}                   
                </div>
                
                <ul className={menu ? "categorie-petite-nav" : 'cache'}>
                    {categories.map((item, index) => (
                        <li key={index} onClick={() => setcategorie(item)}>
                        {item}
                        </li>
                    ))}
                </ul>

            </div>           
        </div>
        
    )
}