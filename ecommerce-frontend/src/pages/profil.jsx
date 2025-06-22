

import { useAuth } from "../context/authcontext";
import { useEffect } from "react";
import { useState } from "react";

export default function Profil() {

    const {authentificated, user} = useAuth()
    const [email, setmail] = useState()
    const [name, setname] = useState()
    const [image, setimage] = useState([])


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

    async function handleImage(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('image', image)

        try {
            const response = await fetch(`http://localhost:5000/image/${user._id}`,{
                method: 'PUT',
                body: formdata}
            )
            const data = await response.json()
            console.log(data)
            setimage(null)
        } catch (error) {
            console.error('erreur')
        }
    }

    return (
        <div>
            
            <h3>voulez vous modifier votre identifiant ou votre mail ?</h3>
            {!user ? (<p>vous devez vous connecté ou vous inscrire</p>) :
            (
            <>
            <form onSubmit={handlesubmit} className="formulaire">
                <h2>bonjours {user.name}</h2>
                <p>
                    bienvenu sur votre profil ici vous pouvez ajouter 
                    une photo de profils ou bien la changer, de mème pour 
                    votre adresse mail ou votre identifiant.
                </p>
                <input onChange={(e)=>setname(e.target.value)} 
                type="text" 
                value={name}
                placeholder="changer mon pseudo"
                />
                <br />
                <input onChange={(e)=>setmail(e.target.value)} 
                type="text" 
                value={email}
                placeholder="changer mon adresse mail"
                />
                <br />
                <button type="submit">modifier</button>               
            </form>
            <br />
            <br />
            <form onSubmit={handleImage}>
                <input type="file"
                onChange={(e)=>setimage(e.target.files)}
                value={image}/>
                <button type="submit">changer sa photo</button>
            </form>
            </> 
               )
            }
        </div>
    )

}