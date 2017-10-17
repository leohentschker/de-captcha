import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import React from 'react'

const SubmitButton = ({ uploadImage }) => (
  <div className="submit-wrapper">
    <Dropzone
      accept="image/*"
      multiple={false}
      onDrop={f => uploadImage(f)}
    >
      <span className="upload-description">
        Add your own image
      </span>
    </Dropzone>
  </div>
)

SubmitButton.propTypes = {
  uploadImage: PropTypes.func.isRequired,
}

export default SubmitButton
