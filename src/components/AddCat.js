import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Avatar from '../Avatar'

export default function Account({ session }) {
  const [userId, setUserId] = useState("foo")
  const [loading, setLoading] = useState(true)
  const [catName, setCatName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  function handleNameChange(event) {
      setCatName(event.target.value)
  }

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`id, username`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUserId(data.id)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

//   async function sendAlert( catName, guardian, photo_url ) {
//       alert(""+catName+":"+ guardian+":"+ photo_url )
//   }

  async function updateCat(catName, guardian, photo_url ) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        name: catName,
        guardian_uid: guardian,
        photo_url: photo_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('Cats').insert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
        }}
      />        
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" onChange={handleNameChange}/>
      </div>
      <div>
        <button
          className="button block primary"
        //   onClick={() => updateProfile({ username, website, avatar_url })}
          onClick={() => updateCat( catName, userId, avatarUrl )}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Add'}
        </button>
      </div>
    </div>
  )
}