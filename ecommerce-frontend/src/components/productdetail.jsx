
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Commentaireform from "./commentform";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import '../styles/productdetail.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';



export default function Productdetail() {

    const [prod, setprod] = useState(null)
    const [loading, setloading] = useState(true)
    const {id}  = useParams()
    const {user, token} = useAuth()
    const navigate = useNavigate()
    
    

    function supprimerAdmin(id) {

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
        <div style={{paddingTop: '3rem'}} className="conteneur-productdetail">
            {prod && (
            <>
                <div className="produit">
                    <h4>posté par : {prod.user?.name || "anonyme"}</h4>

                    <br />

                    <h1>{prod.titre}</h1>
                    <p>{prod.description}</p>
                    
                    <br />
                    
                    
                        {Array.isArray(prod.images) ? (
                        <div className="slide">
                            <Splide options={{
                                height: '25rem',
                                focus: 'center',
                                arrows: true,
                                pagination: true,
                                rewind: true,
                                }}
                                aria-label="Images du produit"
                                                            
                                >

                                {prod.images.map((item, index)=> (
                                <SplideSlide key={index}>
                                    <img key={index} src={`http://localhost:5000/uploads/${item}`}                           
                                    className="slide-image"
                                />
                                </SplideSlide>
                                ))}
                            </Splide>
                        </div>
                        )
                    
                     : 

                        prod.images ? (<img src={`http://localhost:5000/uploads/${prod.images}`} 
                                style={{ 
                                    width:'100%', 
                                    height: 'auto'
                                }}/>) :
                            (<p>pas d'image</p>)
                        
                    }
                    <h3>prix : {prod.price} euro</h3>
                    <h5>catégorie : {prod.categorie}</h5>
                    {user && user.role === 'admin' && <button onClick={()=>supprimerAdmin(prod._id)}>supprimer</button>}
                </div>

                <br />
                <br />

                <div className="section-commentaire">
                    <Commentaireform/>
                </div>
            </>
        )}
        </div>
    )
}