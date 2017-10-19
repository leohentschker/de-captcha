import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'

import constants from './constants'

export default class SubmissionContainer extends Component {

  static propTypes = {
    secondaryColor: PropTypes.string.isRequired,
    primaryColor: PropTypes.string.isRequired,
    submitLabel: PropTypes.func.isRequired,
    updateLabel: PropTypes.func.isRequired,
    fontColor: PropTypes.string.isRequired,
    flagImage: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div
        className="submission-container"
        style={{
          height: constants.SUBMISSION_BAR_SIZE,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <div
          className="description"
          style={{
            color: this.props.fontColor,
            marginTop: '10px',
            fontSize: '18px',
          }}
        >
          Describe what you see above in one word
        </div>
        <div
          className="input-wrapper"
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <input
            autoFocus
            className="label-input"
            style={{
              borderRadius: '3px',
              outlineWidth: '0px',
              paddingLeft: '10px',
              fontSize: '18px',
              margin: '10px',
              height: '40px',
              border: 'none',
              height: '40px',
              color: this.props.fontColor,
              width: '200px',
            }}
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
            style={{
              color: this.props.secondaryColor,
              background: this.props.primaryColor,
              margin: '10px',
              width: '140px',
              justifyContent: 'center',
              display: 'flex',
              borderRadius: '3px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '18px',
            }}
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
            style={{
              color: this.props.primaryColor,
              borderStyle: 'solid',
              borderColor: this.props.primaryColor,
              borderWidth: '1px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '3px',
              display: 'flex',
              margin: '10px',
              height: '40px',
              width: '40px',
              fontSize: '18px',
            }}
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