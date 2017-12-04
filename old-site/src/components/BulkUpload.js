import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import React from 'react'

import Papa from 'papaparse'

const BulkUpload = ({ addQuestion }) => (
  <div id="bulk-upload" className="upload-form-component">
    <Dropzone
      accept="text/csv"
      onDrop={files =>
        Papa.parse(files[0], {
          complete: results => results.data.map(d => addQuestion(...d)),
        })
      }
    />
    <RaisedButton
      label="Upload CSV"
    />
  </div>
)

BulkUpload.propTypes = {
  addQuestion: PropTypes.func.isRequired,
}

export default BulkUpload
