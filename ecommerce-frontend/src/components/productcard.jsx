

import {useCart} from "../context/cartcontext"
import { useAuth } from "../context/authcontext"
import { Link } from "react-router-dom"

export default function Productcard({produit}) {

    const {ajouter} = useCart()
    const {loading, user} = useAuth()

    return (
        <div>
            <h1>posté par : {produit.user?.name || "anonyme"}</h1>

            <h1>{produit.titre}</h1>
            <h1>{produit.description}</h1>
            <h2>{produit.price}</h2>
            <h2>{produit.categorie}</h2>
            <Link to={`/product/${produit._id}`}>
                <button>voir les détails</button>
            </Link>

            {user && produit.user && produit.user._id && user._id !== produit.user._id && (
            <Link to={`/message/${user._id}/${produit.user._id}`}>
                <button>Contacter le créateur</button>
            </Link>
            )}

            <button onClick={()=>ajouter(produit)} disabled={loading || !user}>ajouter au panier</button>
        </div>
    )
}