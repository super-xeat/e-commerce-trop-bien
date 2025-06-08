

import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { useAuth } from "../context/authcontext";



export default function Conversation() {

    const [conversation, setconversation] = useState([])
    const {user} = useAuth()


    useEffect(() => {
    if (!user || !user._id) return;

    fetch(`http://localhost:5000/message/${user._id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Réponse serveur :", data);
        if (!Array.isArray(data)) {
          console.error("Erreur : la réponse attendue est un tableau mais a reçu :", data);
          return;
        }
        const seen = new Set();
        const uniqueUsers = [];

        data.forEach((msg) => {
          const other =
            msg.user1._id === user._id ? msg.user2 : msg.user1;
          if (!seen.has(other._id)) {
            seen.add(other._id);
            uniqueUsers.push(other);
          }
        });

        setconversation(uniqueUsers);
      });
  }, [user]);


    return(
        <div>
            <h1>liste des conversation :</h1>
            <ul>
                {conversation.map(user2 => (
                    <li key={user2._id}>
                        <Link to={`/message/${user._id}/${user2._id}`}>Voir messages</Link>
                    </li>
                ))}
            </ul>

            
        </div>
    )
}