

import {useCart} from "../context/cartcontext"
import { useAuth } from "../context/authcontext"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../styles/productcard.css'
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";




export default function Productcard({produit}) {

    const {ajouter, liste, 
            AjouterFavorie, 
            listeFavorie, 
            listeprofil, 
            setlisteprofil,
            suppFavorie} = useCart()
    const {loading, user} = useAuth()
    const [isfavorie, setisfavorie] = useState(false)


    const estdanspanier = liste.some(item => item._id === produit._id)
    

    useEffect(()=> {
        const estdansfavorie = listeFavorie.some(item => item._id === produit._id)
        setisfavorie(estdansfavorie)
    }, [listeFavorie, produit._id])


    function buttonFAV() {
        if (!user) return

        if (!isfavorie) {
            AjouterFavorie(produit)
        } else {
            suppFavorie(user._id, produit._id)
        }
        setisfavorie(!isfavorie)

    }

    return (
        
        <div className="productcard">

            <div className="profil">
                <h5>posté par : {produit.user?.name || "anonyme"} </h5>
                {produit.user?.image && <img src={`http://localhost:5000/uploads/${produit.user.image}`} style={{width:'30px', height:'auto'}}/>}
            </div>
            <hr />
            <h1>{produit.titre}</h1>
            

            <div className="image">
                {Array.isArray(produit.images) ? (
                produit.images.map((prod, index)=> (
                    <img key={index} src={`http://localhost:5000/uploads/${prod}`} style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit:'cover'}}/>
                ))
                ) : produit.images ? 
                (<img src={`http://localhost:5000/uploads/${produit.images}`}/>) 
                : (<p>Pas d'image pour cet article</p>)}
            </div>

            

            <div className="boutons">
                <Link to={`/products/${produit._id}`}>
                <button><FaEye/></button>
                </Link>

                {user && produit.user && produit.user._id && user._id !== produit.user._id && (
                <Link to={`/message/${user._id}/${produit.user._id}`}>
                    <button>Contacter le créateur</button>
                </Link>
                )}
                
            
                {user && !listeprofil &&
                <button 
                onClick={()=>buttonFAV()} 
                style={{ backgroundColor: isfavorie ? 'white' : 'red'}}>
                <FaRegHeart />
                </button>}
                
                {!estdanspanier && 
                <button 
                onClick={()=>ajouter(produit)} 
                disabled={loading || !user}>
                <FaShoppingCart/>
                </button>}
            </div>
            
            
        </div>       
        
    )
}