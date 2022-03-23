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
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cats">Cats</Link>
            </li>
            <li>
              <Link to="/scroll">Scroll Cats</Link>
            </li>
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

          <Route path="/">
            <div className="container" style={{ padding: '50px 0 100px 0' }}>
              {!session ? <Auth /> : <div><Account key={session.user.id} session={session} /> </div>}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
    
  )
}