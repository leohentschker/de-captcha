import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  submitAnswer: ['multihash', 'answer'],
  submitSuccess: ['correct'],
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  fetchingImage: false,
  image: null,
  submitting: false,
  numCorrect: 0,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBMIT_ANSWER]: state =>
    state.merge({ submitting: true }),

  [Types.SUBMIT_SUCCESS]: (state, { correct }) =>
    state.merge({
      submitting: false,
      numCorrect: correct ? stat.numCorrect + 1 : stat.numCorrect 
    }),
})
