import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import React from 'react'

const TOTAL_CORRECT_REQUIRED = 0

const SubmitButton = ({ uploadImage, numCorrect }) => {
  const enabled = numCorrect >= TOTAL_CORRECT_REQUIRED
  return (
    <div className="submit-wrapper">
      <Dropzone
        accept="image/*"
        multiple={false}
        onDrop={files => uploadImage(files[0])}
        disabled={!enabled}
      >
        <span className="upload-description">
          {enabled ? 'Add your own image' : `Correctly label ${TOTAL_CORRECT_REQUIRED - numCorrect} more images to enable uploading!`}
        </span>
      </Dropzone>
    </div>
  )
}

SubmitButton.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  numCorrect: PropTypes.number.isRequired,
}

export default SubmitButton
