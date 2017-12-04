// external
import { browserHistory } from 'react-router'
import swal from 'sweetalert2'
import {
  takeEvery,
  select,
  call,
  put,
} from 'redux-saga/effects'

// internal
import ProjectActions, { ProjectTypes } from '../redux/projects'

function* fetchProjects(api) {
  const resp = yield call(api.fetchProjects)

  if (resp.ok) {
    yield put(ProjectActions.fetchProjectsSuccess(resp.data))
    return resp.data
  } else {
    console.log('ERROR WE COULD NOT LIST')
  }
}

function* deployProject(api) {
  const project = yield select(state => state.projects.project)
  const resp = yield call(api.deployProject, project)

  if (resp.ok) {
  } else {
  }
}

function* resolveProjects() {
  yield put(ProjectActions.updateProjectList())
}

function* setupEnv(api) {
  // pull the projects
  const projects = yield call(fetchProjects, api)
  const activeProject = projects[0]

  // set the active project
  yield put(ProjectActions.selectProject(activeProject))

  // navigate to that project
  browserHistory.push(`/project/${activeProject.id}/`)
}

export default function* flow(api) {
  yield call(setupEnv, api)
  yield [
    takeEvery(ProjectTypes.FETCH_PROJECTS, fetchProjects, api),
    takeEvery(ProjectTypes.DEPLOY_PROJECT, deployProject, api),

    // fix the project list whenever we update the current project
    takeEvery(ProjectTypes.ADD_CONTAINER, resolveProjects),
    takeEvery(ProjectTypes.DELETE_CONTAINER, resolveProjects),
  ]
}
