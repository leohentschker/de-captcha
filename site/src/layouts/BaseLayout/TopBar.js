import { Link } from 'react-router'
import React from 'react'

const TopBar = () => (
  <div id="top-bar">
    <Link activeClassName="active" to="/about/">About</Link>
    <Link activeClassName="active" to="/pricing/">Pricing</Link>
    <Link activeClassName="active" to="/login/">Join Beta</Link>
    <Link activeClassName="active" to="/login/">Login</Link>
  </div>
)

export default TopBar
