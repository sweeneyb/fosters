import { useState, useEffect, Children, cloneElement, Fragment } from 'react'
import {
    useParams, useHistory
  } from "react-router-dom";
import { getCats } from '../utils/DataUtils';

  export default function Cats(props) {
    let { catId } = useParams();
    const [cats, setCats] = useState([])
    
    function getCatIndex() {
        if(catId == undefined) {
            return 0
        } else {
            const result = cats.findIndex( o => catId == o.id)
            if (result == -1) {
                return 0
            } else {
                return result
            }
        }

    }

    const idx = getCatIndex()
    const nextIdx = (idx+1)%cats.length
    const prevIdx = (() => {
        if(idx == 0) {
                    return cats.length-1
                } else {
                    return idx -1
                }
        })()
   
    useEffect(() => {
        getCats().then(data => setCats(data))
      }, [])

    return (
        <div>
        { cats.length > 0 ?
            <Fragment>
            <a href={"/scroll/"+cats[nextIdx].id} className="button" >prev</a>
            <a href={"/scroll/"+cats[prevIdx].id} className="button" >next</a>
            </Fragment>
            : <Fragment /> 
        }
        { cats.length > 0 ? (
            Children.map(props.children, (child) =>
             cloneElement(child,  {id : cats[idx].id, name: cats[idx].name})
            )
        )

        :
        <Fragment/>
        // props.children
        }

        </div>
    )
}