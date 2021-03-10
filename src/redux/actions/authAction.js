import axios from "axios"
import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../ActionType"
import cookie from 'react-cookies'
export const userRegister=(user={})=>async(dispatch,getState)=>{
    try{
      let fd=new FormData();
      for(var it in user)
        fd.append(it,user[it])
      const {data}= await axios.post('/users/register/'+user.role,(fd))
      user=data.User
      return null
    }catch (error) {
        const errorStr=error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        return errorStr
      }
}
export const userLogin=(email,password,role)=>async(dispatch,getState)=>{
    dispatch({type:USER_LOGIN_REQUEST})
    try{
        const {data}= await axios.post('/users/login/'+role,({email,password}))
        const user=data.User
        user.role=role
        console.log(user)
        
        dispatch({type:USER_LOGIN_SUCCESS,payload:user})
        return true
    }catch (error) {
        dispatch({
          type: USER_LOGIN_ERROR,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
        return false
      }
}
export const userLogout=()=>async(dispatch)=>{
  dispatch({type:USER_LOGOUT})
  await axios.delete('/user/logout')
  cookie.remove('access_token')
  cookie.remove('refresh_token')
}