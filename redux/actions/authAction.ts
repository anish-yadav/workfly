import { Action } from "types/action";
import { LoginMutation } from "../../src/generated/graphql";

export const login = (payload: LoginMutation| undefined | null):Action<LoginMutation| undefined | null> => {
    return {
        type: 'LOGIN',
        payload
    }
}