import React from 'react'
import { 
  Container,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  FloatingLabel,
} from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import SearchResults from './SearchResults'
import NoResultsMessage from './NoResultsMessage'

const baseUrl = 'https://api.github.com/search/repositories?'

const Search = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [sortKey, setSortKey] = useState('bestMatch')
  const [hasSearched, setHasSearched] = useState(false)
  const [searchInProgress, setSearchInProgress] = useState(false)

  const search = async (event) => {
    event.preventDefault()
    setSearchInProgress(true)
    setHasSearched(true)
    const paramsObj = { q: searchTerm }
    if (sortKey !== 'bestMatch') {
      paramsObj.sort = sortKey
    }
    const params = new URLSearchParams(paramsObj)
    const response = await axios.get(`${baseUrl}${params.toString()}`)
    if (response?.data?.items) {
      setSearchResults(response.data.items)
    }
    setSearchInProgress(false)
  }

  return(
      <Container className="search">
        <Form onSubmit={search}>
          <Row className="align-items-center my-3">
            <Col sm={{span: 4, offset: 2}} className="my-1">
              <FloatingLabel controlId="searchLabel" label="Search Term">
                <Form.Control 
                  placeholder="Search all public repos on Github" 
                  value={searchTerm} 
                  onInput={e => setSearchTerm(e.target.value)} 
                />
              </FloatingLabel>
            </Col>
            <Col sm={4} className="my-1">
              <FloatingLabel controlId="sortByLabel" label="Sort By">
                <Form.Select 
                  value={sortKey} 
                  className="d-inline-flex"
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="bestMatch">Best Match (default)</option>
                  <option value="stars">Stars</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col sm={2} className="my-1">
              <Button type="submit" disabled={searchTerm.length === 0}>Submit</Button>
            </Col>
          </Row>
        </Form>
        { searchInProgress ? (
          <Container className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        ) : searchResults.length > 0 ? (
          <SearchResults searchResults={searchResults} />
        ) : (
          <NoResultsMessage hasSearched={hasSearched} />
        )}
     </Container>
  )
}

export default Search