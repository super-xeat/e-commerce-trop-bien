
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Commentlist from "./commentlist";
import Commentaireform from "./commentform";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";



export default function Productdetail() {

    const [prod, setprod] = useState(null)
    const [loading, setloading] = useState(true)
    const {id}  = useParams()
    const {user, token} = useAuth()
    const navigate = useNavigate()
    
    

    function supprimerAdmin(id) {
    console.log("ID du produit à supprimer :", id);
    console.log("Token :", token);

    if (!user || user.role !== 'admin') {
        console.warn("Action interdite : seuls les admins peuvent supprimer.");
        return;
    }

    fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async res => {
        if (res.ok) {
            alert('Produit supprimé');
            navigate('/');
        } else {
            const errorData = await res.json();
            console.error("Erreur serveur", res.status, errorData);
            alert(`Erreur ${res.status} : ${errorData.message || 'Erreur inconnue'}`);
        }
    })
    .catch(err => console.error("Une erreur s'est produite", err));
}

    
    useEffect(() => {
        async function fetchProduct() {
        try {
            const res = await fetch(`http://localhost:5000/products/${id}`);
            const data = await res.json();
            setprod(data);
        } catch (error) {
            console.error("Erreur lors du chargement du produit :", error);
        } finally {
            setloading(false);
        }
        }
    
        fetchProduct();
    }, [id]);

    if (loading) return <p>chargement</p>


    return(
        <div>
            {prod && (
            <>
                <h1>{prod.titre}</h1>
                <p>{prod.description}</p>
                <p>{prod.note}</p>
                {Array.isArray(prod.images) ? (
                    prod.images.map((item, index)=> (
                        <img key={index} src={`http://localhost:5000/uploads/${item}`} style={{ width:'100px', height: 'auto'}}/>))) : 
                        prod.images ? (<img src={`http://localhost:5000/uploads/${prod.images}`} style={{ width:'100px', height: 'auto'}}/>) :
                        (<p>pas d'image</p>)
                    
                }
                {user && user.role === 'admin' && <button onClick={()=>supprimerAdmin(prod._id)}>supprimer</button>}
                <br />
                <br />
                <h2>Liste des commentaires :</h2>
                <Commentlist/>
                <br /><br />
                <h3>Ajouter un commentaire :</h3>
                <Commentaireform/>
            </>
        )}
        </div>
    )
}