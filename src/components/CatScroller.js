import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import {
    useParams, useHistory
  } from "react-router-dom";
import { getCats } from '../utils/DataUtils';

  export default function Cats({ session }) {
    const [cats, setCats] = useState([])
    const [idx, setIdx] = useState(0)

    function prev() {
        if(idx == 0) {
            setIdx(cats.length-1)
        } else {
            setIdx(idx -1)
        }
    }

    function next() {
        setIdx( (idx+1)%cats.length)
    }

   
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

        <br />
        <a className="button" onClick={prev}>prev</a>
        <a className="button" onClick={next}>next</a>

        </div>
    )
}