import React from 'react'
import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'

import SingleItemUpload from './SingleItemUpload'
import BulkUpload from './BulkUpload'

const UploadForm = () => (
  <div id="upload-form">
    <Paper zDepth={1}>
      <Tabs>
        <Tab label="Upload Single Problem" >
          <SingleItemUpload />
        </Tab>
        <Tab label="Upload CSV" >
          <BulkUpload />
        </Tab>
      </Tabs>
    </Paper>
  </div>
)

export default UploadForm
