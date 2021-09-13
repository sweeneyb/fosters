import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import {
    useParams
  } from "react-router-dom";


export default function Cats() {
  let { catId } = useParams();
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState(null)
  const [details, setDetails] = useState(null)
  // const [username, setUsername] = useState(null)
  // const [website, setWebsite] = useState(null)
  // const [avatar_url, setAvatarUrl] = useState(null)
 
  useEffect(() => {
    getCat()
  }, [catId])

  useEffect(() => {
    getCatDetails()
  }, [catId])

  async function getCat() {
    try {
        setLoading(true)
        const user = supabase.auth.user()
        console.log("getting cat")
        let { data, error, status } = await supabase
          .from('Cats')
          .select(`id, name, photo_url`)
          .eq('id', catId)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          console.log(data)
          setCat(data)
          
        }
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
  }

  async function getCatDetails() {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      console.log("getting cat")
      let { data, error, status } = await supabase
        .from('catDetails')
        .select(`id,note, weight, Cats ( name )`)
        .eq('cat', catId)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        console.log(data)
        setDetails(data)
        
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="form-widget">
        Hi, I'm a cat detail.

        { cat ? (<h2>{cat.name}</h2>) : (<p>foo</p>)}
        { details ?  ( 
      
           details.map ((detail) =>
           <li key={detail.id}> {detail.weight ? (detail.weight +"grams.")  : (null) }   {detail.note} </li>
         ) ): ( 
           <p>no details!</p>
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