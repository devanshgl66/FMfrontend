import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/actions/authAction';
import ShowMessage from '../ShowMessage';
import RegisterDepartment from './RegisterDepartment';
import RegisterStudent from './RegisterStudent';
import RegisterTeacher from './RegisterTeacher';

const Register = (props) => {
    const dispatch = useDispatch();
    const role = parseInt(props.location.pathname.split("/")[2]);
    const [msg, setmsg] = useState({type:'none',child:null})
  async function handleRegister(val) {
    console.log(val)
    setmsg({type:'loading'})
    // msg.setloading(true);
    const err = await dispatch(userRegister({ ...val }));
    // msg.setloading(false);
    setmsg({type:'none'})
    if (err == null) {
        setmsg({type:'success',data:'You are successfully registered!'})
    //   setTimeout(() => {
        props.history.push(`/verifyAccount/${role}`, {
          email: val.email,
          role: role,
          loggedIn: false,
        });
    //   }, 5000);
    } else setmsg({type:'error',data:err});
  }
    return (
        <>
          {role===0?<RegisterStudent handleRegister={handleRegister}/>:
           role===1?<RegisterTeacher handleRegister={handleRegister}/>:
           role===2?<RegisterDepartment handleRegister={handleRegister}/>:
           <></>}
           <ShowMessage {...msg} header={'Register '+ role===0?'Student':role===1?'Teacher':"Department"}/>  
        </>
    )
}

export default Register
