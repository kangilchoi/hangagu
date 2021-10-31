import React from 'react'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "component/Test";
import Main from "component/Main";
import Login from "component/login/Login";
import MyPage from "component/myPage/MyPage";
import Profile from "component/myPage/Profile";


function App() {

  return (
    <Router>
      <main>
        <Route exact path = "/test" component={Test} />
        <Route exact path = "/main" component={Main} />
        <Route exact path = "/login" component={Login} />
        <Route exact path = "/myPage" component={MyPage} />
        <Route exact path = "/Profile" component={Profile} />
      </main>
    </Router>
  );
}
export default App;