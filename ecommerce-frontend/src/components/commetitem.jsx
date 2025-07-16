
import '../styles/comment.css'


export default function Commentitem({comment}) {

    return (
        <div className="comment-item">
            <h4 className="comment-author">{comment.name}</h4>
            <p className="comment-text">{comment.text}</p>
            <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
        </div>
    )
}