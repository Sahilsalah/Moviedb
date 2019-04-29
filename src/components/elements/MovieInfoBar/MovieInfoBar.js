import React from 'react'
import './MovieInfoBar.css'
import { calcTime, convertMoney } from '../../../helpers'

const MovieInfoBar = props => {
  return (
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <span className="rmdb-movieinfobar-info ">
            <i class="far fa-clock" />
            Total Running Time :{calcTime(props.time)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <span className="rmdb-movieinfobar-info ">
            <i class="far fa-money-bill-alt" />
            Total Budget : {convertMoney(props.budget)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <span className="rmdb-movieinfobar-info ">
            <i class="fas fa-ticket-alt" />
            Box Office :{convertMoney(props.revenue)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieInfoBar
