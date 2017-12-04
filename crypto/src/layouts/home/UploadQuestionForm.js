import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const UploadQuestion = () => (
  <div>
    UPLOAD THE QUESTION
  </div>
)

const BulkUpload = () => (
  <div>
    BULK UPLOAD
  </div>
)

export default class UploadQuestionForm extends Component {
  render() {
    return (
      <div id="upload-question-form">
        <Tabs>
          <TabList>
            <Tab>Upload Question</Tab>
            <Tab>Bulk Upload</Tab>
          </TabList>

          <TabPanel>
            <UploadQuestion />
          </TabPanel>
          <TabPanel>
            <BulkUpload />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}