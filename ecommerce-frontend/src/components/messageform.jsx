

import { useState, useEffect } from "react";
import io from 'socket.io-client'


export const Formulaire = ({user1id, user2id, onnewmsg}) => {

    const [liste, setliste] = useState('')
    const [socket, setsocket] = useState(null)


    useEffect(()=> {
        const connexion = io('http://localhost:5000')
        setsocket(connexion)

        return () => connexion.disconnect()
    }, [])

    async function handlesubmit(e) {
        e.preventDefault()

        if (liste.trim().length > 0) {

            try {
            const response = await fetch(`http://localhost:5000/message`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({user1: user1id,
                user2: user2id, text: liste.trim()})
            })

            
            const data = await response.json()
            if (socket) socket.emit("envoi message", data)
            setliste('')
            onnewmsg && onnewmsg(data)

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