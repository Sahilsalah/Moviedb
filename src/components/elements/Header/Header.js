import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <Link to="/">
          <img className="rmdb-logo" src="/images/Moviengine.png" alt="movie-logo" />
        </Link>
        <img className="rmdb-tmdb-logo" src="/images/tmdb_logo.png" alt="tmbd-logo" />
      </div>
    </div>
  )
}

export default Header
