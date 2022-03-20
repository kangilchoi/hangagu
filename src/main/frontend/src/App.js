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
import Qa from "component/community/Qa";
import QaDetail from "component/community/QaDetail";
import Qna from "component/community/write/Qna"
import Header from 'component/Header';
import Footer from 'component/Footer';

import AddOrderComponent from 'component/order/AddOrderComponent';
import ListOrderComponent from 'component/order/ListOrderComponent';
import ListOrderRMComponent from 'component/order/ListOrderRMComponent';
import CompleteOrderComponent from 'component/order/CompleteOrderComponent';

import ListCartComponent from 'component/cart/ListCartComponent';

import ListWishComponent from 'component/wishList/ListWishComponent';

import ListAddrComponent from 'component/addr/ListAddrComponent';
import AddAddrComponent from 'component/addr/AddAddrComponent';

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
        <Route exact path="/community/Qa" component={Qa} />
        <Route exact path="/community/QaDetail/:bdKey" component={QaDetail} />
        <Route exact path="/community/write/Qna" component={Qna} />
        <Route path = "/login/join" component={Join} />
        <Route path = "/" exact component = {Main}></Route>
		<Route path = "/order/get" component = {ListOrderComponent}></Route>
		<Route path = "/order/getrm" component = {ListOrderRMComponent}></Route>
		<Route path = "/order/addView" component = {AddOrderComponent}></Route>
		<Route path = "/order/orderResult" component = {CompleteOrderComponent}></Route>
		<Route path = "/cart/get" component = {ListCartComponent}></Route>
		<Route path = "/interestProduct/get" component = {ListWishComponent}></Route>
		<Route path = "/addr/get" component = {ListAddrComponent}></Route>
		<Route path = "/addr/addView" component = {AddAddrComponent}></Route>
      </main>
      <Footer>
		</Footer>
    </Router>
  );
}
export default App;