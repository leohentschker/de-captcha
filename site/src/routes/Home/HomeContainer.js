// external
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// internal
import ImageActionCreators from '../../redux/images'
import Home from './components/Home'

const mapDispatchToProps = dispatch => ({
  imageActions: bindActionCreators(ImageActionCreators, dispatch),
})

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
