import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import {
    useParams
  } from "react-router-dom";


export default function CatAddDetails() {
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

        { cat ? (<section><h2>{cat.name}</h2>
         <p><input type="number" name="weight" placeholder="weight" style={{"width": "25%"}}></input> grams</p>
         <a href="#" class="button">add</a></section>) : (<p>foo</p>)}
        
    </div>
  )
}