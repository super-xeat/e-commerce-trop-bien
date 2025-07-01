

import { useEffect } from "react";
import Productcard from "./productcard";
import { useAuth } from "../context/authcontext";
import { useState } from "react";
import { useCart } from "../context/cartcontext";


export default function Favori() {

    const {user} = useAuth()
    const {suppFavorie, listeFavorie, setlisteFavorie} = useCart()
    


    useEffect(()=> {
        fetch(`http://localhost:5000/users/${user._id}`)
        .then(res => res.json())
        .then(data => setlisteFavorie(data.favorie))
    }, [user._id])


    async function handleDelete(productid) {
        try {
            await suppFavorie(user._id, productid)
            const filtre = listeFavorie.filter(item => item._id !== productid)
            setlisteFavorie(filtre)
        } catch (error) {
            console.error('erreur')
        }
    }
    
    return(
        <div>
            <h2>liste des favorie</h2>
            <ul>
                {listeFavorie.map((item, index)=> (
                    <li key={index}>
                        <Productcard produit={item}/>
                        <button onClick={()=>handleDelete(item._id)}>supprimer de la liste</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}