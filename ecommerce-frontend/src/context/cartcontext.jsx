

import { useContext, createContext, useState } from "react";
import { useAuth } from "./authcontext";


const Cartcontext = createContext()

export const CartProvider = ({ children }) => {

    const [liste , setliste] = useState([])
    const [comments, setcomments] = useState([])
    const [listeProduits, setListeProduits] = useState([])
    const {user} = useAuth()
    const [search, setsearch] = useState('')


    function ajouter(newprod) {
        const prodexist = liste.find(item => item._id === newprod._id)
        let majliste 

        if (prodexist) {
            majliste = liste.map(item => item._id === newprod._id ? 
                {...item, quantite: item.quantite + 1} : item
            )

        } else {
            majliste = [...liste, {...newprod, quantite: 1}]
        }

        setliste(majliste)

        const produitsAPoster = majliste.map(item => ({
            produit: item._id,
            quantite: item.quantite
          }))

        if (!user || !user._id) {
            console.warn("Utilisateur non connecté, panier non enregistré.");
            return;
          }
          
        try {
            fetch(`http://localhost:5000/panier/${user._id}`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({produits: produitsAPoster})
            })
        } catch (error) {
            console.error("erreur d'eregistrement", error)
        }
    }


    function supprimer(productid) {
        
        fetch(`http://localhost:5000/panier/${user._id}/${productid}`, {
            method: 'DELETE',
        })  .then(res => res.json())
            .then(data => {
            setliste(data.produits.map(item => ({
                _id: item.produit._id,
                titre: item.produit.titre,
                description: item.produit.description,
                quantite: item.quantite
        })))
        })
    }

    
    function ajoutercom(newcom) {
        setcomments([...comments, newcom])
    }


    const list = Array.from(listeProduits)
    const filtre_search = list.filter(item => item.titre === search)
        
    

    return(
        <Cartcontext.Provider value={{ajouter, supprimer, ajoutercom, comments, liste, setliste, listeProduits, setListeProduits, search, filtre_search, setsearch}}>
            {children}
        </Cartcontext.Provider>
    )
}

export const useCart = () => useContext(Cartcontext)