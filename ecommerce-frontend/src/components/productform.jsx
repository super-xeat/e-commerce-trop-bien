

import { useState } from "react";
import { useAuth } from "../context/authcontext";
import '../styles/productform.css'


export default function Productform() {

    const [titre, settitre] = useState('')
    const [description, setdescription] = useState('')
    const [categorie, setcategorie] = useState('')
    const [price, setprice] = useState('')
    const [images, setimage] = useState([])
    const {authentificated, user} = useAuth()
    

    async function handlesubmit(e) { 
        e.preventDefault()

        const formData = new FormData();
        formData.append("user", user._id);
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("categorie", categorie);
        formData.append("price", price);

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i])
        }
        console.log({
            user: user._id,
            titre,
            description,
            categorie,
            price,
            images
            });

        try {
            const response = await fetch('http://localhost:5000/products',
                {
                method: 'POST',
                body: formData
                }
            ) 

            const data = await response.json()
            settitre('')
            setdescription('')
            setcategorie('')
            setprice('')
            setimage([])
        } catch (error) {
            console.error('erreur de connexion')
        }
        
    }

    const handleimage = (e) => {
        const liste = Array.from(e.target.files)

        const previews = liste.map(file => ({
            file: file,
            preview: URL.createObjectURL(file)
        }))

        setimage(previews)
    }

    return (
        <div style={{paddingTop: '4rem'}}>
            
            {!authentificated ? <h1>vous devez vous connecter</h1> : 
            (
            <form onSubmit={handlesubmit} encType="multipart/form-data">
                <h3>nommez votre produit :</h3>
                <input onChange={(e)=>settitre(e.target.value)} type="text" value={titre} placeholder="mettre un nom"/>
                <br />
                <h3>décrire le produit :</h3>
                <input onChange={(e)=>setdescription(e.target.value)} type="text" value={description} placeholder="décrivez votre produit"/>
                <br />
                <h3>Prix de votre produit :</h3>
                <input onChange={(e)=>setprice(e.target.value)} type="text" value={price} placeholder="prix"/>
                <br />

                <h3>A quel catégorie classeriez vous votre produit :</h3>
                 
                <select onChange={(e)=>setcategorie(e.target.value)} value={categorie}>
                    <option value="menage">ménage</option>
                    <option value="salon">salon</option>
                    <option value="jeux">jeux</option>
                    <option value="voiture">voiture</option>
                    <option value="equipement">equipement</option>
                </select>

                <h3>ajoutez une image (obligatoire)</h3>

                <input type="file" onChange={handleimage} multiple />
                <br />
                
                <div className="container-image">
                    {images.map((item, index) => (
                        <img 
                        key={index}
                        src={item.preview}
                        className="images-selection"/>
                    ))}
                </div>

                <button type="submit">ajouter</button>

            </form>)
            }
        </div>
    )
}