import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './pages/common/components/Navbar';
import StatusCard from '../src/pages/common/components/StatusCard'

import {
  WrappedSignUp,
  WrappedSignIn,
} from './pages/Viewer';



function App() {
  return (
    <Router>
      <Navbar/>
      <Route path='/signup' component={WrappedSignUp}/>
      <Route path='/signin' component={WrappedSignIn}/>
      <Route exact path="/">
        <h1>Welcome to the about</h1>
      <div className="statusCard">
        <StatusCard  title="Total Issues:" number="10"/>
        <StatusCard  title="Total Users:" number="10"/>
      </div>
      </Route>
    </Router>
  );
}

export default App;
