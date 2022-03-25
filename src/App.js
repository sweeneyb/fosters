import './index.css'
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import Cats from './Cats'
import CatDetails from './CatDetail'
import CatAddDetails from './components/CatAddDetail'
import CatScroller from './components/CatScroller'
import CatDetailComponent from './components/CatDetailComponent'
import AddCat from './components/AddCat'
import CatPicker from './components/CatPicker'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Router>
      <div>
        <nav>
          <ul style={{display: "flex", displayDirection: "row", flexWrap: "wrap", listStyle: "none"}}>
            <li style={{padding: "5px"}}>
              <Link to="/">Home</Link>
            </li>
            <li style={{padding: "5px"}}>
              <Link to="/Login">Login</Link>
            </li>
            {/* <li>
              <Link to="/scroll">Scroll Cats</Link>
            </li> */}
            <li style={{padding: "5px"}}>
              <Link to="/addCat">Add Cat</Link>
            </li>
            {/* <li>
              <Link to="/pick">Pick Cat</Link>
            </li> */}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/cats">
            <Cats />
          </Route>
          <Route path="/scroll/:catId?">
            <CatScroller>
              <CatDetailComponent/>
            </CatScroller>
          </Route>
          <Route path="/details/:catId/add">
            <CatAddDetails/>
          </Route>
          <Route path="/details/:catId">
          <CatDetails />
          </Route>
          <Route path="/addCat">
            <AddCat />
          </Route>

          <Route path="/Login">
            <div className="container" style={{ padding: '50px 0 100px 0' }}>
              {!session ? <Auth /> : <div><Account key={session.user.id} session={session} /> </div>}
            </div>
          </Route>

          <Route path="/">
            <CatPicker />
          </Route>
        </Switch>
      </div>
    </Router>
    
  )
}