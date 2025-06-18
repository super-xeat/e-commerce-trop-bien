
import { useCart } from "../context/cartcontext"
import { useEffect } from "react"
import { useAuth } from "../context/authcontext"
import Productcard from "./productcard"


export const Panier = () => {

    const {liste, setliste, supprimer, ajouter} = useCart()
    const {user} = useAuth()


    useEffect(()=> {
        async function panier() {
            console.log("🧠 Utilisateur courant dans Panier.jsx:", user?._id);
            if (!user || !user._id) {
                return <p>vous devez vous connecté</p>}

            try {
                const response = await fetch(`http://localhost:5000/panier/${user._id}`)
                const data = await response.json()

                if (data?.produits) {
                    console.log("Produits reçus du backend :", data.produits)

                    setliste(data.produits.map(prod=> ({
                        _id: prod.produit._id,
                        titre: prod.produit.titre,
                        description: prod.produit.description,
                        quantite: prod.quantite,
                        images: prod.produit.images,
                        user: prod.produit.user
                    })))
                }
            } catch (error) {
                console.error('erreur')
            }
        }
        panier()
    }, [user])


    return (
        <div>
            {!user ? (<p>veuillez vous connectez</p>) : 
            ( 
            <>
                <h2>votre panier</h2>
                {liste.length === 0 ? 
                (<p>votre panier est vide</p>) :
                (<ul>
                    {liste.map((item, index) => (
                        <li key={item._id || index}>
                            <Productcard produit={item}/>
                            <p>quantité actuelle: {item.quantite}<button onClick={()=>ajouter(item)}>+</button></p>
                            <button onClick={()=>supprimer(item._id)}>supprimer</button>
                        </li>
                    ))}
                </ul>)}
            </>
            )}
        </div>
    )

}

