


import { useEffect } from "react";
import Productcard from "./productcard";
import {useCart} from "../context/cartcontext";
import { useAuth } from "../context/authcontext";


export default function Productlist() {

    const {listeProduits, setListeProduits, supprimerAdmin} = useCart()
    const {user} = useAuth()

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
                        {user.role === 'admin' && <button onClick={()=> supprimerAdmin(prod)}>supprimer</button>}
                    </li>
                ))}
            </ul>          
        </div>
    )
}