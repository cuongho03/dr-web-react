import {
  all,
  add,
  remove,
  update
} from './index'
const url = process.env.REACT_APP_ENDPOINT;

function fetchFiles(filter = {}) {
  const path = url + 'files'
  filter._sort = 'id'
  filter._order = 'desc'

  return all(path, filter)
}

function addFile(data) {
  const path = url + 'files'
  return add(path, data)
}

function deleteFile(id) {
  const path = url + `files/${id}`
  return remove(path)
}

function updateFile(id, data) {
  const path = url + `files/${id}`

  return update(path, data)
}

export default {
  fetchFiles,
  addFile,
  deleteFile,
  updateFile
}
