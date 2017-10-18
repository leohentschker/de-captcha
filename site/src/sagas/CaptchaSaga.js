// external
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'

// internal
import CaptchaActions, { CaptchaTypes } from '../redux/captcha'

function* handleSubmission(api, { multihash, label, numCorrect }) {
  try {
    const { valid } = yield call(api.submitLabel, multihash, label, numCorrect)
    yield put(CaptchaActions.submitSuccess(valid))
  } catch (err) {
    yield put(CaptchaActions.submitError(err))
  }
}

export default function* flow(api) {
  yield [
    takeEvery(CaptchaTypes.SUBMIT_LABEL, handleSubmission, api),
  ]
}
