import React from 'react';
import { 
  Container,
  Form,
  Row,
  Col,
  Button,
  Spinner,
} from 'react-bootstrap';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchResults from './SearchResults'
import NoResultsMessage from './NoResultsMessage'

const baseUrl = 'https://api.github.com/search/repositories?'

const Search = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [searchInProgress, setSearchInProgress] = useState(false)
  // const history = useHistory();


  const search = async (event) => {
    event.preventDefault();
    setSearchInProgress(true);
    setHasSearched(true);
    const paramsObj = { q: searchTerm }
    // const paramsObj = { q: searchTerm, per_page: 100, page: 5 }
    const params = new URLSearchParams(paramsObj)
    const response = await axios.get(`${baseUrl}${params.toString()}`)
    if (response?.data?.items) {
      console.log('wow!', response.data.items[0])
      setSearchResults(response.data.items)
    }
    setSearchInProgress(false);
  }

  // const goToDetails = (owner, repo) => {
  //   history.push(`/details/${owner}/${repo}`)
  // }


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
            {/* <Col sm={9}>
              <Form.Label column sm={3}>Sort By</Form.Label>
              <Form.Select 
                value={sortKey} 
                className="d-inline-flex"
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="bestMatch">Best Match (default)</option>
                <option value="stars">Stars</option>
              </Form.Select>
            </Col> */}
            <Col xs="auto" className="my-1">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
        { searchInProgress ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : searchResults.length > 0 ? (
          <SearchResults searchResults={searchResults} />
        ) : (
          <NoResultsMessage hasSearched={hasSearched} />
        )}

        {/* { searchResults.length > 0 ? (
          <SearchResults searchResults={searchResults} />
        ) : (
          <NoResultsMessage hasSearched={hasSearched} />
        )} */}
     </Container>
  )
}

export default Search;