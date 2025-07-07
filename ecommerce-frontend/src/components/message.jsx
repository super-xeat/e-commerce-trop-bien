

import { useState, useEffect } from "react";
import { useAuth } from "../context/authcontext";
import {useParams} from "react-router-dom"
import { Formulaire } from "./messageform";




export const Messagelist = () => {

    const {user} = useAuth()
    const {user1id, user2id} = useParams()
    const [message, setmessage] = useState([])

    

    useEffect(()=> {
        if (!user || !user1id || !user2id) return;
        
        async function fetchdata() {
            try {
                const response = await fetch(`http://localhost:5000/message/liste/${user1id}/${user2id}`)
                const data = await response.json()
                setmessage(data)

            } catch (error) {
                console.error("erreur")
            } 
        }
        fetchdata()
    }, [user, user1id, user2id])

    

    return (
        <div>
            
                {message.length === 0 ? (
                <p>aucun message pour l'instant</p>) : 
                (<ul>
                {message.map((item, index)=> {
                    const name = item.user1._id === user._id ?  item.user1 : item.user2
                    return (
                    <li key={item._id || index}>
                        <h1>{name.name}</h1>
                        <h2>{item.text}</h2>
                        <h2>{new Date(item.createdAt).toLocaleString()}</h2>
                    </li>)
                })}
            </ul>)}
            <p>envoyer un message: </p>
            <Formulaire user1id={user._id} user2id={user2id} onnewmsg={(msg) => setmessage((prev) => [...prev, msg])} />
            
        </div>
    )
}
