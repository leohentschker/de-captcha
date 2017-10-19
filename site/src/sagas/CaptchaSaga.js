// external
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'

// internal
import CaptchaActions, { CaptchaTypes } from '../redux/captcha'
import ImageActions from '../redux/images'

function* handleSubmission(api, { multihash, label, numCorrect }) {
  try {
    // submit the label to the backend
    const { valid, key } = yield call(api.submitLabel, multihash, label, numCorrect)
    console.log(key, 'THE identifier')
    yield put(CaptchaActions.submitSuccess(valid, key))

    // get a new image for the user to label
    yield put(ImageActions.getImage())
  } catch (err) {
    yield put(CaptchaActions.submitError(err))
  }
}

export default function* flow(api) {
  yield [
    takeEvery(CaptchaTypes.SUBMIT_LABEL, handleSubmission, api),
  ]
}
