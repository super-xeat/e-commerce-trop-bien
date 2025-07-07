
import { useState, useEffect } from "react";
import { useAuth } from "../context/authcontext";
import { useParams } from "react-router-dom";
import Commentitem from "./commetitem";


export default function Commentaireform() {

    
    const [texte, settexte] = useState('')
    const {authentificated, user} = useAuth()
    const {id} = useParams()
    const [comments, setcomments] = useState([])


    useEffect(()=> {
        fetch(`http://localhost:5000/comments/${id}`)
        .then(res=> res.json())
        .then(data => setcomments(data))
    }, [id])


    async function soumettre_com(e) {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/comments/${id}`,{
                method : 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({name: user?.name , text: texte, product: id})
                
            }) 
               
            const data = await response.json()
            setcomments(prev => [...prev, data])
            settexte('')
            if (!response.ok) {
                console.log('donné pas envoyé')
            } else {
                console.log('donné envoyé')
            }
            

        } catch (error) {
            console.error('erreur')
        }
        
    }

    return (
        <div>
            <ul>
                {comments.map((com)=> (
                    <li key={com._id}>
                        <Commentitem comment={com}/>
                    </li>
                ))}
            </ul>

            {!authentificated ? <p>vous devez vous connectez pour commenter</p> :
            <form onSubmit={soumettre_com}>
                <input onChange={(e)=>settexte(e.target.value)} value={texte} type="text"/>
                <button type="submit">soumettre</button>
            </form>
            }
        </div>
    )
}