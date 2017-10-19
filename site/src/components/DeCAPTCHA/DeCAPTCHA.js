// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'
import swal from 'sweetalert2'

// internal
import Api from '../../services/Api'
import ImageContainer from './ImageContainer'
import SubmissionBar from './SubmissionBar'

import './DeCAPTCHA.scss'

const api = Api.create()

const KEYS_REQUIRED = 1

export default class DeCAPTCHA extends Component {

  static propTypes = {
    updateValidCaptcha: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      validationKeys: [],
      numCorrect: 0,
      multihash: '',
      label: '',
    }

    this.extractCredentials = this.extractCredentials.bind(this)
    this.submitLabel = this.submitLabel.bind(this)
    this.flagImage = this.flagImage.bind(this)
    this.getImage = this.getImage.bind(this)
  }

  componentDidMount() {
    this.getImage()
  }

  componentDidUpdate(prevProps, prevState) {
    const prevCorrect = prevState.validationKeys.length
    const currCorrect = this.state.validationKeys.length
    if (prevCorrect < KEYS_REQUIRED && currCorrect >= KEYS_REQUIRED) {
      this.props.updateValidCaptcha(true)
    }

    if (prevCorrect >= KEYS_REQUIRED && currCorrect < KEYS_REQUIRED) {
      this.props.updateValidCaptcha(false)
    }
  }

  getImage() {
    api.getImage(this.state.numCorrect)
      .then(({ multihash }) => this.setState({ multihash }))
  }

  submitLabel() {
    if (this.state.label.length === 0) {
      return
    }

    api.submitLabel(
      this.state.multihash,
      this.state.label,
    )
    .then(({ valid, key }) => {
      if (valid) {
        this.setState({
          numCorrect: this.state.numCorrect + 1,
          validationKeys: [key].concat(this.state.validationKeys)
        })
      }
    })
    .then(() => this.setState({ label: '', multihash: '' }))
    .then(() => this.getImage())
  }

  flagImage() {
    api.flagImage(this.state.multihash)
    .then(() => swal(
      'We\'re sorry you had to see that!',
      'We\'ve stopped showing the image to other users and will review it manually. Thank you for making DeCAPTCHA a better place!',
      'warning',
    ))
    .then(() => this.getImage())
  }

  extractCredentials() {
    const keys = this.state.validationKeys.slice(0, KEYS_REQUIRED)
    const remaining = this.state.validationKeys.slice(KEYS_REQUIRED)
    this.setState({ validationKeys: remaining })
    return keys.join(':')
  }

  render() {
    return (
      <div className="de-captcha">
        {this.state.multihash ? (
          <div className="de-captcha">
            <div className="de-captcha-content-wrapper">
              <ImageContainer
                multihash={this.state.multihash}
                getImage={this.getImage}
              />
              <SubmissionBar
                updateLabel={label => this.setState({ label: label })}
                submitLabel={this.submitLabel}
                flagImage={this.flagImage}
                label={this.state.label}
              />
            </div>
          </div>

        ) : (
          <div className="loading-spinner-wrapper">
            <Spinner
              name="pulse"
              color="#0D2537"
              fadeIn="none"
            />
          </div>
        )}
      </div>
    )
  }
}
