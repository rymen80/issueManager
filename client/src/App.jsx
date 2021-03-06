import React from 'react';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,  
} from "react-router-dom";
import { WrappedSignIn,UserPage } from "./pages/User";
import { WrappedAdminSignIn, AdminPage } from "./pages/Admin";
import {ProtectedRoute} from './ProtectedRoute'
import {useSelector} from 'react-redux';


function App() {
  const st = useSelector((state) => state.admin);
  const user = useSelector(state=>state.user)
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WrappedSignIn} />
        <Route exact path="/admin" component={WrappedAdminSignIn} />
        <ProtectedRoute path="/admin/adminpage" component={AdminPage} loggedIn={st.adminauth?true:false} redirectTo="/admin"/>   
        <ProtectedRoute exact path="/userpage" component={UserPage} loggedIn={user.userauth?true:false} redirectTo="/"/>      

      </Switch>
    </Router>
  );
}

export default App;
