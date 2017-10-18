// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'

// internal
import ImageContainer from './ImageContainer'
import SubmissionBar from './SubmissionBar'

import './DeCAPTCHA.scss'


export default class DeCAPTCHA extends Component {

  static propTypes = {
    submitLabel: PropTypes.func.isRequired,
    multihash: PropTypes.string.isRequired,
    flagImage: PropTypes.func.isRequired,
    getImage: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getImage()
  }

  render() {
    return (
      <div className="de-captcha">
        {this.props.multihash ? (
          <div className="de-captcha">
            <ImageContainer
              multihash={this.props.multihash}
              getImage={this.props.getImage}
            />
            <SubmissionBar
              submitLabel={this.props.submitLabel}
              multihash={this.props.multihash}
              flagImage={this.props.flagImage}
              getImage={this.props.getImage}
            />
          </div>

        ) : (
          <div className="loading-spinner-wrapper">
            <Spinner
              name="pulse"
              color="#0D2537"
            />
          </div>
        )}
      </div>
    )
  }
}
