
// window.localStorage.removeItem("cart")
const initialState = {
  search: ""
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH': {
      return {
        search: action.data,
      }
    }
    default:
      return state
  }
}
