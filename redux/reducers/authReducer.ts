import { Action } from "types/action";
import { AuthType } from "types/authType";
import { LoginMutation } from "../../src/generated/graphql";

const INITIAL_STATE: AuthType = {
  isLoggedIn: false,
  id: 0,
  email: "",
  name: " ",
  status: "",
  bcCity: "",
  contact: "",
  zohoID: "",
  createdAt: "",
  updatedAt: "",
};

const authReducer = (state = INITIAL_STATE, action: Action<LoginMutation>) => {
  switch (action.type) {
    case "LOGIN":
      const { user } = action.payload.login;
      return { ...state, isLoggedIn: true, ...user };

    case "LOGOUT":
      return INITIAL_STATE;
      
    default:
      return state;
  }
};

export default authReducer;
