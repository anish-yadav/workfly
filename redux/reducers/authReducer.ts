import { AuthType } from "types/authType";
import { Action } from "types/action";
import { LoginResposne } from "types/response";

const INITIAL_STATE:AuthType = {
    isLoggedIn: false,
    name: '',
    ID:'',
    phone: ''
}

const authReducer = (state=INITIAL_STATE,action:Action<LoginResposne>) => {
    switch(action.type) {
        case 'LOGIN' :
        const { user } = action.payload
        return { ...state, isLoggedIn: true, ...user }
        
        default :
        return state
    }
}

export default authReducer