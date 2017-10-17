import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  uploadImage: ['image'],
  uploadSuccess: ['multihash'],
  uploadError: ['error'],
  imageSuccess: ['multihash'],
  getImage: [],
})

export const ImageTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  uploading: false,
  fetching: false,
  multihash: null,
  error: null,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_IMAGE]: state =>
    state.merge({ fetching: true }),

  [Types.IMAGE_SUCCESS]: (state, { multihash }) =>
    state.merge({ fetching: false, multihash }),

  [Types.UPLOAD_IMAGE]: state =>
    state.merge({ uploading: true }),

  [Types.UPLOAD_SUCCESS]: state =>
    state.merge({ uploading: false }),

  [Types.UPLOAD_ERROR]: (state, { error }) =>
    state.merge({ error }),
})
