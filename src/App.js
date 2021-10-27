import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { 
  Container,
} from 'react-bootstrap';
import Search from './components/search/Search'


const App = () => {
  return(
      <Container className="App">
        <Search />
     </Container>
  )
}

export default App;