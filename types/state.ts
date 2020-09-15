import { AuthType } from "./authType";
import { PersistState } from "redux-persist";

export type State = {
    authReducer : AuthType,
    "_persist": PersistState
}