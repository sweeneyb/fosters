import { useState, useEffect, Fragment } from 'react'
import { supabase } from '../supabaseClient'
import {
    useParams
  } from "react-router-dom";
import Avatar from '../Avatar'


function getHumanTime(timestamp) {
  var date = new Date(timestamp)
  return date.toLocaleString()
}

export default function Cats(props) {
  let { name, id, photo_url } = {...props};
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState(null)
  // const [username, setUsername] = useState(null)
  // const [website, setWebsite] = useState(null)
  // const [avatar_url, setAvatarUrl] = useState(null)
 
  useEffect(() => {
    getCatDetails()
  }, [id])


  async function getCatDetails() {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      console.log("getting cat")
      let { data, error, status } = await supabase
        .from('catDetails')
        .select(`id,note, weight, Cats ( name ), updated_at, created_at`)
        .eq('cat', id)
        .order('created_at', { ascending: false })

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        console.log(data)
        setDetails(data)
        
      }
    } catch (error) {
      // alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="form-widget">
        { name ? (<section><h2>{name}</h2>
              <Avatar
                url={photo_url}
                size={150}
                onUpload={()=>{}}
                disableUpload={true}
              />  <a href={"/details/"+id+"/add"} className="button">add</a></section>) : (<p>foo</p>)}
         {
           details ? (
            <Fragment>
            <table>
              <tbody>
            <tr>
              <th style={{textAlign:"left"}}>Weight</th>
              <th style={{textAlign:"left"}}>Note</th>
              <th style={{textAlign:"left"}}>Time</th>
            </tr>
            {details.map ((detail, idx) => {

              const curWeight = detail.weight
              const prevWeight = idx == details.length-1? details[details.length-1].weight : details[idx+1].weight
              var indicatorColor = "inherit"
              if (curWeight > prevWeight) {
                indicatorColor = "#569c61"
              }
              if (prevWeight > curWeight) {
                indicatorColor = "#d93621"
              }

              return (
                <tr key={detail.id}>
                  <td style={{backgroundColor: indicatorColor}}>{detail.weight ? (detail.weight +"grams.")  : (null) }</td>
                  <td>{detail.note}</td>
                  <td>{getHumanTime(detail.created_at)}</td>
                </tr>
              )
            }
            
         )}
         </tbody>
          </table>
          </Fragment>
           ) : ( 
            <p>no details!</p>
           )
         }

    </div>
  )
}