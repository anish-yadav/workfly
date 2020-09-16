import { AuthType } from "./authType";
import { PersistState } from "redux-persist";
import { Action } from "./action";
import { LoginMutation } from "../src/generated/graphql";

export type State = {
    authReducer : AuthType,
    action: Action<LoginMutation>
    "_persist": PersistState
}