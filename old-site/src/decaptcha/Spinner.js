import React, { Component } from 'react'
import Dimensions from 'react-dimensions'
import PropTypes from 'prop-types'
import { Pulse } from 'styled-spinkit'

class Spinner extends Component {

  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
  }

  render() {
    const fraction = .4
    return (
      <div
        style={{
          marginTop: -1.5 * this.props.containerWidth * fraction + this.props.containerWidth / 2,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Pulse
          color="#0D2537"
          size={this.props.containerWidth * fraction}
          margin={0}
          fadeIn="none"
        />
      </div>
    )
  }
}

export default Dimensions()(Spinner)
