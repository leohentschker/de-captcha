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

export default class DeCAPTCHA extends Component {

  constructor(props) {
    super(props)
    this.state = {
      validationKeys: [],
      numCorrect: 0,
      multihash: '',
      label: '',
    }

    this.submitLabel = this.submitLabel.bind(this)
    this.flagImage = this.flagImage.bind(this)
    this.getImage = this.getImage.bind(this)
  }

  componentDidMount() {
    this.getImage()
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
    .then(() => this.setState({ label: '' }))
    .then(() => this.getImage())
  }

  flagImage() {
    api.flagImage(this.state.multihash)
      .then(() => swal(
        'We\'re sorry you had to see that!',
        'We\'ve stopped showing the image to other users and will review it manually. Thank you for making DeCAPTCHA a better place!',
        'warning',
      ))
  }

  render() {
    console.log(this.state)
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
