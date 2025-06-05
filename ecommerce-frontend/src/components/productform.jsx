


import { useState } from "react";
import { useAuth } from "../context/authcontext";

export default function Productform() {

    const [titre, settitre] = useState('')
    const [description, setdescription] = useState('')
    const [categorie, setcategorie] = useState('')
    const [price, setprice] = useState('')
    const {authentificated, user} = useAuth()
    

    async function handlesubmit(e) {
        e.preventDefault()

        console.log("User dans Productform :", user)
        console.log("User ID :", user?._id)

        try {
            const response = await fetch('http://localhost:5000/products',
                {method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({user: user._id, titre, description, categorie, price: Number(price)})
                }
            ) 

            const data = await response.json()
            settitre('')
            setdescription('')
            setcategorie('')
            setprice('')
        } catch (error) {
            console.error('erreur de connexion')
        }
        
    }

    return (
        <div>
            {!authentificated ? <h1>vous devez vous connecter</h1> : 
            <form onSubmit={handlesubmit}>
                <input onChange={(e)=>settitre(e.target.value)} type="text" value={titre}/>
                <input onChange={(e)=>setdescription(e.target.value)} type="text" value={description}/>
                <input onChange={(e)=>setprice(e.target.value)} type="text" value={price}/>
                <select onChange={(e)=>setcategorie(e.target.value)} value={categorie}>
                    <option value="menage">ménage</option>
                    <option value="salon">salon</option>
                    <option value="jeux">jeux</option>
                    <option value="voiture">voiture</option>
                    <option value="equipement">equipement</option>
                </select>
                <button type="submit">ajouter</button>
            </form>
            }
        </div>
    )
}