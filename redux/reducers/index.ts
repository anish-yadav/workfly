import { combineReducers } from 'redux'
import authReducer from './authReducer'
//export { default as authReducer } from './authReducer'

const rootReducer = combineReducers({
    authReducer: authReducer
})

export default rootReducer