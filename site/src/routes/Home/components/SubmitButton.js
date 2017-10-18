import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import React from 'react'

const SubmitButton = ({ uploadImage, enabled }) => (
  <div className="submit-wrapper">
    <Dropzone
      accept="image/*"
      multiple={false}
      onDrop={f => uploadImage(f)}
      disabled={!enabled}
    >
      <span className="upload-description">
        {enabled ? 'Add your own image' : 'Label more images to enable uploading!'}
      </span>
    </Dropzone>
  </div>
)

SubmitButton.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
}

export default SubmitButton
