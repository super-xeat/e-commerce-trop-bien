
import { useState } from "react";
import { useAuth } from "../context/authcontext";
import usecard from "../context/cartcontext";
import { useParams } from "react-router-dom";


export default function Commentaireform() {

    const [autor, setautor] = useState('')
    const [texte, settexte] = useState('')
    const {authentificated} = useAuth()
    const {ajoutercom, setcomments} = usecard()
    const {id} = useParams()

    // faire un appel fetch pour envoyer le com
    async function soumettre_com(e) {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/comments/${id}`,{
                method : 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({name: autor, text: texte, product: id})

            }) 
            const data = await response.json()
            setcomments(data)
            setautor('')
            settexte('')

        } catch (error) {
            console.error('erreur')
        }
        
    }

    return (
        <div>
            {!authentificated ? <p>vous devez vous connectez pour commenter</p> :
            <form onSubmit={soumettre_com}>
                <input onChange={(e)=>setautor(e.target.value)} value={autor} type="text"/>
                <input onChange={(e)=>settexte(e.target.value)} value={texte} type="text"/>
                <button type="submit">soumettre</button>
            </form>
            }
        </div>
    )
}