import {
  all,
  add,
  view,
  update,
  remove
} from './index'
import store from '../../store'
import { FETCH_FOLDER_ALL } from '../constants/folders'

const url = process.env.REACT_APP_ENDPOINT;

function fetchFolder(filter = {}) {
  const path = url + 'folders'
  filter._sort = 'id'
  filter._order = 'desc'
  all(path, filter).then(result => {
    store.dispatch({
      type: FETCH_FOLDER_ALL,
      payload: result
    })
  })
}

function addFolder(data) {
  const path = url + 'folders'
  return add(path, data)
}

function getFolder(id) {
  const path = url + `folders/${id}`
  return view(path)
}

function updateFolder(id, data) {
  const path = url + `folders/${id}`

  return update(path, data)
}

function deleteFolder(id) {
  const path = url + `folders/${id}`
  return remove(path)
}


export default {
  fetchFolder,
  addFolder,
  getFolder,
  updateFolder,
  deleteFolder
}
