

import { useState } from "react";
import { useAuth } from "../context/authcontext";
import { useParams } from "react-router-dom";



export const Formulaire = ({onnewmsg}) => {

    const [liste, setliste] = useState('')
    const {userid} = useParams()
    const {user} = useAuth()

    async function handlesubmit(e) {
        e.preventDefault()

        if (liste.length !== 0) {

            try {
            const response = await fetch(`http://localhost:5000/message/${user._id}/${userid}`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({text: liste})
            })

            await response.json()
            setliste('')
            onnewmsg && onnewmsg(e)
        } catch (error) {
            console.error('erreur')
            }
        }
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <input value={liste} type="text" onChange={(e)=>setliste(e.target.value)}/>
                <button type="submit">envoyer</button>
            </form>
        </div>
    )
}