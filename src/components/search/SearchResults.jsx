import React from 'react';
import { 
  Container,
  Card,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';


const SearchResults = ({ searchResults }) => {
  const history = useHistory();
  const [resultsToDisplay, setResultsToDisplay] = useState(searchResults);
  const [sortKey, setSortKey] = useState('bestMatch')
  const [filterLanguages, setFilterLanguages] = useState([]);
  const allLanguages = [ ...new Set(searchResults.map(repo => repo.language))].filter(language => language !== null && language !== undefined);

  const goToDetails = (owner, repo) => {
    history.push(`/details/${owner}/${repo}`)
  }

  const updateLanguagesForFilter = event => {
    console.log('filterLanguages', filterLanguages)
    console.log('updateLanguagesForFilter!', event.target.value)

    const languageIndex = filterLanguages.indexOf(event.target.value)
    if (languageIndex > -1) {
      setFilterLanguages(filterLanguages.splice(languageIndex, 1))
    } else {
      const newLanguages = [ ...filterLanguages, event.target.value ]
      setFilterLanguages(newLanguages)
    }    
  }

  const filterByLanguage = useCallback(() => {
    if (!filterLanguages.length) {
      setResultsToDisplay(searchResults)
    } else {
      setResultsToDisplay(searchResults.filter(repo => filterLanguages.includes(repo.language)))
    }
  }, [filterLanguages, searchResults])

  const sortRepos = useCallback(() => {
    if (sortKey === 'stars') {
      return resultsToDisplay.sort((a, b) => b.stargazers_count - a.stargazers_count)
    }
  }, [sortKey, resultsToDisplay])

  useEffect(() => {
    filterByLanguage();
  }, [filterLanguages, filterByLanguage])

  useEffect(() => {
    sortRepos();
  }, [sortKey, sortRepos])

  return(
    <Container className="search-results">
      <Row className="align-items-center">
        <Col sm={3} className="my-1">
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Sort By</Form.Label>
            <Col sm={9}>
              <Form.Select 
                value={sortKey} 
                className="d-inline-flex"
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="bestMatch">Best Match (default)</option>
                <option value="stars">Stars</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Col>
        <Col xs="auto" className="my-1">
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Filter By Language</Form.Label>
            <Col sm={9}>
              <Form.Select
                value={filterLanguages}
                onChange={updateLanguagesForFilter}
                multiple
              >
                { allLanguages.map((language, index) => 
                  <option key={index} value={language}>{language}</option>
                )}
              </Form.Select>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      { resultsToDisplay.length > 0 && resultsToDisplay.map(repo => 
        <Card key={repo.id} onClick={() => goToDetails(repo.owner.login, repo.name)}>
          <Card.Body>{ repo.id } - { repo.name } - { repo.stargazers_count } - { repo.language } </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default SearchResults;