import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import {
    useParams, useHistory
  } from "react-router-dom";


export default function CatAddDetails() {
  let { catId } = useParams();
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState(null)
  const [details, setDetails] = useState(null)
  // const [username, setUsername] = useState(null)
  // const [website, setWebsite] = useState(null)
  // const [avatar_url, setAvatarUrl] = useState(null)

  const weightInput = useRef(null)
  const notesInput = useRef(null)
  const history = useHistory()
 
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

  function isEmpty(str)
{
  // checking the string using ! operator and length
  // will return true if empty string and false if string is not empty
    return (!str || str.length === 0 );
}

  async function submitNote(e) {
    e.preventDefault()
    console.log("submit hit!")
    console.log(weightInput.current.value)
    if( isEmpty(weightInput.current.value) && isEmpty(notesInput.current.value) ) {
      return;
    }
    const { data, error } = await supabase
      .from('catDetails')
      .insert([
       { cat: catId, weight: weightInput.current.value, note: notesInput.current.value }
       ])
    console.log(data, error)
    history.push("/scroll/"+catId)
  }

  return (

    <div className="form-widget">
        Hi, I'm a cat detail.

        { cat ? (<section><h2>{cat.name}</h2>
         <p><input id="weight" type="number" name="weight" placeholder="weight" style={{"width": "25%"}} ref={weightInput}></input> grams</p>
         <p>Notes:<br/> <textarea id="notes" name="notes" style={{"width": "25%", "color":"#000000"}} rows={4} ref={notesInput}></textarea></p>
         <a className="button" onClick={submitNote}>Record</a></section>) : (<p>foo</p>)}
        
    </div>
  )
}