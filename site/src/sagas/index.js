import { fork } from 'redux-saga/effects'

/* ------------- Sagas ------------- */
import imageSaga from './ImageSaga'

/* ------------- Services ------------- */
import Api from '../services/Api'

const api = Api.create()

export default function * root () {
  yield [
    // startup saga
    fork(imageSaga, api),
  ]
}
