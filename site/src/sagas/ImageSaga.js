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
    console.log(image)
    const multihash = yield call(api.uploadImage, image)
    yield put(ImageActions.uploadSuccess(multihash))
  } catch (err) {
    yield put(ImageActions.uploadError(err))
  }
}

function* loadImage(api) {
  try {
    const { multihash } = yield call(api.loadImage)
    yield put(ImageActions.imageSuccess(multihash))
  } catch (err) {
    yield put(ImageActions.imageError(err))
  }
}

export default function* flow(api) {
  yield [
    takeEvery(ImageTypes.UPLOAD_IMAGE, handleUpload, api),
    takeEvery(ImageTypes.GET_IMAGE, loadImage, api),
  ]
}
