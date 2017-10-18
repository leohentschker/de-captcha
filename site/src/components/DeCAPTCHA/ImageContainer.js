import React from 'react'
import PropTypes from 'prop-types'


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

ImageContainer.propTypes = {
  multihash: PropTypes.string.isRequired,
}

export default ImageContainer
