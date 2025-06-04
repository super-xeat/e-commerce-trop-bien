

import { Formulaire } from "./messageform";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const Conversation = () => {

    const [liste, setliste] = useState([])
    const {user1id, user2id} = useParams()

    useEffect(()=> {
        fetch('http://localhost:5000/message')
        .then(res => res.json())
        .then(data=> setliste(data))
    }, [user1id, user2id])

    function ajouter(newmessage) {
        setliste(prev => [...prev, newmessage])
    }

    return(
        <div>
            <ul>
                {liste.map(item => (
                    <li key={item._id}>
                        <p>{item.text}</p>                    
                    </li>
                ))}
            </ul>
            <Formulaire onnewmsg={ajouter}/>
        </div>
    )
}