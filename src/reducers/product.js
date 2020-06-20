
// window.localStorage.removeItem("cart")
const initialState = {
  product: [],
  category: [],
  categorySub: [],
  loading: false
}

export default function cartReducer(state = initialState, action) {

  switch (action.type) {
    case 'UPDATE_PRODUCT': {
      return {
        ...state,
        product: action.payload,
      }
    }
    case 'UPDATE_CATEGORY': {
      return {
        ...state,
        category: action.payload,
      }
    }
    case 'UPDATE_CATEGORY_SUB': {

      return {
        ...state,
        categorySub: action.payload,
      }
    }
    case 'UPDATE_PRODUCT_LOADING': {
      return {
        ...state,
        loading: action.payload,
      }
    }
    default:
      return state
  }
}
