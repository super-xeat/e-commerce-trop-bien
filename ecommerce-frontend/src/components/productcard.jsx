

import {useCart} from "../context/cartcontext"
import { useAuth } from "../context/authcontext"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../styles/productcard.css'




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

            <h6>posté par : {produit.user?.name || "anonyme"} </h6>
            {produit.user?.image && <img src={`http://localhost:5000/uploads/${produit.user.image}`} style={{width:'30px', height:'auto'}}/>}

            <h1 className="titre">{produit.titre}</h1>

            <div className="image">
                {Array.isArray(produit.images) ? (
                produit.images.map((prod, index)=> (
                    <img key={index} src={`http://localhost:5000/uploads/${prod}`} style={{ width: '100%', height: '150%'}}/>
                ))
                ) : produit.images ? 
                (<img src={`http://localhost:5000/uploads/${produit.images}`}/>) 
                : (<p>Pas d'image pour cet article</p>)}
            </div>

            <h3>{produit.description}</h3>
            <h2>prix : {produit.price}</h2>
            <h5>catégorie: {produit.categorie}</h5> 

            <Link to={`/products/${produit._id}`}>
            <button>voir les détails</button>
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
            favorie
            </button>}
            
            {!estdanspanier && 
            <button 
            onClick={()=>ajouter(produit)} 
            disabled={loading || !user}>
            ajouter au panier
            </button>}
            
        </div>       
        
    )
}