

import { useEffect, useMemo, useState } from "react";
import Productcard from "./productcard";
import {useCart} from "../context/cartcontext";
import '../styles/productlist.css';
import { Link } from "react-router-dom";


export default function Productlist() {

    const {
        listeProduits, 
        setListeProduits, 
        search, 
        filtre_search,
        champ,
        setchamp
    } = useCart()
    const [categorie, setcategorie] = useState('')


    useEffect(()=> {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setListeProduits(data))
    }, [])


    const filtre = useMemo (()=> {
        if (categorie  === "tous les produits" || !categorie ) return listeProduits
        const filtrage = listeProduits.filter(item => item.categorie === categorie)
        return filtrage
    }, [categorie, listeProduits])

    return (
        <div className={champ ? 'dark-mode': 'liste'} style={{paddingTop: '4rem'}}>
            
            <div className="recherche-result">
                {search && (
                <ul className="result">
                    {filtre_search.map(item => (
                        <div>
                            <h1>résultat de votre recherche : </h1>
                            <li key={item._id || item.titre}>
                                <Productcard produit={item}/>
                            </li>
                        </div>

                    ))}
                </ul>)}
            </div>

            <hr />

            <ul className="categorie">
                <li onClick={()=>setcategorie("ménage")}>ménage</li>
                <li onClick={()=>setcategorie("animaux")}>animaux</li>
                <li onClick={()=>setcategorie("films")}>films</li>
                <li onClick={()=>setcategorie("habits")}>habits</li>
                <li onClick={()=>setcategorie("moto")}>moto</li>
                <li onClick={()=>setcategorie("maison")}>maison</li>
                <li onClick={()=>setcategorie("ordinateurs")}>ordinateurs</li>
                <li onClick={()=>setcategorie("salon")}>salon</li>
                <li onClick={()=>setcategorie("jeux")}>jeux</li>
                <li onClick={()=>setcategorie("voiture")}>voiture</li>
                <li onClick={()=>setcategorie("équipement")}>équipement</li>
                <li onClick={()=>setcategorie("tous les produits")}>Tous les produits</li>
            </ul>
            <hr />

            <Link to="/ajoutproduit">ajouter un produit</Link>
             
            <div className="grille">
                {filtre.map((prod)=> (
                    <li key={prod._id}>
                        <Productcard produit={prod}/>
                        
                    </li>
                ))}
            </div>          
        </div>
    )
}