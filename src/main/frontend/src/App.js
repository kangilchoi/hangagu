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
import FindId from "component/login/FindId";
import FindIdResult from "component/login/FindIdResult";
import FindPassword from "component/login/FindPassword";
import FindPasswordQuestion from "component/login/FindPasswordQuestion";
import FindPasswordResult from "component/login/FindPasswordResult";
import Header from 'component/Header';
import Footer from 'component/Footer';

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {

  return (
    <Router>
      <Header>
      </Header>
      <br/><br/><br/><br/><br/>
      <main>
        <Route exact path = "/header" component={Header} />
        <Route exact path = "/main" component={Main} />
        <Route exact path = "/login" component={Login} />
        <Route exact path = "/myPage" component={MyPage} />
        <Route exact path = "/profile" component={Profile} />
        <Route exact path = "/checkPassword" component={CheckPassword} />
        <Route exact path = "/updatePassword" component={UpdatePassword} />
        <Route exact path = "/dropMember" component={DropMember} />
        <Route exact path = "/join" component={Join} />
        <Route exact path="/login/findId" component={FindId} />
        <Route exact path="/login/findIdResult" component={FindIdResult} />
        <Route exact path="/login/findPassword" component={FindPassword} />
        <Route exact path="login/FindPasswordQuestion" component={FindPasswordQuestion} />
        <Route exact path="/login/findPasswordResult" component={FindPasswordResult} />
        <Route exact path="/login/join" component={Join} />
      </main>
      <Footer>
		</Footer>
    </Router>
  );
}
export default App;