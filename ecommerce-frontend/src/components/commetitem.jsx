

export default function Commentitem({comment}) {

    return (
        <div>
            <h1>{comment.autor}</h1>
            <p>{comment.texte}</p>
        </div>
    )
}