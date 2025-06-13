

export default function Commentitem({comment}) {

    return (
        <div>
            <h1>{comment.name}</h1>
            <p>{comment.text}</p>
            <h3>{comment.date}</h3>
        </div>
    )
}