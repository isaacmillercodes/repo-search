import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
// import { 
//   Container,
// } from 'react-bootstrap'
import Search from './components/search/Search'
import Details from './components/details/Details'


const App = () => {
  return(
    <Router>
      <Switch>
        <Route path="/details/:owner/:repo">
          <Details />
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch>
    </Router>
    //   <Container className="App">
    //     <Search />
    //  </Container>
  )
}

export default App