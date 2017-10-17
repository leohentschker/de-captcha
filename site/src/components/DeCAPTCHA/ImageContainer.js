import Spinner from 'react-spinkit'
import React from 'react'

const LoadingSpinner = () => (
  <div className="loading-spinner-wrapper">
    <Spinner
      name="pulse"
      color="#0D2537"
    />
  </div>
)

const ImageContainer = ({ multihash }) => (
  <div className="img-container">
    {
      multihash ? (
        <LoadedImg multihash={multihash} />
      ) : (
        <LoadingSpinner />
      )      
    }
  </div>
)

export default ImageContainer
