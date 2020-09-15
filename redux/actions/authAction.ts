import { Action } from "types/action";
import { LoginResposne } from "types/response";

export const login = (payload:LoginResposne):Action<LoginResposne> => {
    return {
        type: 'LOGIN',
        payload
    }
}