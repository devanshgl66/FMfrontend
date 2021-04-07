import axios from "axios"
import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../ActionType"
import cookie from 'react-cookies'
// function to convert base64 image to image
function divideProfilePic(profilePic){
  var div=[]
  while(profilePic.length>0){
    div.push(profilePic.slice(0,3000))
    profilePic=profilePic.slice(3000)
  }
  return div;
}
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

var blob = new Blob(byteArrays, {type: contentType});
return blob;
}
export const userRegister=(user={})=>async(dispatch,getState)=>{
    try{
      console.log(user)
      let fd=new FormData();   
      for(var it in user)
        fd.append(it,user[it])
      // console.log(user.profilePic)
      if(user.profilePic)
      fd.append('profilePic',user.profilePic[0])
      if(user.role==0){
        console.log(user.images.length)
        for(var i=0;i<user.images.length;i++){
          var block = user.images[i].split(";");
          // Get the content type of the image
          var contentType = block[0].split(":")[1];// In this case "image/gif"
          // get the real base64 content of the file
          var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

          // Convert it to a blob to upload
          var blob = b64toBlob(realData, contentType);
          fd.append(`image${i}`,blob)}
      }
      console.log(fd)
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
        //breaking profile pic and storing it in cookie
        var divProfilePic=divideProfilePic(user.profilePic)
        divProfilePic.forEach((a,index)=>{
          cookie.save(`profilePic${index}`,a,{path:'/',secure:true})
        })
        dispatch({type:USER_LOGIN_SUCCESS,payload:user})
        user.profilePic=undefined
        cookie.save('user',user,{path:'/',secure:true});
        
        // return true
    }catch (error) {
        dispatch({
          type: USER_LOGIN_ERROR,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
        // return false
      }
}
export const userLogout=({role})=>async(dispatch)=>{
  dispatch({type:USER_LOGOUT})
  var cookies=cookie.loadAll()
  // console.log(cookies)
  Object.keys(cookies).forEach(cook => {
    if(cook.startsWith('profilePic'))
      cookie.remove(cook,{path:'/'})
  });
  cookie.remove('user',{path:'/'})
  try{
    return await axios.delete(`/users/logout/${role}`)
  }catch(err){
    console.log(err)
  }
}