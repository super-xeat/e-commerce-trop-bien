


import { useEffect } from "react";
import Productcard from "./productcard";
import {useCart} from "../context/cartcontext";



export default function Productlist() {

    const {listeProduits, setListeProduits} = useCart()


    useEffect(()=> {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setListeProduits(data))
    }, [])



    return (
        <div>
            
            <ul>
                {listeProduits.map((prod)=> (
                    <li key={prod._id}>
                        <Productcard produit={prod}/>
                        <button onClick={()=> supprimer(prod._id)}>supprimer</button>
                    </li>
                ))}
            </ul>          
        </div>
    )
}