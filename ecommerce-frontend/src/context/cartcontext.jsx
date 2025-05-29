

import { useContext, createContext, useState } from "react";


const Cartcontext = createContext()

export function Cartprovider({children}) {

    const [liste, setliste] = useState([])
    const [comments, setcomments] = useState([])


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

    function ajoutercom(newcom) {
        setcomments([...comments, newcom])
    }

    return(
        <Cartcontext.Provider value={{ajouter, supprimer, ajoutercom, comments, liste, setliste}}>
            {children}
        </Cartcontext.Provider>
    )
}

export default function usecard() {
    return useContext(Cartcontext)
}