import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'

export default class SubmissionContainer extends Component {

  static propTypes = {
    submitLabel: PropTypes.func.isRequired,
    multihash: PropTypes.string.isRequired,
    flagImage: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }

    this.submitLabel = this.submitLabel.bind(this)
  }

  submitLabel() {
    if (this.state.label.length === 0) {
      return
    }

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
            placeholder="ex. cat, shoe, car"
            type="text"
            value={this.state.label}
            onChange={e => this.setState({ label: e.target.value })}
            onKeyPress={e => (e.key === 'Enter' ? this.submitLabel() : null)}
          />
          <div
            role="button"
            tabIndex={0}
            className="submit-label-btn"
            onClick={() => this.submitLabel()}
          >
            <span>Submit Label</span>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="flag-btn"
            onClick={() =>
              swal({
                showCancelButton: true,
                title: 'Flag this as inappropriate?',
                text: 'This will prevent other users from seeing the image until it is manually reviewed.',
                type: 'question',
              })
              .then(() => this.props.flagImage(this.props.multihash))
            }
            data-tip="Flag content as inappropriate"
          >
            <span><FontAwesome name="flag" /></span>
          </div>
        </div>

        {/* This is only to make the tooltip on the flag button work */}
        <ReactTooltip />
      </div>
    )
  }
}