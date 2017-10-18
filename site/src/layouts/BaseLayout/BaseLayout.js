import PropTypes from 'prop-types'
import React from 'react'
import './BaseLayout.scss'
import '../../styles/core.scss'


export const BaseLayout = ({ children }) => (
  <div className='container text-center'>
    <div className='base-layout__viewport'>
      {children}
    </div>
  </div>
)

BaseLayout.propTypes = {
  children : PropTypes.element.isRequired,
}

export default BaseLayout
