

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
        categorie,
        categories,
        setcategorie
    } = useCart()
    

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

 
            <ul className="categorie">
                {categories.map((item, index)=> (
                    <li key={index} onClick={()=>setcategorie(item)}>
                        {item}
                    </li>
                ))}
            </ul>
              
  
            <div className="case-ajoutproduit">
                <Link to="/ajoutproduit">Ajouter un produit</Link>
            </div>

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