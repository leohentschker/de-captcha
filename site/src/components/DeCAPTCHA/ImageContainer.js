import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'


const ImageContainer = ({ multihash }) => (
  <div className="img-container">
    <div className="loaded-img">
      <img
        className="img-to-label"
        src={`https://ipfs.io/ipfs/${multihash}`}
      />
    </div>
  </div>
)

export default ImageContainer
