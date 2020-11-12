import React from 'react';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./pages/common/components/Navbar";
import StatusCard from "../src/pages/common/components/StatusCard";
import CreateIssue from "../src/pages/common/components/CreateIssue";
import { WrappedSignIn } from "./pages/User";
import { WrappedAdminSignIn, AdminPage } from "./pages/Admin";
import {ProtectedRoute} from './ProtectedRoute'
import {useSelector} from 'react-redux';
import UserPage from './pages/User/UserView'

function App() {
  const st = useSelector((state) => state.admin);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WrappedSignIn} />
        <Route exact path="/admin" component={WrappedAdminSignIn} />
        <ProtectedRoute path="/admin/adminpage" component={AdminPage} loggedIn={st.adminauth?true:false} redirectTo="/admin"/>   
        <Route path="/users" component={UserPage} />      

      </Switch>
    </Router>
  );
}

export default App;
