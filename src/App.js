import './App.css';
import HomePage from './Screens/HomePage';
import Header from './Components/Header';
import Register from './Components/Register';
import Login from './Components/Login'

import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import Experiment from './Components/Experiment';
import { AddAttendanceForm } from './Components/MarkAttendance';
import { SeeAttendanceForm } from './Components/SeeAttendance';
import Temp from './Components/Temp';
import AddClass from './Components/AddClass';
import ShowAllClass from './Components/ShowAllClass';
import DepttPage from './Screens/DepttPage';
// import BarChart from './Components/linegraph/linegraph.component.js'
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main className=''>
        <Container>
          {/* <Temp/> */}
          <Route path='/' component={HomePage} exact/>
          {/* <BarChart></BarChart> */}
          <Route path='/login' render={(props)=><Login location={props.location} history={props.history} role={1}/>}/>
          <Route path='/register' render={(props)=><Register location={props.location} history={props.history}/>}/>
          <Route path='/markAttendance' render={(props)=><AddAttendanceForm  location={props.location} history={props.history} user='Teacher'/>}/>
          <Route path='/seeAttendance' render={(props)=><SeeAttendanceForm  location={props.location} history={props.history} user='Teacher'/>}/>
          <Route path='/addClass' render={(props)=><AddClass/>}/>
          <Route path='/temp' render={(props)=><ShowAllClass/>}/>
          <Route path='/deptt' render={(props)=><DepttPage/>}/>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
