// external
import { browserHistory } from 'react-router'
import swal from 'sweetalert2'
import {
  takeEvery,
  take,
  race,
  call,
  put,
} from 'redux-saga/effects'

// internal
import projectFlow from './ProjectSaga'
import AuthActions, { AuthTypes } from '../redux/auth'

const LOCALSTORAGE_KEY = 'stateless-token'

function* handleConfirmEmail(api, { key }) {
  const resp = yield call(api.confirmEmail, key)

  if (resp.ok) {
    browserHistory.push('/login/')
  } else {
    swal(
      'Uh oh!',
      'We were unable to confirm your email at this time. Try refreshing the page!',
      'error',
    )
  }
}

function* handleRegister(api, { email, username, password }) {
  const resp = yield call(api.register, username, email, password)

  if (resp.ok) {
    yield put(AuthActions.registerSuccess())
    browserHistory.push('/login/')
  }
}

function* handleLogin(api, email, username, password) {
  const resp = yield call(api.login, username, email, password)

  if (resp.ok) {
    const { key } = resp.data

    // set the token as a header on the api
    api.setAuthToken(key)

    // store the token in localstorage
    localStorage.setItem(LOCALSTORAGE_KEY, key)
    return true
  } else {
    swal(
      'Uh oh!',
      'We were unable to log you in. Try enterring your username and password again!',
      'error',
    )
    return false
  }
}

function* handleLogout() {
  localStorage.clear()
  yield call(browserHistory.push, '/')
}

function* userFlow(api) {
  yield race({
    logout: take(AuthTypes.LOGOUT),
    flow: projectFlow(api),
  })
  yield call(handleLogout)
}

function* loginFlow(api, { email, username, password }) {
  const success = yield call(handleLogin, api, email, username, password)

  if (success) {
    yield call(userFlow, api)
  }
}

export function* extractKey(api) {
  const authToken = localStorage.getItem(LOCALSTORAGE_KEY)
  if (authToken) {
    api.setAuthToken(authToken)
    yield call(userFlow, api)
  }
}

export default function* flow(api) {
  yield [
    takeEvery(AuthTypes.LOGIN_FROM_STORAGE, extractKey, api),
    takeEvery(AuthTypes.CONFIRM_EMAIL, handleConfirmEmail, api),
    takeEvery(AuthTypes.REGISTER, handleRegister, api),
    takeEvery(AuthTypes.LOGIN, loginFlow, api),
  ]
}
