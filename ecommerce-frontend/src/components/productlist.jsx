


import { useEffect, useMemo, useState } from "react";
import Productcard from "./productcard";
import {useCart} from "../context/cartcontext";
import Recherche from "./recherche";


export default function Productlist() {

    const {listeProduits, setListeProduits } = useCart()
    const [categorie, setcategorie] = useState('')

    useEffect(()=> {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setListeProduits(data))
    }, [])


    const filtre = useMemo (()=> {
        if (!categorie) return listeProduits
        const filtrage = listeProduits.filter(item => item.categorie === categorie)
        return filtrage
    }, [categorie, listeProduits])

    return (
        <div>
            <Recherche/>
            <select onChange={(e)=>setcategorie(e.target.value)}>
                <option value="">tout les produits</option>
                <option value="menage">ménage</option>
                <option value="salon">salon</option>
                <option value="jeux">jeux</option>
                <option value="voiture">voiture</option>
                <option value="equipement">equipement</option>
            </select>
            <ul>
                {filtre.map((prod)=> (
                    <li key={prod._id}>
                        <Productcard produit={prod}/>
                        
                    </li>
                ))}
            </ul>          
        </div>
    )
}