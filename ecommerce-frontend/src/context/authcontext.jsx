

import { useContext, useState, createContext } from "react";

const Authcontext = createContext()


export function Authprovider({children}) {

    const [authentificated, setauthentificated] = useState(false)
    const [user, setuser] = useState('')
    const [token, settoken] = useState('')

    const [name,setname] = useState('')
    const [email, setmail] = useState('')
    const [password, setpassword] = useState('')


    async function login(email, password) {
        try {
            const response = await fetch('http://localhost:3000/routes/api/login', {
                method: 'POSt',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })

            const data = await response.json()
            setuser(data.user)
            settoken(data.token)
            setauthentificated(true)

        } catch (error) {
            console.error('erreur')
        }
    }


    async function register({name, email, password}) {
        try {
        const response = await fetch('http://localhost:3000/routes/api/register', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({name, email, password})
        })

        const data = await response.json()
        console.log('vous etes connecté')
        setauthentificated(true)
        setname('')
        setmail('')
        setpassword('')
        } catch (error) {
            console.error('erreur')
        }
    }

    function logout() {
        setuser(null)
        settoken(null)
        setauthentificated(false)
    }

    return (
        <Authcontext.Provider value={{ user, token, authentificated, login, logout, register}}>
            {children}
        </Authcontext.Provider>
    )
}

export function useAuth() {
    return useContext(Authcontext)
}