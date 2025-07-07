

import { useState } from "react";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import '../styles/register.css'



export default function Register() {


    const {register, image, setimage} = useAuth()
    const [email, setmail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')
    const [message, setmessage] = useState('')
    const [comfirm, setcomfirm] = useState('')
    const [step, setstep] = useState(1)
    const [code, setcode] = useState('')
    const [champ, setchamps] = useState(false)
    
    
        async function submit_register(e) {
            e.preventDefault()
            if (password !== comfirm) {
                setmessage('erreur de comfirmation')
                alert('mauvais mot de passe')
                return console.log('erreur de mot de passe')
                
            }
            await register({name, email, password, comfirm, image})
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
        <div className="conteneur-register" style={{paddingTop: '3rem'}}>
            <br />
                  
            <h1>bienvenue sur notre page d'inscription :</h1>
            <br />
            <br />
            <br />
            {step === 1 ? 
            (
            <div className="register">
            <form onSubmit={submit_register}>
                <h3>entrer un identifiant :</h3>
                <input onChange={(e)=>{setname(e.target.value); setchamps(true)}} value={name} placeholder="name" />

                <h3>entrer une adresse mail valide :</h3>
                <input onChange={(e)=>setmail(e.target.value)} value={email} placeholder="email"/>

                <h3>saisisser un mot de passe :</h3>
                <input onChange={(e)=>setpassword(e.target.value)} 
                value={password} 
                placeholder="mot de passe"
                type="password"/>

                <h5>comfirmez le mot de passe :</h5>
                <input onChange={(e)=>setcomfirm(e.target.value)} 
                value={comfirm} 
                placeholder="comfrmer votre mot de passe" 
                type="password"/>

                <h3>choisir une photo (pas obligatoire)</h3>
                <input onChange={(e)=>setimage(e.target.files[0])} type="file"/>


                <button type="submit">soumettre</button>
            </form>           
            </div> 
            
        )
            : step === 2 ? (
                <form onSubmit={handlesubmit}>
                    <input onChange={(e)=>setcode(e.target.value)} value={code}/>
                    {message && <p>{message}</p>}
                    <button type="submit">soumettre</button>
                </form>
                
            ) 
            
            : (
                <h1>rendez vous sur la page de connexion : <Link to={'/login'}>page de connexion</Link></h1>
            )}
            <br />
            <br />
            <br />
            {!champ && <h2>si vous avez deja un compte cliquez <Link to={'/login'}>ici</Link></h2>}
        </div>
    )
}
