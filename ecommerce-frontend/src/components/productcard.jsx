

import usecard from "../context/cartcontext"


export default function Productcard({produit}) {

    const {ajouter} = usecard()
    return (
        <div>
            <h1>{produit.title}</h1>
            <h2>{produit.price}</h2>
            <img src="" alt="" />
            <button onClick={()=>ajouter(produit)}>ajouter au panier</button>
        </div>
    )
}