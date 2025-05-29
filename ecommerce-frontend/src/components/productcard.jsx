

import usecard from "../context/cartcontext"

// aucun lien avec productdetail
export default function Productcard({produit}) {

    const {ajouter} = usecard()
    return (
        <div>
            <h1>{produit.title}</h1>
            <h2>{produit.price}</h2>
            <button onClick={()=>ajouter(produit)}>ajouter au panier</button>
        </div>
    )
}