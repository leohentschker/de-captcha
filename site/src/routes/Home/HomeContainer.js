// external
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// internal
import ProjectActionCreators from '../../redux/projects'
import Home from './components/Home'

const mapDispatchToProps = dispatch => ({
  projectActions: bindActionCreators(ProjectActionCreators, dispatch),
})

const mapStateToProps = state => ({
  projects: state.projects.projects,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
