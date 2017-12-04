// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

import './FormSubmission.scss'

export default class FormSubmission extends Component {
  static propTypes = {
    formDescription: PropTypes.string.isRequired,
    formTitle: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      formData: {},
      formPage: 0,
    }

    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  nextPage() {
    const page = this.props.pages[this.state.formPage]
    console.log(page, "THE P")

    this.setState({
      formPage: this.state.formPage + 1,
    })
  }

  prevPage() {
    this.setState({
      formPage: this.state.formPage - 1,
    })
  }

  render() {
    return (
      <div className="form-submission">
        <div className="full-width flex full-center">
          <div className="form-container">
            <div className="full-width flex full-center">
              <Paper className="title-box"> 
                <div className="form-title">{this.props.formTitle}</div>
                <div className="form-description">{this.props.formDescription}</div>
              </Paper>
            </div>
            <div className="progress-indicator">
              Step {this.state.formPage + 1} of {this.props.pages.length}
            </div>
            <div className="page-container">
              {this.props.pages[this.state.formPage]}
            </div>
            <div className="action-buttons flex rows full-center">
              {
                this.state.formPage > 0 &&
                <div className="button-wrapper">
                  <RaisedButton
                    onClick={this.prevPage}
                    label="Back"
                  />
                </div>                
              }
              {
                this.state.formPage < this.props.pages.length - 1 &&
                <div className="button-wrapper">
                  <RaisedButton
                    onClick={this.nextPage}
                    primary={true}
                    label="Continue"
                  />                  
                </div>
              }
              {
                this.state.formPage === this.props.pages.length - 1 &&
                <div className="button-wrapper">
                  <RaisedButton
                    onClick={this.nextPage}
                    primary={true}
                    label="Submit"
                  />                  
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
