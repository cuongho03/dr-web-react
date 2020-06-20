
// window.localStorage.removeItem('isUserLoggedIn')
const initialState = {
  isUserLoggedIn: !!window.localStorage.getItem('isUserLoggedIn'),
  email: window.localStorage.getItem('email') || '',
  isExistUser: !!window.localStorage.getItem('isExistUser'),
  id: window.localStorage.getItem('id') || '',
  token: window.localStorage.getItem('token') || '',
}

export default function userReducer(state = initialState, action) {

  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {

        window.localStorage.setItem('isUserLoggedIn', true)
        window.localStorage.setItem('email', action.data.email)
        window.localStorage.setItem('id', action.data._id)
        window.localStorage.setItem('token', action.data.token)

        return {
          ...state,
          email: action.data.email,
          isUserLoggedIn: true,
          id: action.data._id,
          token: action.data.token,
        }
      }
      return {}
    }
    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
        window.localStorage.setItem('isUserLoggedIn', true)
        window.localStorage.setItem('isExistUser', true)
        window.localStorage.setItem('email', action.data.email)
        window.localStorage.setItem('id', action.data._id)
        window.localStorage.setItem('token', action.data.token)
        return {
          ...state,
          email: action.data.email,
          isUserLoggedIn: true,
          isExistUser: true,
          id: action.data._id,
          token: action.data.token,
        }
      }
      return {}
    }
    case 'USER_RESET': {
      window.localStorage.removeItem('isUserLoggedIn')
      window.localStorage.removeItem('email')
      window.localStorage.removeItem('id')
      window.localStorage.removeItem('token')
      return {
        ...state,
        isUserLoggedIn: false,
      }
    }
    default:
      return state
  }
}
