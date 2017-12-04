import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import uuidV4 from 'uuid/v4'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  fetchProjectsSuccess: ['projects'],
  fetchProjects: [],

  selectProject: ['project'],

  deployProject: [],

  addContainerSuccess: ['container'],
  updateContainer: ['id', 'name', 'image'],
  deleteContainer: ['id'],
  addContainer: ['projectID'],

  updateProjectList: [],
})

export const ProjectTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  projects: [],
  project: {
    containers: [],
  },
})

const createFakeContainer = (projectID) => ({
  project: projectID,
  image: 'tutum/hello-world',
  name: `Container ${Math.trunc(Math.random() * 100)}`,
  port: 80,
  id: uuidV4(),
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_PROJECT]: (state, { project }) =>
    state.merge({ project }),

  [Types.FETCH_PROJECTS_SUCCESS]: (state, { projects }) =>
    state.merge({ projects }),

  [Types.UPDATE_CONTAINER]: (state, { id, name, image }) => {
    const containers = state.project.containers.map(
      c => (c.id === id ? { ...c, name, image } : c))

    return state.merge({
      project: {
        ...state.project,
        containers,
      },
    })
  },

  [Types.DELETE_CONTAINER]: (state, { id }) =>
    state.merge({
      project: {
        ...state.project,
        containers: state.project.containers.filter(c => (c.id !== id)),
      },
    }),

  [Types.ADD_CONTAINER]: (state, { projectID }) => {
    const fakeContainer = createFakeContainer(projectID)
    const containers = state.project.containers ? [fakeContainer].concat(state.project.containers) : [fakeContainer]
    return state.merge({
      project: {
        ...state.project,
        containers,
      },
    })
  },

  [Types.UPDATE_PROJECT_LIST]: (state) => {
    const projects = state.projects.map(
      p => (p.id === state.project.id ? state.project : p))
    return state.merge({
      projects,
    })
  },
})
