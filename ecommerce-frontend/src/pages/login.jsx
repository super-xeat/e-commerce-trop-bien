
import { useState } from "react"
import { useAuth } from "../context/authcontext"



export default function Login() {


    const {login} = useAuth()
    const [email, setmail] = useState('')
    const [password, setpassword] = useState('')

    async function submit_login(e) {
        e.preventDefault()
        await login({email, password})
    }
    
    return(
        <div>
            <form onSubmit={submit_login}>
                <input onChange={(e)=>setmail(e.target.value)} type="text" value={email}/>
                <input onChange={(e)=>setpassword(e.target.value)} type="text" value={password}/>
                <button type="submit">envoyer</button>
            </form>
        </div>
    )
}