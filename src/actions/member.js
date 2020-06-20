

import { USER_DETAILS_UPDATE, USER_LOGIN, USER_RESET } from '../constants/memberTypes'
import store from '../store'
import serviceUser from "../services/member"
/**
  * Sign Up to Firebase
  */
export function signUp(formData) {
  const { email, password } = formData
  const data = {
    user: {
      email,
      password,
      publicKey: email,
      userType: 'patient'
    }
  }
  return new Promise(async (resolve, reject) => {
    serviceUser.signUp(data).then(result => {
      console.log(result)
      if (result) {
        const { user = {} } = result

        store.dispatch({
          type: USER_DETAILS_UPDATE, data: {
            ...data.user,
            ...user
          }
        })


        return resolve({ isSuccess: true })
      } else {

        return resolve({ isSuccess: false, err: "Something was wrong!" })
      }
    })
  })
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const { email, password } = formData
  const data = {
    user: {
      email,
      password,
      publicKey: email
    }
  }
  return new Promise(async (resolve, reject) => {
    serviceUser.Login(data).then(result => {
      if (result) {
        const { user = {} } = result
        store.dispatch({
          type: USER_LOGIN, data: {
            ...data.user,
            ...user
          }
        })
        return resolve({ isSuccess: true })
      } else {

        return resolve({ isSuccess: false, err: "Something was wrong!" })
      }

    })
  })


}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData


}

