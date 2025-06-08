

import { useState, useEffect } from "react";
import { useAuth } from "../context/authcontext";
import {useParams} from "react-router-dom"
import { Formulaire } from "./messageform";


export const Messagelist = () => {

    const {user} = useAuth()
    const {user1id, user2id} = useParams()
    const [message, setmessage] = useState([])

    if (!user) return <p>Chargement de l'utilisateur...</p>;


    useEffect(()=> {
        if (!user || !user1id || !user2id) return;
        fetch(`http://localhost:5000/message/liste/${user1id}/${user2id}`)
        .then(res => res.json())
        .then(data => setmessage(data))
    }, [ user1id, user2id])

    console.log("Messages:", message);

    return (
        <div>
            {message.length === 0 ? (
                <p>aucun message pour l'instant</p>) : 
                (<ul>
                {message.map((item, index)=> (
                    <li key={item._id || index}>
                        <h1>{item.user1}</h1>
                        <h2>{item.text}</h2>
                        <h2>{new Date(item.createdAt).toLocaleString()}</h2>
                    </li>
                ))}
            </ul>)}
            <p>envoyer un message: </p>
            <Formulaire user1id={user._id} user2id={user2id} onnewmsg={(msg) => setmessage((prev) => [...prev, msg])} />
        </div>
    )
}
