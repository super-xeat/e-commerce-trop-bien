

import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'


export default function Conversation() {
  const { userid } = useParams()
  const [users, setUsers] = useState([])
  const [loading, setloading] = useState(true)


  useEffect(() => {
    
    async function fetchData() {
      try {
      const res = await fetch(`http://localhost:5000/message/${userid}`)
      const data = await res.json()
      console.log('Réponse serveur :', data)
      setUsers(data)
    } catch (error) {
      console.error('erreur de recuperation')
    } finally {
      setloading(false)
    }
  }
  fetchData()
  }, [userid])

  if (loading) return <p>chargement...</p>

  return (
    <div>
      <h1>Conversations de l'utilisateur</h1>
      {users.length === 0 ? (
        <p>Aucune conversation trouvée.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <Link to={`/message/${user._id}/${userid}`}>
                <p><strong>Nom:</strong> {user.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
