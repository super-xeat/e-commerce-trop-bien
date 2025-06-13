

import { useState } from "react";
import Productcard from "./productcard";
import { useCart } from "../context/cartcontext";



export default function Recherche() {

    const [search, setsearch] = useState('')
    const {listeProduits} = useCart()


    
    const list = Array.from(listeProduits)
    const filtre = list.filter(item => item.titre === search)
        
    

    return (
        <div>
            <input onChange={(e)=>setsearch(e.target.value)} value={search} placeholder="rechercher"/>
            
            <ul>
                {filtre.map(item => (
                    <div>
                        <h1>résultat de votre recherche : </h1>
                        <li key={item._id || item.titre}>
                            <Productcard produit={item}/>
                        </li>
                    </div>

                ))}
            </ul>
        </div>
    )
}