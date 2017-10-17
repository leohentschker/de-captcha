// external
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'

// internal
import ImageActions, { ImageTypes } from '../redux/images'

function* handleUpload(api, { image }) {
  try {
    console.log("HANDLING THE UPLOADDD")
    return
    const multihash = yield call(api.uploadImage, image)
    yield put(ImageActions.uploadSuccess(multihash))
  } catch (err) {
    yield put(ImageActions.uploadError(err))
  }
}

export default function* flow(api) {
  yield takeEvery(ImageTypes.UPLOAD_IMAGE, handleUpload, api)
}
