import { fork } from 'redux-saga/effects'

/* ------------- Sagas ------------- */
import projectSaga from './ProjectSaga'
import authSaga from './AuthSaga'

/* ------------- Services ------------- */
import Api from '../services/Api'

const api = Api.create()

export default function* root() {
  yield [
    fork(authSaga, api),
  ]
}
