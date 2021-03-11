import './App.css';
import HomePage from './Screens/HomePage';
import Header from './Components/Header';
import Register from './Components/Register';
import Login from './Components/Login'

import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import Experiment from './Components/Experiment';
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main className='py-3'>
        <Container>
          
          <Route path='/' component={HomePage} exact/>
          <Route path='/login' render={(props)=><Login location={props.location} history={props.history} role={1}/>}/>
          <Route path='/register' render={(props)=><Register location={props.location} history={props.history} user='Student'/>}/>
          <Route path='/experiment' render={(props)=><Experiment/>}/>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
