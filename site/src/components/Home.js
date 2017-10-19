// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'

// internal
import DeCAPTCHA from '../decaptcha'
import SubmitButton from './SubmitButton'
import Api from '../Api'
import Header from './Header'
import Footer from './Footer'
import './Home.scss'

const api = Api.create()

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      enableSubmit: false,
    }

    this.uploadImage = this.uploadImage.bind(this)
  }

  uploadImage(image) {
    // upload the image to the backend
    api.uploadImage(image, this.captcha.extractCredentials())
    .then(({ multihash }) => {
      const link = `https://ipfs.io/ipfs/${multihash}`
      // display the link to the image
      swal({
        title: 'Upload success!',
        type: 'success',
        html: `You can access your file here <a target="_blank" href="${link}">${link}</a>`,
      })
    })
  }

  render() {
    return (
      <div id="home">
        <Header />
        <DeCAPTCHA
          updateValidCaptcha={valid => this.setState({ enableSubmit: valid })}
          ref={captcha => this.captcha = captcha}
        />
        <SubmitButton
          uploadImage={this.uploadImage}
          enabled={this.state.enableSubmit}
        />
        <Footer />
      </div>
    )
  }
}
