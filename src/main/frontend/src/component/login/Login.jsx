import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import * as Auth from 'component/Auth';
import { Link } from 'react-router-dom'
import * as Header from 'component/Header';

/*css*/
import "css/login/login.css"


/*img*/
import login_btn_kakao from "img/login_btn_kakao.png"

function Login(props) {
    const history = useHistory();
    const [id,setId] = useState('');
    const [pw,setPw] = useState('');

    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
        if(props.location.state){
            //console.log(props.location.state.id.chkId);
            setId(props.location.state.id.chkId);
        }
    },[]);

    const onChange = (e) => {
        let type = e.target.name;
        let value = e.target.value;


        if(type === 'id'){
            setId(value);
        }else if(type === 'pw'){
            setPw(value);
        } 
    }

    //모든 Request/Response가 목적지에 도달하기 전에 Request에 원하는 내용을 담아 보내거나 원하는 코드를 실행
    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            config.headers['Content-Type'] = 'application/json';
            return config;
        },
        error => {
            Promise.reject(error)
    });

    //로그인
    const  onLogin = (e) => {
        e.preventDefault();

        let params = {
            "username":id
            ,"password":pw
        };

        axios.post('/auth/login',params).then(response => {

            registerJwt(id,response.data.token);
            
            //Header.login;
          
            window.location.replace("/header")
        }).catch(error => {
            // ... 에러 처리
            console.log(error);
            return(
                <div>error</div>
            )
        });
    }

    const registerJwt = (username, token) =>{
        //console.log("===registerSuccessfulLoginForJwt===")
        localStorage.setItem('token', token);
        localStorage.setItem('authenticatedUser', username);
        
    }

    return(
        <div id="wrap">
            <div id="container">
                <div id="contents">

                    <div className="titleArea">
                        <h2>LOGIN</h2>
                    </div>

                    <div className="login_box">
                        <ul>
                            <li>
                                <form name="" encType="multipart/form-data">
                                    <div className="xans-element- xans-member xans-member-login ">
                                        <div className="login">
                                            <fieldset>
                                                <legend>회원로그인</legend>
                                                <label className="id ePlaceholder" title="아이디">
                                                    <input id="id" name="id" className="inputTypeText" placeholder="아이디" value={id} type="text" onChange={onChange}/>
                                                </label>
                                                <label className="password ePlaceholder" title="비밀번호">
                                                    <input id="pw" name="pw" value={pw} type="password" placeholder="비밀번호" onChange={onChange}/>
                                                </label>
                                                <div className="btnArea Login center">
                                                    <a href="" className="black" onClick={onLogin}>로그인</a>
                                                </div>
                                                <div className="find">
                                                     <Link to="/login/findId">
                                                        <span className="black">-아이디찾기 </span>
                                                    </Link>
                                                    <Link to="/login/findPassword">
                                                        <span className="black"> -비밀번호찾기</span>
                                                    </Link>
                                                    
                                                </div>
                                                {/* 
                                                <div className="snsArea">
                                                    <ul>
                                                        <li className="">
                                                            <a href="#">
                                                                <img src={login_btn_kakao} alt="카카오계정 로그인"/></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                */}
                                                <div className="link">
                                                    <div className="btnArea Login center">
                                                        <Link to="/join">
                                                        <span className="gray">회원가입</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;