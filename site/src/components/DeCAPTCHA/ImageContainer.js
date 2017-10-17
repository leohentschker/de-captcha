import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'


export default class ImageContainer extends Component {

  static propTypes = {
    getImage: PropTypes.func.isRequired,
    multihash: PropTypes.string,
  }

  static defaultProps = {
    multihash: '',
  }

  componentDidMount() {
    this.props.getImage()
  }

  render() {
    return (
      <div className="img-container">
        {
          this.props.multihash ? (
            <div className="loaded-img">
              <img
                className="img-to-label"
                src={`https://ipfs.io/ipfs/${this.props.multihash}`}
              />
            </div>
          ) : (
            <div className="loading-spinner-wrapper">
              <Spinner
                name="pulse"
                color="#0D2537"
              />
            </div>
          )      
        }
      </div>
    )
  }
}
