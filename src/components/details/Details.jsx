import React from 'react'
import { 
  Container,
  Card,
  Spinner,
  Row,
  Col,
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const baseUrl = 'https://api.github.com/repos'

const Details = () => {
  const { owner, repo } = useParams()
  const [fetchingDetails, setFetchingDetails] = useState(false)
  const [details, setDetails] = useState(null)

  const getRepo = useCallback(async () => {
    setFetchingDetails(true)
    const response = await axios.get(`${baseUrl}/${owner}/${repo}`)
    console.log('details response!', response.data)
    if (response.data) {
      setDetails(response.data)
    }
    setFetchingDetails(false)
  }, [owner, repo])

  useEffect(() => {
    if (owner && repo) {
      getRepo()
    }
  }, [owner, repo, getRepo])




  return(
      <Container className="details mt-3">
        { fetchingDetails || !details ? (
          <Container className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        ) : (
          <Card>
            <Card.Header>{details.owner.login} - { details.name }</Card.Header>
            <Card.Body>
              <Row>
                <Col sm="auto" className="d-inline">
                  {details.stargazers_count}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill mb-1 ms-1" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                </Col>
                <Col sm={9}>
                  { details.description } - ({ details.language })
                </Col>
              </Row>
              <a className="mt-2" href={details.html_url}>Check it out on Github</a>
            </Card.Body>
          </Card>
        )}
     </Container>
  )
}

export default Details