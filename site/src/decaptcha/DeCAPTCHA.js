// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'

// internal
import ImageContainer from './ImageContainer'
import SubmissionBar from './SubmissionBar'
import constants from './constants'
import Spinner from './Spinner'
import Api from '../Api'

const api = Api.create()

const KEYS_REQUIRED = 3

export default class DeCAPTCHA extends Component {

  static propTypes = {
    updateValidCaptcha: PropTypes.func.isRequired,

    // style props
    secondaryColor: PropTypes.string,
    primaryColor: PropTypes.string,
    fontColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  }

  static defaultProps = {
    secondaryColor: '#dadada',
    primaryColor: '#0D2537',
    fontColor: 'black',
    height: 450,
    width: 550,
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
      <div
        className="de-captcha"
        style={{
          background: this.props.secondaryColor,
          height: this.props.height,
          width: this.props.width,
          borderRadius: '3px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        }}
      >
        {this.state.multihash ? (
          <div
            className="de-captcha-content-wrapper"
            style={{
              margin: constants.MARGIN,
              height: '100%',
            }}
          >
            <div
              style={{
                height: this.props.height - (constants.SUBMISSION_BAR_SIZE + constants.MARGIN),
              }}
            >
              <ImageContainer
                multihash={this.state.multihash}
                getImage={this.getImage}
              />
            </div>
            <SubmissionBar
              secondaryColor={this.props.secondaryColor}
              primaryColor={this.props.primaryColor}
              fontColor={this.props.fontColor}
              updateLabel={label => this.setState({ label })}
              submitLabel={this.submitLabel}
              flagImage={this.flagImage}
              label={this.state.label}
            />
          </div>

        ) : (
          <Spinner />
        )}
      </div>
    )
  }
}
