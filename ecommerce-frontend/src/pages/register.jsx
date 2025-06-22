

import { useState } from "react";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";

export default function Register() {

    const {register} = useAuth()
    const [email, setmail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')
    const [message, setmessage] = useState('')
    const [step, setstep] = useState(1)
    const [code, setcode] = useState('')
    const [champ, setchamps] = useState(false)

    
        async function submit_register(e) {
            e.preventDefault()
            await register({name, email, password})
            setstep(2)
        }
    

    
        async function handlesubmit(e) {
        e.preventDefault()
        try {
        
        const response = await fetch('http://localhost:5000/auth/verify-code',{
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ email, code: code.trim()})
        })
        await response.json()

        if (response.ok) {
            setmessage('cest bon')
            setstep(3)
        } else {
            setmessage('cest pas bon')
        }
        
    } catch (error) {
        console.log('erreur de serveur', error)
    }}
    
    

    return (
        <div>
            {step === 1 ? (
            <form onSubmit={submit_register}>
                <input onChange={(e)=>{setname(e.target.value); setchamps(true)}} value={name} placeholder="name" />
                <input onChange={(e)=>setmail(e.target.value)} value={email} placeholder="email"/>
                <input onChange={(e)=>setpassword(e.target.value)} value={password} placeholder="mot de passe"/>
                <button type="submit">soumettre</button>
            </form>
            
            ) : step === 2 ? (
                <form onSubmit={handlesubmit}>
                    <input onChange={(e)=>setcode(e.target.value)} value={code}/>
                    {message && <p>{message}</p>}
                    <button type="submit">soumettre</button>
                </form>
                
            ) : (
                <h1>rendez vous sur la page de connexion : <Link to={'/login'}>page de connexion</Link></h1>
            )}
            
            {!champ && <h3>si vous avez deja un compte cliquez <Link to={'/login'}>ici</Link></h3>}
        </div>
    )
}
