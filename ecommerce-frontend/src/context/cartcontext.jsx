

import { useContext, createContext, useState } from "react";
import { useAuth } from "./authcontext";


const Cartcontext = createContext()

export const CartProvider = ({ children }) => {

    const [liste , setliste] = useState([])
    const [comments, setcomments] = useState([])
    const [listeProduits, setListeProduits] = useState([])
    const {user} = useAuth()
    console.log("User from AuthContext:", user)

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

    function supprimerAdmin(product) {

        if (!user || user.role !== 'admin') {
            console.warn("action interdite : seul les admin peuvent les utiliser")
            return
        }

        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                setListeProduits(listeProduits.filter(item => item._id !== product._id))
            }
        })
        
        .catch(err => console.error("une erreur sest produite", err))
    }

    function ajoutercom(newcom) {
        setcomments([...comments, newcom])
    }

    return(
        <Cartcontext.Provider value={{ajouter, supprimer, ajoutercom, comments, liste, setliste, listeProduits, setListeProduits, supprimerAdmin}}>
            {children}
        </Cartcontext.Provider>
    )
}

export const useCart = () => useContext(Cartcontext)