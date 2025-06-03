



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Commentitem from "./commetitem";


export default function Commentlist() {

    const [comments, setcomments] = useState([])
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
                    <li key={com._id}>
                        <Commentitem comment={com}/>
                    </li>
                ))}
            </ul>
            
        </div>
    )

}