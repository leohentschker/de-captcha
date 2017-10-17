// external
import React from 'react'
import PropTypes from 'prop-types'

// internal
import DeCAPTCHA from '../../../components/DeCAPTCHA'
import SubmitButton from './SubmitButton'
import Header from './Header'
import Footer from './Footer'
import './Home.scss'

const Home = props => (
  <div id="home">
    <Header />
    <DeCAPTCHA
      getImage={props.imageActions.getImage}
    />
    <SubmitButton
      uploadImage={props.imageActions.uploadImage}
    />
    <Footer />
  </div>
)

Home.propTypes = {
  imageActions: PropTypes.objectOf(PropTypes.func).isRequired,
}

export default Home
