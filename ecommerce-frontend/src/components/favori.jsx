

import { useEffect } from "react";
import Productcard from "./productcard";
import { useAuth } from "../context/authcontext";
import { useState } from "react";


export default function Favori() {

    const {user} = useAuth()
    const [listeFavorie, setlisteFavorie] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:5000/users/${user._id}`)
        .then(res => res.json())
        .then(data => setlisteFavorie(data.favorie))
    }, [])


    return(
        <div>
            <h2>liste des favorie</h2>
            <ul>
                {listeFavorie.map((item, index)=> (
                    <li key={index}>
                        <Productcard produit={item}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}