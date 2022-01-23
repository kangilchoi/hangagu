import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

/*css*/
import "css/login/findPassword.css"
import "css/common.css"

/*js*/

/*img*/
import red_dot from "img/red_dot.gif"

function FindPw(){
    let history = useHistory();
    
    const [memGrade, setMemGrade] = useState('STAFF');
    const [inputId, setInputId] = useState('');
    const [inputNm, setInputNm] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    
    const [authEmail, setAuthEmail] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [inputAuthCode, setInputAuthCode] = useState('');

    const clickFindPw = async(e) =>{
        e.preventDefault();
        try{
            const response = await axios.get('http://localhost:8888/member/findMemMailById',{params: {id:inputId,grade:memGrade,email:inputEmail,name:inputNm}});
            
            if(response.data.code > 0){
                setAuthEmail(response.data.data);
                setIsAuth(true);
                getAuthCode(response.data.data);
            }else{
                return(
                    <div>error</div>
                )
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getAuthCode = async(authEmail) => {
        try{
            const response = await axios.get('http://localhost:8888/member/verifyEmail/'+authEmail);
            
            if(response.data.code > 0){
                setAuthCode(response.data.data);
                alert('인증코드를 입력해주세요.');
            }else{
                alert('인증메일 발송을 실패하였습니다.');
                return(
                    <div>error</div>
                )
            }
        } catch (e) {
            console.log(e);
        }
    }

    const chkAuthCode = (e) => {
        e.preventDefault();
        if(authCode+'' === inputAuthCode+''){
            alert('인증이 완료되었습니다.');
            history.push({
                pathname: 'updatePassword',
                state: {pw: 'updatePassword',id:inputId}
            });
            
        }else{
            alert('인증코드가 다릅니다.');
        }
    }
    

    const onChange = (e) => {
        let type = e.target.name;
        let value = e.target.value;


        if(type === 'memGrade'){
            setMemGrade(value);
        }else if(type === 'inputNm'){
            setInputNm(value);
        }else if(type === "inputEmail")
            setInputEmail(value);
        else if(type === "inputId"){
            setInputId(value);
        }else if(type === "inputAuthCode"){
            setInputAuthCode(value);
        }    
    }

    return(
        <div id="wrap">
        <div id="container">
        <div id="contents">
            <div className="titleArea">
                <h2>FIND PASSWORD</h2>
            </div>

            <form id="findPasswdForm" name="findPasswdForm" action="" method="post" target="_self" encType="multipart/form-data">
                <input id="nextUrl" name="nextUrl" value="/member/passwd/find_passwd_question.html" type="hidden"/>
                <div className="xans-element- xans-member xans-member-findpasswd ">
                    <div className="findPw">
                        <fieldset>
                            <legend>비밀번호 찾기 1단계 정보 입력</legend>
                            <p className="member"><strong>회원유형</strong>
                                <select id="memGrade" name="memGrade" onChange={onChange}>
                                    <option value="STAFF">개인회원</option>
                                </select>
                            </p>
                          
                            <p className="id">
                                <strong>아이디</strong>
                                <input id="inputId" name="inputId" className="lostInput" value={inputId} style={{height:"26px",width:"176px"}} type="text" onChange={onChange} />
                            </p>
                            <p id="name_view" className="name" >
                                <strong id="name_lable">이름</strong>
                                <input id="inputNm" name="inputNm" className="lostInput ec-member-name" value={inputNm} style={{height:"26px",width:"176px"}} type="text" onChange={onChange} />
                            </p>
                            <p id="email_view" className="email" >
                                <strong>이메일로 찾기</strong>
                                <input id="inputEmail" name="inputEmail" className="lostInput" placeholder="" value={inputEmail} style={{height:"26px",width:"176px"}} type="text" onChange={onChange} />
                            </p>

                            {
                                (isAuth)&&
                                <p>   
                                    <strong style={{verticalAlign:"-10px"}}>인증번호</strong>
                                    <input id="inputAuthCode" name="inputAuthCode" className="lostInput" placeholder="" value={inputAuthCode} style={{height:"28px",width:"80px",verticalAlign:"-10px"}} type="text" onChange={onChange} />
                                    <span className="btnArea M b_right" onClick={chkAuthCode}><span className="black" style={{cursor: "pointer"}}>인증</span></span>
                                    <img src={red_dot} alt="" style={{verticalAlign:"-0px"}} />
                                    이메일로 수신한 인증번호를 입력
                                </p>
                            }

                            <div className="ec-base-button" style={{padding:"15px 0"}}>
                                <div className="btnArea b_full b_center">
                                    <a href="" onClick={clickFindPw} className="black">확인</a>
                                </div>
                            </div>
                         </fieldset>
                    </div>
                </div>
            </form>
        </div>
        </div>
        </div>
    );
}
export default FindPw;