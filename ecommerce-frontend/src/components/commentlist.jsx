


import usecard from "../context/cartcontext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";



export default function Commentlist() {

    const {comments, setcomments} = usecard()
    const {id} = useParams()

    useEffect(()=> {
        fetch(`http://localhost:5000/comments/${id}`)
        .then(res=> res.json())
        .then(data => setcomments(data))
    }, [id])
    
    return (
        <div>
            <ul>
                {comments.map((com)=> (
                    <li key={com.id}>
                        {com.name}
                    </li>
                ))}
            </ul>
            
        </div>
    )

}