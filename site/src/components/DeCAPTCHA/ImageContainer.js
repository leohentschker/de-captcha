import React, { Component } from 'react'
import Dimensions from 'react-dimensions'
import PropTypes from 'prop-types'

import constants from './constants'

class ImageContainer extends Component {

  static propTypes = {
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
    multihash: PropTypes.string.isRequired,
  }

  render() {
    return (
      <img
        className="img-to-label"
        src={`https://ipfs.io/ipfs/${this.props.multihash}`}
        width={this.props.containerWidth}
        height={this.props.containerHeight}
      />
    )
  }
}

export default Dimensions()(ImageContainer)
