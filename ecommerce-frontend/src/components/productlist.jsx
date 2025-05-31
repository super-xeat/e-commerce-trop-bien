


import { useEffect } from "react";
import Productcard from "./productcard";
import usecard from "../context/cartcontext";



export default function Productlist() {

    const {liste, setliste, supprimer} = usecard()


    useEffect(()=> {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setliste(data))
    }, [])


    return (
        <div>
            
            <ul>
                {liste.map((prod)=> (
                    <li key={prod._id}>
                        <Productcard produit={prod}/>
                        <button onClick={()=> supprimer(prod)}>supprimer</button>
                    </li>
                ))}
            </ul>          
        </div>
    )
}