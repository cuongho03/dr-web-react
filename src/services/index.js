import requestService from './request'

export const all = (
  path,
  filter = {},
  headers = {},
) => {

  return requestService.send({
    method: 'get',
    path,
    query: { ...filter },
    headers
  })
}

export const view = (path) => {
  return requestService.send({
    method: 'get',
    path,
  })
}

export const add = (path, data, query = {}, headers = {}) => {
  return requestService.send({
    method: 'post',
    path,
    data,
    query,
    headers
  })
}

export const update = (path, data, query = {}) => {
  return requestService.send({
    method: 'put',
    path,
    data,
    query,
  })
}

export const remove = (path) => {
  return requestService.send({
    method: 'delete',
    path,
  })
}


