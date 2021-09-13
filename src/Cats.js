import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './Avatar'

export default function Cats({ session }) {
  const [loading, setLoading] = useState(true)
  const [cats, setCats] = useState(null)
  // const [username, setUsername] = useState(null)
  // const [website, setWebsite] = useState(null)
  // const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('Cats')
        .select(`id, name, photo_url`)
        // when there's a concept of ownership, this will probably be needed
        //.eq('id', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        console.table(data)
        setCats(data)
        
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  // this shoud be passed in
  let size = 150;

  return (

    <div className="form-widget">
    { cats ?  ( 
      
      cats.map ((cat) =>
      <li key={cat.id}> {cat.name} </li>
    ) ): ( 
      <p>no cats!</p>
    )}
      {/* {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div> */}

    </div>
  )
}