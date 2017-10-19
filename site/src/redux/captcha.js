import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  submitLabel: ['multihash', 'label'],
  submitSuccess: ['correct', 'key'],
  submitError: ['error'],
})

export const CaptchaTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  fetchingImage: false,
  image: null,
  error: null,

  submitting: false,
  numCorrect: 0,
  keys: [],
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBMIT_LABEL]: state =>
    state.merge({ submitting: true }),

  [Types.SUBMIT_ERROR]: (state, { error }) =>
    state.merge({ submitting: false, error }),

  [Types.SUBMIT_SUCCESS]: (state, { correct, key }) =>
    state.merge({
      submitting: false,
      numCorrect: correct ? state.numCorrect + 1 : state.numCorrect,
      keys: [key].concat(state.keys),
    }),
})
