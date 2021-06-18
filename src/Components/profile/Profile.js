import React from 'react'
import { connect } from 'react-redux'
import DeptProfile from './Dept'
import StudentProfile from './Student'
import TeacherProfile from './Teacher'

const Profile = (props) => {
    //re route to login page
    if(!props.user)
        return (<>Login First.</>)
    switch(props.user.role){
        case 0:return (<>{<StudentProfile/>}</>)
        case 1:return (<>{<TeacherProfile/>}</>)
        case 2:return (<>{<DeptProfile/>}</>)
        default:return (<>{<h1>Invalid page.Please go to home page.</h1>}</>)
    }
}

export default connect((state)=>{return {user:state.auth.user}})(Profile)
