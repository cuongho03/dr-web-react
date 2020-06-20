import {
  all,
  add,
  remove,
  update
} from './index'
import store from '../../store'
import { FETCH_FILE_AUTO_ALL } from '../constants/auto'

const url = process.env.REACT_APP_ENDPOINT;

function fetchAuto(filter = {}) {
  const path = url + 'auto'
  filter._sort = 'id'
  filter._order = 'desc'

  return all(path, filter)
}

function addAuto(data) {
  const path = url + 'auto'
  return add(path, data)
}

function deleteAuto(id) {
  const path = url + `auto/${id}`
  return remove(path)
}

function updateAuto(id, data) {
  const path = url + `auto/${id}`

  return update(path, data)
}

export default {
  fetchAuto,
  addAuto,
  deleteAuto,
  updateAuto
}
