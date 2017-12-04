import { Link } from 'react-router'
import Subheader from 'material-ui/Subheader'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import React from 'react'
import FontIcon from 'material-ui/FontIcon'


const Sidebar = ({ selectProject, projects, logout }) => (
  <div id="sidebar">
    <Drawer>
      <MenuItem
        className="sidebar-logo-wrapper"
      >
        <img src="/images/stateless_logo.png" alt="stateless logo" />
      </MenuItem>
      <Subheader>My Projects</Subheader>
      {
        projects.map(p => (
          <Link
            onClick={() => selectProject(p)}
            to={`/project/${p.id}`}
            activeClassName="active"
          >
            <MenuItem
              className="project-menuitem"
              key={p.id}
            >
                {p.name}
            </MenuItem>
          </Link>))
      }
      <Link
        to={'/create_project/'}
        activeClassName="active"
      >
        <MenuItem
          primaryText="Add Project"
          className="icon-items"
          leftIcon={<FontIcon className="fa fa-plus" />}
        />
      </Link>
      <Divider />
      <MenuItem
        primaryText="Help"
        className="icon-items"
        leftIcon={<FontIcon className="fa fa-question" />}
      />
      <MenuItem
        primaryText="Settings"
        className="icon-items"
        leftIcon={<FontIcon className="fa fa-cog" />}
      />
      <MenuItem
        primaryText="Sign out"
        className="icon-items"
        leftIcon={<FontIcon className="fa fa-sign-out" />}
        onClick={() => logout()}
      />
    </Drawer>
  </div>
)

Sidebar.propTypes = {
  selectProject: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Sidebar
