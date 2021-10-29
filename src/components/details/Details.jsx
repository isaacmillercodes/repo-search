import React from 'react'
import { 
  Container,
  Card,
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const baseUrl = 'https://api.github.com/repos'

const Details = () => {

  const { owner, repo } = useParams()
  const [details, setDetails] = useState(null)

  const getRepo = useCallback(async () => {
    const response = await axios.get(`${baseUrl}/${owner}/${repo}`)
    console.log('details response!', response)
    if (response.data) {
      setDetails(response.data)
    }
  }, [owner, repo])

  useEffect(() => {
    if (owner && repo) {
      getRepo()
    }
  }, [owner, repo, getRepo])




  return(
      <Container className="details">
        <Card>
          <Card.Body>Details: {details ? details.toString() : 'No details yet'}</Card.Body>
        </Card>
     </Container>
  )
}

export default Details