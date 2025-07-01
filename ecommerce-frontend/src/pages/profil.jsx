

import { useAuth } from "../context/authcontext";
import { useEffect } from "react";
import { useState } from "react";
import { useCart } from "../context/cartcontext";
import Favori from "../components/favori";


export default function Profil() {

    const { user, image, setimage } = useAuth()
    const [email, setmail] = useState('')
    const [name, setname] = useState('')
    const {voirFav, setvoirFav, setlisteprofil} = useCart()
    const [imageFile, setimageFile] = useState(null)

    

    useEffect(()=> {
        setlisteprofil(true)
        return ()=> setlisteprofil(false)
    }, [])

    useEffect(()=> {
        if (!user || !user._id) return
        fetch(`http://localhost:5000/users/${user._id}`)
            .then(res => res.json())
            .then(data =>               
                {
                console.log(data)
                setmail(data.email)
                setname(data.name)
                setimage(data.image)})
                    
    }, [user])

    async function handlesubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({email, name})
            })

            const data = await response.json()
            setname('')
            setmail('')

        } catch (error) {
            console.error('erreur')
        }
    }

    async function handleImage(e) {
        e.preventDefault()

        if (!imageFile) {
            console.error("Aucun fichier sélectionné !");
            return;
        }
        
        const formdata = new FormData()
        formdata.append('image', imageFile)

        

        try {
            const response = await fetch(`http://localhost:5000/users/image/${user._id}`,{
                method: 'PUT',
                body: formdata}
            )
            const data = await response.json()
            console.log(data)
            setimage(data.user.image)
            setimageFile(null)
        } catch (error) {
            console.error('erreur')
        }
    }
    console.log("Image filename:", image)

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
                <h3>votre pseudo actuelle : {user.name}</h3>
                <input onChange={(e)=>setname(e.target.value)} 
                type="text" 
                value={name}
                placeholder="changer mon pseudo"
                />
                <br />
                <h3>votre mail actuelle : {user.email}</h3>
                <input onChange={(e)=>setmail(e.target.value)} 
                type="text" 
                value={email}
                placeholder="changer mon adresse mail"
                />
                <br />
                <button type="submit">modifier</button>               
            </form>
            <br />
            
            {image ? (<img src={`http://localhost:5000/uploads/${image}`} style={{ width: '100px', height:'auto', objectFit:'cover'}}/>) :
            (<p>pas de photo actuellement</p>)}
            <br />
            <form onSubmit={handleImage} encType="multipart/form-data">
                <input type="file"
                onChange={(e)=>setimageFile(e.target.files[0])}
                />
                <button type="submit">changer sa photo</button>
            </form>
            <button onClick={()=>setvoirFav(true)}>voir ma liste de favorie</button>
            {voirFav && <Favori/>}
            </> 
               )
            }
        </div>
    )

}