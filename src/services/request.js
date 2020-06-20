import axios from 'axios'

import { message } from 'antd'
import {
  getQueryString,
} from '../helper/common'

function send({
  method = 'get', path, data = null, query = null, headers = {},
}) {

  return new Promise((resolve) => {
    const url = `${path}${getQueryString(query)}`
    axios({
      method, url, data, headers,
    })
      .then((result) => {
        const data = result.data
        return resolve(data)
      })
      .catch((error) => {
        const result = error

        if (!result) {
          message.error('Something was wrong when request!')
        }
        else {
          const { status, data } = result

          if (status === 401 && data === 'TokenExpired') {
            message.error('TokenExpired')
          }
          else if (
            (status === 401 && data === 'Unauthorized') || (status === 403 && data === 'InvalidToken')) {
            message.error('Unauthorized')
              .then(() => {
                window.localStorage.clear()
                window.location.href = '/login'
              })
          }
          else {
            return resolve(result.data)
          }
        }
      })
  })
}

export default {
  send,
}
