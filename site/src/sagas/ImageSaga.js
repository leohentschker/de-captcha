// external
import {
  takeEvery,
  select,
  call,
  put,
} from 'redux-saga/effects'
import swal from 'sweetalert2'

// internal
import ImageActions, { ImageTypes } from '../redux/images'

function* handleUpload(api, { image }) {
  try {
    // upload the image to the backend
    const uploadResponse = yield call(api.uploadImage, image)
    yield put(ImageActions.uploadSuccess(uploadResponse))

    // display the link to the image
    const link = `https://ipfs.io/ipfs/${uploadResponse.multihash}`
    swal({
      title: 'Upload success!',
      type: 'success',
      html: `You can access your file here <a target="_blank" href="${link}">${link}</a>`,
    })
  } catch (err) {
    yield put(ImageActions.uploadError(err))
  }
}

function* handleFlag(api, { multihash }) {
  try {
    // flag the image as offensive
    yield call(api.flagImage, multihash)

    // mark we are done and get a new image
    yield put(ImageActions.getImage())

    // apologize to the user!
    swal(
      'We\'re sorry you had to see that!',
      'We\'ve stopped showing the image to other users and will review it manually. Thank you for making DeCAPTCHA a better place!',
      'warning',
    )
  } catch (err) {
    swal(
      'Woops!',
      'We are unable to flag the image at this time. Please refresh the page!',
      'error',
    )
  }
}

function* loadImage(api) {
  try {
    const numCorrect = yield select(state => state.captcha.numCorrect)

    const { multihash } = yield call(api.loadImage, numCorrect)
    yield put(ImageActions.imageSuccess(multihash))
  } catch (err) {
    swal(
      'Woops!',
      'We couldn\'t connect to the server. Try refreshing the page!',
      'error',
    )
    yield put(ImageActions.imageError(err))
  }
}

export default function* flow(api) {
  yield [
    takeEvery(ImageTypes.UPLOAD_IMAGE, handleUpload, api),
    takeEvery(ImageTypes.FLAG_IMAGE, handleFlag, api),
    takeEvery(ImageTypes.GET_IMAGE, loadImage, api),
  ]
}
