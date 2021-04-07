import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../ActionType"
import cookie from 'react-cookies'
function loadUser(){
    var user=cookie.load('user')
    var profilePic=''
    var cookies=cookie.loadAll()
    // console.log(cookies)
    Object.keys(cookies).forEach(cook => {
        if(cook.startsWith('profilePic')){
            profilePic+=cookies[cook]
        }
    });
    if(profilePic.length==0)
        profilePic=null
    user.profilePic=profilePic
    return user
}
var initState={
        loading:false,
        user:cookie.load('user')?loadUser():null,
        error:null
    }
// console.log(cookie.loadAll())
export const authReducer=(state=initState,action)=>{
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