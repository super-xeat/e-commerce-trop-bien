
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Commentlist from "./commentlist";
import Commentaireform from "./commentform";


export default function Productdetail() {

    const [prod, setprod] = useState(null)
    const [loading, setloading] = useState(true)
    const {id}  = useParams()


    useEffect(() => {
        async function fetchProduct() {
        try {
            const res = await fetch(`http://localhost:3000/api/product/${id}`);
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
                <h1>{prod.title}</h1>
                <p>{prod.description}</p>
                <p>{prod.note}</p>
                <Commentlist productId={prod._id} />
                <Commentaireform/>
            </>
        )}
        </div>
    )
}