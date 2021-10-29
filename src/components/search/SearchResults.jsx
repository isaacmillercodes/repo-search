import React from 'react'
import { 
  Container,
  Card,
  Row,
  Col,
} from 'react-bootstrap'
import Select from 'react-select'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SearchResults = ({ searchResults }) => {
  const history = useHistory()
  const [resultsToDisplay, setResultsToDisplay] = useState(searchResults)
  const allLanguages = [ ...new Set(searchResults.map(repo => repo.language))].filter(language => language !== null && language !== undefined)
  const languageOptions = allLanguages.map(language => {
    const option = { value: language, label: language }
    return option
  })
  const goToDetails = (owner, repo) => {
    history.push(`/details/${owner}/${repo}`)
  }

  const filterByLanguage = newLanguages => {
    if (!newLanguages.length) {
      setResultsToDisplay(searchResults)
    } else {
      const languageList = newLanguages.map(option => option.value)
      setResultsToDisplay(searchResults.filter(repo => languageList.includes(repo.language)))
    }
  }

  return(
    <Container className="search-results">
      <Row className="align-items-center">
        <Col sm={4} className="my-1">
          <Select
            defaultValue={[]}
            isMulti
            name="languageFilter"
            options={languageOptions}
            onChange={filterByLanguage}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Filter by language"
            size={1}
          />
        </Col>
      </Row>
      { resultsToDisplay.length > 0 && resultsToDisplay.map(repo => 
        <Card 
          key={repo.id} 
          onClick={() => goToDetails(repo.owner.login, repo.name)}
          className="search-results-card my-3"
          bg="light"
          text="dark"
        >
          <Card.Body>{ repo.name } by {repo.owner.login} ({ repo.language }, {repo.stargazers_count})</Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default SearchResults