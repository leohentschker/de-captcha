// external
import React from 'react'
import PropTypes from 'prop-types'

// internal
import ImageContainer from './ImageContainer'
import SubmissionBar from './SubmissionBar'

import './DeCAPTCHA.scss'

const DeCAPTCHA = props => (
  <div className="de-captcha">
    <ImageContainer
      multihash={props.multihash}
    />
    <SubmissionBar
      getImage={props.getImage}
    />
  </div>
)

DeCAPTCHA.propTypes = {
  getImage: PropTypes.func.isRequired,
  multihash: PropTypes.string,
}

DeCAPTCHA.defaultProps = {
  multihash: '',
}

export default DeCAPTCHA
