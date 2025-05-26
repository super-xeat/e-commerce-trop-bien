

import { useContext, useState, createContext } from "react";

const Authcontext = createContext()


export function Authprovider({children}) {

    const [authentificated, setauthentificated] = useState(false)
    const [user, setuser] = useState('')
    const [token, settoken] = useState('')


    async function login(email, password) {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/routes/login', {
                method: 'POSt',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })

            const data = await response.json()
            setuser(data.user)
            settoken(data.token)
            setauthentificated(true)

        } catch (error) {
            return res.status(500).json({message: 'erreur'})
        }
    }

    function logout() {
        setuser(null)
        settoken(null)
        setauthentificated(false)
    }

    return (
        <Authcontext.Provider value={{ user, token, authentificated, login, logout}}>
            {children}
        </Authcontext.Provider>
    )
}

export function useAuth() {
    return useContext(Authcontext)
}