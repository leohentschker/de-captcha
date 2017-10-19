import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'

export default class SubmissionContainer extends Component {

  static propTypes = {
    submitLabel: PropTypes.func.isRequired,
    updateLabel: PropTypes.func.isRequired,
    flagImage: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="submission-container">
        <div className="description">Describe what you see above in one word</div>
        <div className="input-wrapper">
          <input
            autoFocus
            className="label-input"
            placeholder="ex. cat, shoe, car"
            type="text"
            value={this.props.label}
            onChange={e => this.props.updateLabel(e.target.value)}
            onKeyPress={e => (e.key === 'Enter' ? this.props.submitLabel() : null)}
          />
          <div
            role="button"
            tabIndex={0}
            className="submit-label-btn"
            onClick={() => this.props.submitLabel()}
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
              .then(() => this.props.flagImage())
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