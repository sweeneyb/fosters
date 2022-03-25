import { useState, useEffect, Children, cloneElement, Fragment } from 'react'
import {
    useParams, useHistory
  } from "react-router-dom";
import { getCats } from '../utils/DataUtils';
import Avatar from '../Avatar';

  export default function Cats() {
    const [cats, setCats] = useState([])
   
    useEffect(() => {
        getCats().then(data => setCats(data))
      }, [])

    return (
        <div style={{display: "flex", displayDirection: "row", flexWrap: "wrap"}}>
        { cats.length > 0 ? (
            cats.map(cat =>
                <a href={"/scroll/"+cat.id} style={{padding: "10px"}}>
                {cat.name}
                <Avatar
                url={cat.photo_url}
                size={150}
                onUpload={()=>{}}
                disableUpload={true}
              /> 
              </a>
            )
        )

        :
        <Fragment/>
        // props.children
        }

        </div>
    )
}