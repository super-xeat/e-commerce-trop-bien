

import { useState } from "react";
import { useAuth } from "../context/authcontext";


export default function Register() {

    const {register, login, authentificated} = useAuth()
    const [email, setmail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')

    async function enregistre(e) {
        e.preventDefault()
        try {
            await register({name, email, password})
            await login(email, password)
        } catch (error) {
            return console.log('erreur', error)
        }
    }

    return (
        <div>
            {!authentificated ? <div> 
                <p>créer un compte pour vous connecté :</p> 
                <form onSubmit={enregistre}>
                    <input onChange={(e)=>setname(e.target.value)} value={name} type="text"/>
                    <input onChange={(e)=>setmail(e.target.value)} value={email} type="email"/>
                    <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password"/>
                    <button type="submit">enregistré</button>
                </form> 
            </div>: <h1>vous etes connecté !</h1>}
        </div>
    )
}
