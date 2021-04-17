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
// import BarChart from './Components/linegraph/linegraph.component.js'
function App() {
  const {user}  = useSelector(state => state.auth)
  // console.log(user)
  const userRoute={
    0:<Route path='/' component={HomePage} exact/>,
    1:<Route path='/' render={(props)=><TeacherPage/>} exact/>,
    2:<Route path='/' render={(props)=><DepttPage/>} exact/>
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
          <Route path='/markAttendance' render={(props)=><AddAttendanceForm  location={props.location} history={props.history} user='Teacher'/>}/>
          <Route path='/seeAttendance' render={(props)=><SeeAttendanceForm  location={props.location} history={props.history} user='Teacher'/>}/>
          {/* <Route path='/addClass' render={(props)=><AddClass/>}/>
          <Route path='/temp' render={(props)=><ShowAllClass/>}/> */}
          {user?<DispUserRoute state={user.role||0}/>:<></>}
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
