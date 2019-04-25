import React, { Component } from 'react'
import '../home/home.css'
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config'
import HeroImage from '../components/elements/HeroImage/Heroimage'
import SearchBar from '../components/elements/SearchBar/SearchBar'
import FourColGrid from '../components/elements/FourColGrid/FourColGrid'
import MovieThumb from '../components/elements/MovieThumb/MovieThumb'
import LoadMoreBtn from '../components/elements/LoadMoreBtn/LoadMoreBtn'
import Spinner from '../components/elements/Spinner/Spinner'

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  }

  componentDidMount() {
    this.setState({ loading: true })
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    this.fetchItems(endpoint)
  }

  searchItems = searchTerm => {
    //this is for search option

    let endpoint = ''
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })
    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`
    }
    this.fetchItems(endpoint)
  }

  loadMoreItems = () => {
    let endpoint = ''
    this.setState({ loading: true })

    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1} `
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.setState.searchTerm}&page=${this.setState.currentPage + 1}`
    }
    this.fetchItems(endpoint) //this will fetch next items when the page gets loaded.
  }

  fetchItems = endpoint => {
    const { movies, heroImage } = this.state
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        console.log(result)
        this.setState({
          movies: [...movies, ...result.results],
          heroImage: heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        })
      })
  }

  render() {
    return (
      <div className="rmdb-home">
        {this.state.heroImage ? ( //this function will check for hero image existance
          <div>
            <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`} title={this.state.heroImage.original_title} text={this.state.heroImage.overview} />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid ">
          <FourColGrid header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'} loading={this.state.loading}>
            {this.state.movies.map((element, i) => {
              return (
                <MovieThumb
                  key={i}
                  clickable={true}
                  image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                  movieId={element.id}
                  movieName={element.original_title}
                />
              )
            })}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null}
          {this.state.currentPage <= this.state.totalPages && !this.state.loading ? <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : null}
        </div>
        s
      </div>
    )
  }
}

export default Home
