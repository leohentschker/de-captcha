import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import React from 'react'

const SubmitButton = ({ uploadImage, enabled }) => {
  return (
    <div className={'submit-wrapper ' + (enabled ? 'enabled' : 'disabled')}>
      <Dropzone
        accept="image/*"
        multiple={false}
        onDrop={files => uploadImage(files[0])}
        disabled={!enabled}
      >
        <span className="upload-description">
          {enabled ? 'Add your own image' : 'Label 3 images correctly to enable uploading!'}
        </span>
      </Dropzone>
    </div>
  )
}

SubmitButton.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
}

export default SubmitButton
