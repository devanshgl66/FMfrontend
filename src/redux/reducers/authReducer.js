import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../ActionType"

export const authReducer=(state={ loading:false,user:null,error:null},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {...state,loading:true}
        case USER_LOGIN_SUCCESS:
            return {...state,loading:false,user:action.payload,error:null}
        case USER_LOGIN_ERROR:
            return {...state,loading:false,error:action.payload,user:null}
        case USER_LOGOUT:
            return {...state,loading:false,user:null,error:null}
        default:
            return state
    }
}