import React from 'react';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,  
} from "react-router-dom";
import { WrappedSignIn } from "./pages/User";
import { WrappedAdminSignIn, AdminPage } from "./pages/Admin";
import {ProtectedRoute} from './ProtectedRoute'
import {useSelector} from 'react-redux';
import UserPage from './pages/common/components/UserView'

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
