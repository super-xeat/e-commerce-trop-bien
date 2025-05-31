

import usecard from "../context/cartcontext"
import Productcard from "./productcard"
import { useEffect } from "react"
import { useAuth } from "../context/authcontext"



export default function Panier() {

    const {liste, setliste, supprimer} = usecard()
    const {user} = useAuth()

    if (!user) {
        return <p>Veuillez vous connecter pour voir votre panier.</p>;
    }
    

    useEffect(()=> {
        async function fecthdata() {
            try {
                const response = await fetch(`http://localhost:5000/panier/${user._id}`)
                const data = await response.json()

                setliste(data)
            } catch (error) {
                console.error('erreur')
            }
        } fecthdata()
    }, [user])

    return (
        <div>
            <ul>
                {liste.map((prod)=> (
                    <li key={prod._id}>
                        <Productcard produit={prod}/> 
                        <button onClick={()=>supprimer(prod._id)}>supprimer du panier</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}