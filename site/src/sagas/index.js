import { fork } from 'redux-saga/effects'

/* ------------- Sagas ------------- */
import captchaSaga from './CaptchaSaga'
import imageSaga from './ImageSaga'

/* ------------- Services ------------- */
import Api from '../services/Api'

const api = Api.create()

export default function* root() {
  yield [
    fork(captchaSaga, api),
    fork(imageSaga, api),
  ]
}
