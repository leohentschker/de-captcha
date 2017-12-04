// external
import React from 'react'
import PropTypes from 'prop-types'

// internal
import DeCAPTCHA from '../../../components/DeCAPTCHA'
import './Home.scss'

const Home = props => (
  <div id="home" className="full-size">
    <div className="full-center full-size">
      <DeCAPTCHA />
    </div>
  </div>
)

export default Home
