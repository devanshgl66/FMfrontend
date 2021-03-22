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
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main className='py-3'>
        <Container>
          
          <Route path='/' component={HomePage} exact/>
          <Route path='/login' render={(props)=><Login location={props.location} history={props.history} role={1}/>}/>
          <Route path='/register/0' render={(props)=><Register location={props.location} history={props.history} user='Student'/>}/>
          <Route path='/register/1' render={(props)=><Register location={props.location} history={props.history} user='Teacher'/>}/>
          <Route path='/markAttendance' render={(props)=><AddAttendanceForm  location={props.location} history={props.history} user='Teacher'/>}/>
          <Route path='/seeAttendance' render={(props)=><SeeAttendanceForm  location={props.location} history={props.history} user='Teacher'/>}/>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
