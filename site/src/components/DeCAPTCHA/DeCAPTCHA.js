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
      getImage={props.getImage}
    />
    <SubmissionBar
      submitLabel={props.submitLabel}
      getImage={props.getImage}
      multihash={props.multihash}
    />
  </div>
)

DeCAPTCHA.propTypes = {
  submitLabel: PropTypes.func.isRequired,
  multihash: PropTypes.string.isRequired,
  getImage: PropTypes.func.isRequired,
}

export default DeCAPTCHA
