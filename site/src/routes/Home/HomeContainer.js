// external
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// internal
import ImageActionCreators from '../../redux/images'
import CaptchaActionCreators from '../../redux/captcha'
import Home from './components/Home'

const mapDispatchToProps = dispatch => ({
  imageActions: bindActionCreators(ImageActionCreators, dispatch),
  captchaActions: bindActionCreators(CaptchaActionCreators, dispatch),
})

const mapStateToProps = state => ({
  numCorrect: state.captcha.numCorrect,
  multihash: state.images.multihash,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
