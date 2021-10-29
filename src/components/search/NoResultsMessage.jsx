import React from 'react'
import { 
  Container,
} from 'react-bootstrap'


const NoResultsMessage = ({ hasSearched }) => {
  const message = hasSearched ? 'No repositories found! Try again.' : 'Enter a term above to search all public repositories on Github.'
  return(
    <Container className="no-results-msg text-center">
      <h5>{ message }</h5>
    </Container>
  )
}

export default NoResultsMessage