import {
  all,
  view,
  add,
  update,
  remove
} from './index'
import store from '../../store'
import { FETCH_LINKS_ACTIVE, FETCH_LINKS_EXPIRES, FETCH_LINKS_ALL } from '../constants/links'

const url = process.env.REACT_APP_ENDPOINT;

function fetchLinksActive(filter = {}) {
  const path = url + 'links'
  filter.status = 'active'

  all(path, filter).then(result => {
    store.dispatch({
      type: FETCH_LINKS_ACTIVE,
      payload: result
    })
  })
}

function fetchLinksExpires(filter = {}) {
  const path = url + 'links'
  filter.status = 'expries'

  all(path, filter).then(result => {
    store.dispatch({
      type: FETCH_LINKS_EXPIRES,
      payload: result
    })
  })
}

function fetchLinksAll(filter = {}) {
  const path = url + 'links'

  all(path, filter).then(result => {
    store.dispatch({
      type: FETCH_LINKS_ALL,
      payload: result
    })
  })
}

function getLink(id) {
  const path = url + `links/${id}/`
  return view(path)
}

function addLink(data) {
  const path = url + 'links'
  const payload = {

  }
  return add(path, payload)
}

function updateLink(id, data) {
  const path = url + `links/${id}`

  return update(path, data)
}

function deleteLink(id) {
  const path = url + `links/${id}`
  return remove(path)
}


export default {
  fetchLinksActive,
  getLink,
  addLink,
  updateLink,
  deleteLink,
  fetchLinksExpires,
  fetchLinksAll
}
