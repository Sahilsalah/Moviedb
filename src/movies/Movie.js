import React, { Component } from 'react'
import { API_URL, API_KEY } from '../config'
import Navigation from '../components/elements/Navigation/Navigation'
import MovieInfo from '../components/elements/MovieInfo/MovieInfo'
import MovieInfoBar from '../components/elements/MovieInfoBar/MovieInfoBar'
import FourColGrid from '../components/elements/FourColGrid/FourColGrid'
import Actor from '../components/elements/Actor/Actor'
import Spinner from '../components/elements/Spinner/Spinner'
import './movies.css'

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })
    //Fetching the movie first
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`

    this.fetchItems(endpoint)
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        console.log(result)

        if (result.status_code) {
          this.setState({ loading: false })
        } else {
          this.setState({ movie: result }, () => {
            //fetching actors, callback function
            const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                const directors = result.crew.filter(member => member.job === 'Director')

                this.setState({
                  actors: result.cast,
                  directors,
                  loading: false
                })
              })
          })
        }
      })
      .catch(error => console.error('Error:', error))
  }

  render() {
    return (
      <div className="rmdb-movie">
        <Navigation />
        <MovieInfo />
        <MovieInfoBar />
        <Spinner />
      </div>
    )
  }
}

export default Movie