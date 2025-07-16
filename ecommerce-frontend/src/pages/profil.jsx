

import { useAuth } from "../context/authcontext";
import { useEffect } from "react";
import { useState } from "react";
import { useCart } from "../context/cartcontext";
import Favori from "../components/favori";
import '../styles/profil.css'



export default function Profil() {

    const { user, image, setimage } = useAuth()
    const [email, setmail] = useState('')
    const [name, setname] = useState('')
    const {voirFav, setvoirFav, setlisteprofil} = useCart()
    const [imageFile, setimageFile] = useState(null)
    const [image2, setimage2] = useState(null)
    

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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setimageFile(file);
        setimage2(URL.createObjectURL(file)); 
    };


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
        <div className="profil-page" style={{paddingTop: '4rem'}}>
            
            <h3>voulez vous modifier votre identifiant ou votre mail ?</h3>
            {!user ? (<p className="not-connect">vous devez vous connecté ou vous inscrire</p>) :
            (
            <>

                <section className="profil-header">
                    <h2>Bonjour, {user.name}</h2>
                    <p>
                        Bienvenue sur votre profil. Ici, vous pouvez modifier votre pseudo,
                        adresse mail, et photo de profil.
                    </p>
                </section>

            <form onSubmit={handlesubmit} className="profil-form">
                
                <label>Pseudo actuel : {user.name}</label>        
                <input 
                onChange={(e)=>setname(e.target.value)} 
                type="text" 
                value={name}
                placeholder="changer mon pseudo"
                />

                <label>Adresse mail actuelle : {user.email}</label>
                <input 
                onChange={(e)=>setmail(e.target.value)} 
                type="text" 
                value={email}
                placeholder="changer mon adresse mail"
                />
            
                <button type="submit" className="btn-submit">modifier</button>               
            </form>
            <br />
            
            <div className="profil-photo">
                <h3>Photo de profil</h3>

                {image2 ? (
                    <img src={image2} alt="Prévisualisation" className="profil-img" />
                ) : image ? (
                    <img src={`http://localhost:5000/uploads/${image}`} alt="Image actuelle" className="profil-img" />
                ) : (
                    <p>Pas de photo actuellement</p>
                )}
                  
                <form onSubmit={handleImage} encType="multipart/form-data">
                    <input type="file"
                    onChange={handleImageChange}
                    />
                    <button type="submit">changer sa photo</button>
                </form>
            </div>
             
            <br />

            <div className="profil-favoris">
                <h2>Liste favori : </h2>
                <button onClick={()=>setvoirFav(true)}>voir ma liste de favorie</button>
                {voirFav && <Favori/>}
            </div>

            <br /><br />
            </> 
               )
            }
        </div>
    )

}