import './App.css';
import HomePage from './Screens/HomePage';
import Header from './Components/Header';
import Register from './Components/Register';
import Login from './Components/Login'

import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import { AddAttendanceForm } from './Components/MarkAttendance';
import { SeeAttendanceForm } from './Components/SeeAttendance';
import DepttPage from './Screens/DepttPage';
import { useSelector } from 'react-redux';
import TeacherPage from './Screens/TeacherPage';
import VerifyEmail from './Components/VerifyEmail';
import StudentPage from './Screens/StudentPage';
// import BarChart from './Components/linegraph/linegraph.component.js'
function App() {
  const {user}  = useSelector(state => state.auth)
  // console.log(user)
  const userRoute={
    'home':<Route path='/' render={(props)=><HomePage {...props}/>} exact/>,
    0:<Route path='/' render={(props)=><StudentPage {...props}/>} exact/>,
    1:<Route path='/' render={(props)=><TeacherPage {...props}/>} exact/>,
    2:<Route path='/' render={(props)=><DepttPage {...props}/>} exact/>
  }
  function DispUserRoute({state}){
    return <>{userRoute[state]}</>
  }
  return (
    <BrowserRouter>
      <Header/>
      <main className=''>
        <Container fluid>
          {/* <Temp/> */}
          
          {/* <BarChart></BarChart> */}
          <Route path='/login' render={(props)=><Login location={props.location} history={props.history} role={1}/>}/>
          <Route path='/register' render={(props)=><Register location={props.location} history={props.history}/>}/>
          <Route path='/verifyAccount/:role' render={(props)=><VerifyEmail {...props}/>}/>
          <Route path='/markAttendance' render={(props)=><AddAttendanceForm  location={props.location} history={props.history} user='Teacher'/>}/>
          <Route path='/seeAttendance' render={(props)=><SeeAttendanceForm  location={props.location} history={props.history} user='Teacher'/>}/>
          {/* <Route path='/addClass' render={(props)=><AddClass/>}/>
          <Route path='/temp' render={(props)=><ShowAllClass/>}/> */}
          {user?<DispUserRoute state={user.role}/>:<><DispUserRoute state='home'/></>}
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
