

import { useState, useEffect } from "react";
import { useAuth } from "../context/authcontext";
import {useParams} from "react-router-dom"

export const Messagelist = () => {

    const {user} = useAuth()
    const {user1id, user2id} = useParams()
    const [message, setmessage] = useState([])

    if (!user1id || !user2id) return <p>chargement...</p>

    useEffect(()=> {
        fetch(`http://localhost:5000/message/${user1id}/${user2id}`)
        .then(res => res.json())
        .then(data => setmessage(data))
    }, [user1id, user2id])

    return (
        <div>
            {message.length === 0 ? (
                <p>aucun message pour l'instant</p>) : 
                (<ul>
                {message.map(item=> (
                    <li key={item._id}>
                        <h1>{item.user1}</h1>
                        <h2>{item.text}</h2>
                        <h2>{item.date}</h2>
                    </li>
                ))}
            </ul>)}
        </div>
    )
}
