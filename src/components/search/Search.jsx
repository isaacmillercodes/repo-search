import React from 'react';
import { 
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://api.github.com/search/repositories?'

const Search = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])


  const search = async (event) => {
    event.preventDefault()
    const paramsObj = { q: searchTerm, per_page: 100, page: 5 }
    const params = new URLSearchParams(paramsObj)
    const response = await axios.get(`${baseUrl}${params.toString()}`)
    if (response?.data?.items) {
      setSearchResults(response.data.items)
    }

  }


  return(
      <Container className="search">
        <Form onSubmit={search}>
          <Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Control 
                id="repoSearchInput" 
                placeholder="Search Github repos" 
                value={searchTerm} 
                onInput={e => setSearchTerm(e.target.value)} 
              />
            </Col>
            <Col xs="auto" className="my-1">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
        <Container className="search-sesults">
          { searchResults.length > 0 && searchResults.map(repo => 
            <Card key={repo.id}>
              <Card.Body>{ repo.id } - { repo.name } </Card.Body>
            </Card>
          )}
        </Container>
     </Container>
  )
}

export default Search;