
import { useState } from "react"
import { useAuth } from "../context/authcontext"
import {useNavigate} from "react-router-dom"


export default function Login() {


    const {login} = useAuth()
    const navigate = useNavigate()
    const [email, setmail] = useState('')
    const [password, setpassword] = useState('')

    async function submit_login(e) {
        e.preventDefault()
        const user = await login(email, password)
        if (user && user._id) {
            navigate(`/message/${user._id}`)
        }
    }
    
    return(
        <div>
            <form onSubmit={submit_login}>
                <input onChange={(e)=>setmail(e.target.value)} type="email" value={email}/>
                <input onChange={(e)=>setpassword(e.target.value)} type="password" value={password}/>
                <button type="submit">envoyer</button>
            </form>
        </div>
    )
}