
import { useCard } from "../context/cartcontext"
import { useEffect } from "react"
import { useAuth } from "../context/authcontext"
import Productcard from "./productcard"

export const Panier = () => {

    const {liste, setliste, supprimer} = useCard()
    const {user} = useAuth()

    useEffect(()=> {
        async function panier() {

            if (!user || !user._id) return;

            try {
                const response = await fetch(`http://localhost:5000/panier/${user._id}`)
                const data = await response.json()

                if (data?.produits) {
                    console.log("Produits reçus du backend :", data.produits)

                    setliste(data.produits.map(prod=> ({
                        _id: prod.produit._id,
                        name: prod.produit.name,
                        quantite: prod.quantite
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
            <h2>votre panier</h2>
            {liste.length === 0 ? 
            (<p>votre panier est vide</p>) :
            (<ul>
                {liste.map((item, index) => (
                    <li key={item._id || index}>
                        <Productcard produit={item}/>
                        <button onClick={()=>supprimer(item._id)}>supprimer</button>
                    </li>
                ))}
            </ul>)}
        </div>
    )

}

