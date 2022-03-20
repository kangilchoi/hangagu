import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*css*/
//import "css/myPage/myPage.css"

function Header(){

    
}
export default Header;
//로그인 유저 id
export function getLoggedInUserName(){
    let user = localStorage.getItem('authenticatedUser');
    if(user===null) return '';
    return user;
}

export async function getLoggedInMemKey() {
    return await axios.get('/member/getMember/'+getLoggedInUserName()).then(res=> res.data.data.memKey );

}

export function createJWTToken(token){
    return 'Bearer ' + token
}
export function logout() {
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");
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