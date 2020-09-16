import { User } from "src/generated/graphql";

export interface AuthType extends User  {
    isLoggedIn : boolean,
    
}