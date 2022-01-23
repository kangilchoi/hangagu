import React from 'react'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "component/Test";
import Main from "component/Main";
import Login from "component/login/Login";
import MyPage from "component/myPage/MyPage";
import Profile from "component/myPage/Profile";
import FindId from "component/login/FindId";
import FindIdResult from "component/login/FindIdResult";
import FindPassword from "component/login/FindPassword";
import FindPasswordQuestion from "component/login/FindPasswordQuestion";
import FindPasswordResult from "component/login/FindPasswordResult";
import Join from "component/login/Join";

function App() {

  return (
    <Router>
      <main>
        <Route exact path = "/test" component={Test} />
        <Route exact path = "/main" component={Main} />
        <Route exact path = "/login" component={Login} />
        <Route exact path = "/myPage" component={MyPage} />
        <Route exact path = "/Profile" component={Profile} />

        <Route exact path="/login/findId" component={FindId} />
        <Route exact path="/login/findIdResult" component={FindIdResult} />
        <Route exact path="/login/findPassword" component={FindPassword} />
        <Route exact path="login/FindPasswordQuestion" component={FindPasswordQuestion} />
        <Route exact path="/login/findPasswordResult" component={FindPasswordResult} />
        <Route exact path="/login/join" component={Join} />
      </main>
    </Router>
  );
}
export default App;