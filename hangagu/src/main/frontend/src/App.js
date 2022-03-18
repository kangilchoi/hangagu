import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import HeaderComponent from './component/HeaderComponent';
// import FooterComponent from './component/FooterComponent';

import Main from "component/Main";

import AddOrderComponent from 'component/order/AddOrderComponent';
import ListOrderComponent from 'component/order/ListOrderComponent';
import ListOrderRMComponent from 'component/order/ListOrderRMComponent';
import CompleteOrderComponent from 'component/order/CompleteOrderComponent';

import ListCartComponent from 'component/cart/ListCartComponent';

import ListWishComponent from 'component/wishList/ListWishComponent';

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

function App() {

  return (
    <div>
      <Router>
        <Header/>
        <br/><br/><br/><br/><br/>
          <div className="container">
            <Switch>
              <Route path = "/header" component={Header} />
              <Route path = "/myPage" component={MyPage} />
              <Route path = "/profile" component={Profile} />
              <Route path = "/checkPassword" component={CheckPassword} />
              <Route path = "/updatePassword" component={UpdatePassword} />
              <Route path = "/dropMember" component={DropMember} />
              <Route path = "/join" component={Join} />
              <Route path = "/login/findId" component={FindId} />
              <Route path = "/login/findIdResult" component={FindIdResult} />
              <Route path = "/login/findPassword" component={FindPassword} />
              <Route path = "login/FindPasswordQuestion" component={FindPasswordQuestion} />
              <Route path = "/login/findPasswordResult" component={FindPasswordResult} />
              <Route path = "/login/join" component={Join} />
              <Route path = "/main" component={Main} />
              <Route path = "/login" component={Login} />
              <Route path = "/" exact component = {Main}></Route>
              <Route path = "/order/get" component = {ListOrderComponent}></Route>
              <Route path = "/order/getrm" component = {ListOrderRMComponent}></Route>
              <Route path = "/order/addView" component = {AddOrderComponent}></Route>
              <Route path = "/order/orderResult" component = {CompleteOrderComponent}></Route>
              <Route path = "/cart/get" component = {ListCartComponent}></Route>
              <Route path = "/interestProduct/get" component = {ListWishComponent}></Route>
            </Switch>
          </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
