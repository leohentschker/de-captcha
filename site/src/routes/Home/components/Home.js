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
      submitLabel={props.captchaActions.submitLabel}
      multihash={props.multihash}
      getImage={props.imageActions.getImage}
    />
    <SubmitButton
      uploadImage={props.imageActions.uploadImage}
      numCorrect={props.numCorrect}
    />
    <Footer />
  </div>
)

Home.propTypes = {
  captchaActions: PropTypes.objectOf(PropTypes.func).isRequired,
  imageActions: PropTypes.objectOf(PropTypes.func).isRequired,
  numCorrect: PropTypes.number.isRequired,
  multihash: PropTypes.string,
}

Home.defaultProps = {
  multihash: '',
}

export default Home
