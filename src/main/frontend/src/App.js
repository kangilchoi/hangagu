import React from 'react'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "component/Test";
import Main from "component/Main";
import Login from "component/login/Login";
import MyPage from "component/myPage/MyPage";
import Profile from "component/myPage/Profile";
import CheckPassword from "component/myPage/CheckPw";
import UpdatePassword from "component/myPage/UpdatePw";
import DropMember from "component/myPage/DropMember";
import Join from "component/login/Join";

function App() {

  return (
    <Router>
      <main>
        <Route exact path = "/test" component={Test} />
        <Route exact path = "/main" component={Main} />
        <Route exact path = "/login" component={Login} />
        <Route exact path = "/myPage" component={MyPage} />
        <Route exact path = "/profile" component={Profile} />
        <Route exact path = "/checkPassword" component={CheckPassword} />
        <Route exact path = "/updatePassword" component={UpdatePassword} />
        <Route exact path = "/dropMember" component={DropMember} />
        <Route exact path = "/join" component={Join} />
      </main>
    </Router>
  );
}
export default App;