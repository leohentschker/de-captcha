import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'

export default class SingleItemUpload extends Component {
  static propTypes = {
    addQuestion: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      question: '',
      hash: '',
    }
    this.submitQuestion = this.submitQuestion.bind(this)
  }

  submitQuestion() {
    this.props.addQuestion(this.state.question, this.state.hash)
  }

  render() {
    return (
      <div id="bulk-upload" className="upload-form-component">
        <div>
          <TextField
            hintText="Question"
            value={this.state.question}
            onChange={e => this.setState({ question: e.target.value })}
          />
        </div>
        <div>
          <TextField
            hintText="IPFS hash"
            value={this.state.hash}
            onChange={e => this.setState({ hash: e.target.value })}
          />
        </div>
        <div>
          <RaisedButton
            label="Submit Answer"
            onClick={this.submitQuestion}
          />
        </div>
      </div>
    )
  }
}
