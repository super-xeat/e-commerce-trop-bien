

import { useEffect } from "react";
import Productcard from "./productcard";
import usecard from "../context/cartcontext";



export default function Produclist() {

    const {liste} = usecard()
    const {setliste} = usecard()
    const {supprimer} = usecard()

    useEffect(()=> {
        fetch('http:/localhost:3000/api/products')
        .then(res => res.json())
        .then(data => setliste([...liste, data]))
    }, [])

    return (
        <div>
            <ul>
                {liste.map((prod)=> {
                    <li key={prod.id}>
                        <Productcard produit={prod}/>
                        <button onClick={()=> supprimer(prod)}>supprimer</button>
                    </li>
                })}
            </ul>
        </div>
    )
}