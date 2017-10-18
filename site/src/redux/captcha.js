import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  submitLabel: ['multihash', 'label'],
  submitSuccess: ['correct'],
  submitError: ['error'],
})

export const CaptchaTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  fetchingImage: false,
  error: null,
  image: null,
  submitting: false,
  numCorrect: 0,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBMIT_LABEL]: state =>
    state.merge({ submitting: true }),

  [Types.SUBMIT_ERROR]: (state, { error }) =>
    state.merge({ submitting: false, error }),

  [Types.SUBMIT_SUCCESS]: (state, { correct }) =>
    state.merge({
      submitting: false,
      numCorrect: correct ? state.numCorrect + 1 : stat.numCorrect 
    }),
})
