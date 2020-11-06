import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './pages/common/components/Navbar';
import StatusCard from '../src/pages/common/components/StatusCard'
import CreateIssue from '../src/pages/common/components/CreateIssue'
import {
  WrappedSignUp,
  WrappedSignIn,
} from './pages/Viewer';



function App() {
  return (
    <Router>
      <Route path='/signin'/>
      <Route path='/signup' component={WrappedSignUp}/>
      <Route exact path="/" >
      <Navbar/>
        <h1>Welcome to the about</h1>
       
      </Route>
    </Router>
  );
}

export default App;
