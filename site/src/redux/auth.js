import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  registerSuccess: [],
  confirmEmail: ['key'],
  register: ['email', 'username', 'password'],
  logout: [],
  login: ['username', 'password'],

  loginFromStorage: [],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  waiting_for_confirmation: false,
  registering: false,
  loggingIn: false,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: state =>
    state.merge({
      waiting_for_confirmation: true,
      registering: false,
    }),

  [Types.REGISTER]: state =>
    state.merge({ registering: true }),

  [Types.LOGIN]: state =>
    state.merge({ loggingIn: true }),
})
