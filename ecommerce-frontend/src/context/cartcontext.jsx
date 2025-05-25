

import { useContext, createContext, useState } from "react";


const Cartcontext = createContext()

export function Cartprovider({children}) {

    const [liste, setliste] = useState([])


    function ajouter(newprod) {
        const prodexist = liste.filter(item => item.id === newprod.id)
        if (prodexist) {
            setliste(liste.map(item => item.id === newprod.id ? 
                {...item, quantite: item.quantite + 1} : item
            ))
        } else {
            setliste([...liste, {newprod, quantite : 0}])
        }
    }

    function supprimer(id) {
        setliste(liste.filter(item => item.id !== id))
    }

    return(
        <Cartcontext.Provider value={{ajouter, supprimer}}>
            {children}
        </Cartcontext.Provider>
    )
}

export default function usecard() {
    return Cartcontext(Cartprovider)
}