// external
import { browserHistory } from 'react-router'
import React from 'react'

// internal
import './Upload.scss'

const Header = () => (
  <div className="header">
    <div className="pitch">
      Infrastructure when you <br /><span>need it.</span>
    </div>
    <div
      className="learn-more-button pointer"
      onClick={() => browserHistory.push('/about/')}
    >
      Learn more
    </div>
  </div>
)

const ActionButton = ({ name, action }) => (
  <div
    className="action-button pointer"
    onClick={action}
  >
    {name}
  </div>
)

const Description = () => (
  <div className="description">
    <div className="content">
      <div className="title">
        Stateless is a serverless-first cloud computing provider
      </div>
      <div className="info">
        Worry about your applications, not your infrastructure.
      </div>
      <div className="action-buttons">
        <ActionButton
          name="See a demo"
        />
        <ActionButton
          name="Join the beta"
          action={() => browserHistory.push('/register/')}
        />
      </div>
    </div>
  </div>
)

const Landing = () => (
  <div id="landing">
    <Header />
    <Description />
  </div>
)

Landing.propTypes = {
}

export default Landing
