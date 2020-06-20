import {
  add,
  all
} from './index'
import { url } from '../constants'

function connectionsUsers(data) {
  const path = url + "/connections"
  const token = window.localStorage.getItem('token')
  const headers = {
    Authorization: `Token ${token}`
  }
  return add(path, data, {}, headers)
}

function signUp(data) {
  const path = url + "/users"
  return add(path, data)
}

function Login(data) {
  const path = url + "/users/login"
  return add(path, data)
}

function fetchUserList() {
  const path = url + "/users/usersList"
  const token = window.localStorage.getItem('token')
  const headers = {
    Authorization: `Token ${token}`
  }
  return all(path, {}, headers)
}

export default {
  signUp,
  Login,
  fetchUserList,
  connectionsUsers
}

