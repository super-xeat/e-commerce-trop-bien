

import { useContext, useState, createContext } from "react";

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    const [authentificated, setauthentificated] = useState(false)
    const [user, setuser] = useState(null)
    const [token, settoken] = useState('')

    const [loading, setloading] = useState(true)


    async function login( email, password) {
        try {
            setloading(true)
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })

            const data = await response.json()
            console.log("Données reçues après login :", data);

            if (!response.ok) {
                console.error('erreur')
                setloading(false)
                return
            }
            setuser(data.user)
            settoken(data.token)
            setauthentificated(true)
            return data.user
            
        } catch (error) {
            console.error('erreur')
        } finally {
            setloading(false)
        } 
    }


    async function register({name, email, password}) {
        try {
        setloading(true)
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({name, email, password})
        })

        const data = await response.json()
        if (!response.ok) {
            console.error('Erreur serveur:', data.message || data);
            setloading(false)
            return;
          }
      
        console.log('vous etes connecté')
        setauthentificated(true)
        setuser(data.user);
        settoken(data.token);

        
        
        } catch (error) {
            console.error('erreur')
        } finally {
            setloading(false)
        }
    }

    function logout() {
        setuser(null)
        settoken(null)
        setauthentificated(false)
    }

    

    return (
        <AuthContext.Provider value={{ user, token, setauthentificated, authentificated, login, logout, register, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);