import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SubmissionContainer extends Component {

  static propTypes = {
    submitLabel: PropTypes.func.isRequired,
    multihash: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }

    this.submitLabel = this.submitLabel.bind(this)
  }

  submitLabel() {
    this.props.submitLabel(
      this.props.multihash,
      this.state.label,
    )

    this.setState({ label: '' })
  }

  render() {
    return (
      <div className="submission-container">
        <div className="description">Label the image you see above</div>
        <div className="input-wrapper">
          <input
            autoFocus
            className="label-input"
            placeholder="ex. cat"
            type="text"
            value={this.state.label}
            onChange={e => this.setState({ label: e.target.value })}
            onKeyPress={e => (e.key === 'Enter' ? this.submitLabel() : null)}
          />
          <div
            role="button"
            tabIndex={0}
            className="submit-label-btn"
            onClick={() =>
              this.submitLabel()
            }
          >
            <span>Submit Label</span>
          </div>
        </div>
      </div>
    )
  }
}