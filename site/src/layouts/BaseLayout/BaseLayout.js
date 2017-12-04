import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Sidebar from './Sidebar'
import './BaseLayout.scss'
import '../../styles/core.scss'


export default class BaseLayout extends Component {
  render() {
    return (
      <div
        className="container text-center"
        id="base-layout"
      >
          <div className="content-wrapper">
            <div className="base-layout__viewport">
              {this.props.children}
            </div>
          </div>
      </div>
    )
  }
}

BaseLayout.propTypes = {
  children : PropTypes.element.isRequired,
}
