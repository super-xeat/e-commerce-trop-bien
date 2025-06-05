

import { useAuth } from "../context/authcontext";
import { useEffect } from "react";
import { useState } from "react";

export default function Profil() {

    const {authentificated, user} = useAuth()
    const [email, setmail] = useState()
    const [name, setname] = useState()

    useEffect(()=> {
        if (!user || !user.id) return
        fetch(`http://localhost:5000/users/${user.id}`)
            .then(res => res.json())
            .then(data => {setmail(data.email)
                        setname(data.name)})
    }, [user])

    async function handlesubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({email, name})
            })

            const data = response.json()
            setname('')
            setmail('')

        } catch (error) {
            console.error('erreur')
        }
    }

    return (
        <div>
            {!authentificated ? (<p>vous devez vous connecté ou vous inscrire</p>) :
            (
            
            <form onSubmit={handlesubmit}>
                <input onChange={(e)=>setname(e.target.value)} type="text" value={name}/>
                <input onChange={(e)=>setmail(e.target.value)} type="text" value={email}/>
                <button type="submit">modifier</button>
            </form>)
            }
        </div>
    )

}