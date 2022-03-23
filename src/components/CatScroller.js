import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import {
    useParams, useHistory
  } from "react-router-dom";
import { getCats } from '../utils/DataUtils';

  export default function Cats({ session }) {
    const [cats, setCats] = useState([])
    const [idx, setIdx] = useState(0)

   
    useEffect(() => {
        getCats().then(data => setCats(data))
      }, [])

    return (
        <div>
        <p>Cat scrolls</p>
        {/* {cats ? cats.map ((cat) => {
              return (
                <p>{cat.name}</p>
                    ) } 
                    ): <p>no cats</p> } */}
        

        { cats[idx] && cats[idx].name }
        </div>
    )
}