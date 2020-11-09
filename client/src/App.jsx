import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import Navbar from './pages/common/components/Navbar';
import StatusCard from '../src/pages/common/components/StatusCard';
import CreateIssue from '../src/pages/common/components/CreateIssue';
import ViewIssues from '../src/pages/common/components/ViewIssues';
import {
  WrappedSignUp,
  WrappedSignIn,
} from './pages/Viewer';



function App() {
  return (
    <Router>
      <Route path='/signin' component={WrappedSignIn}/>
      <Route path='/signup' component={WrappedSignUp}/>
      <Route exact path="/" >
      <Redirect to="/signin" />
      </Route>
      <Navbar/>
        <h1>Welcome to the about</h1> 
    </Router>
  );
}

export default App;
