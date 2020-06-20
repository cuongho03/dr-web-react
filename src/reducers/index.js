import { combineReducers } from 'redux'
import member from './member'

import searchData from './search'
import mainData from './product'

const rootReducer = combineReducers({
  member,
  searchData,
  mainData
})

export default rootReducer