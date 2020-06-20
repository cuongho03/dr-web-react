import requestService from './request'

function sendMail(data) {

  return requestService.send({
    method: 'post',
    path: 'https://webhook-twillio.herokuapp.com/sendmail',
    data: { ...data },
  })
}
export default {
  sendMail
}
