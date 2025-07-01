

import { useContext, createContext, useState } from "react";
import { useAuth } from "./authcontext";


const Cartcontext = createContext()

export const CartProvider = ({ children }) => {

    const [liste , setliste] = useState([])
    const [comments, setcomments] = useState([])
    const [listeProduits, setListeProduits] = useState([])
    const {user} = useAuth()
    const [search, setsearch] = useState('')
    const [champ, setchamp] = useState(false)
    const [favorie, setfavorie] = useState([])
    const [voirFav, setvoirFav] = useState(false)
    const [listeFavorie, setlisteFavorie] = useState([])
    const [listeprofil, setlisteprofil] = useState(false)


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

    
    async function AjouterFavorie(newprod) {
        try {
            const response = await fetch(`http://localhost:5000/users/${user._id}/favoris/${newprod._id}`, {
                method: 'POST',
            })

            const data = await response.json()
            console.log('ajouter au fav', data)
        } catch (error) {
            console.error('erreur')
        }
    }

    async function suppFavorie(userid, productid) {
        try {
            await fetch(`http://localhost:5000/users/${userid}/favoris/${productid}`, {
                method: 'DELETE'
            })

            console.log('element supprimé')
        } catch (error) {
            console.error('erreur')
        }
    }


    function ajoutercom(newcom) {
        setcomments([...comments, newcom])
    }


    const list = Array.from(listeProduits)
    const filtre_search = list.filter(item => item.titre === search)
        
    

    return(
        <Cartcontext.Provider value={{
            ajouter, 
            supprimer, 
            ajoutercom, 
            comments, 
            liste, 
            setliste, 
            listeProduits, 
            setListeProduits, 
            search, 
            filtre_search, 
            setsearch,
            champ,
            setchamp,
            AjouterFavorie,
            setfavorie,
            favorie, 
            voirFav,
            setvoirFav,
            suppFavorie,
            listeFavorie, 
            setlisteFavorie,
            listeprofil,
            setlisteprofil
            }}>
            {children}
        </Cartcontext.Provider>
    )
}

export const useCart = () => useContext(Cartcontext)