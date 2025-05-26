
import usecard from "../context/cartcontext";
import { useEffect, useState } from "react";


export default function Productdetail() {

    const [prod, setprod] = useState('')

    useEffect(()=> {
        fetch('http://localhost:3000/api/product/:id')
        .then(res => res.json())
        .then(data => setprod(data))
    })

    return(
        <div>
            <ul>
                {prod.map((prod)=> {
                    <li key={prod.id}>
                        <h1>{prod.title}</h1>
                        <p>{prod.description}</p>
                        <p>{prod.avis}</p>
                        <p>{prod.note}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}