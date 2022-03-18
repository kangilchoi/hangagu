import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Rules from "component/login/Rules";
import PopupDom from 'component/PopupDom';
import PopupPostCode from 'component/PopupPostCode';

/*css*/
import "css/login/join.css"
import "css/common.css"

/*js*/

/*img*/
import red_dot from "img/red_dot.gif"
import addr_api from "img/addr_api.gif"
import naver_login from "img/login_btn_naver.png"
//import naver_login from "img/naver.webp"

function Join(){
    // 팝업창 상태 관리
    const [isEmailPopOpen, setIsEmailPopOpen] = useState(false);
    
    const [isEmailChk, setIsEmailChk] = useState(false);
    const [authCode, setAuthCode] = useState('');

    const [member, setMember] = useState({
        memKey:null,
        memClassCd:null,
        memId:'',
        memPw:'',
        memPw2:'',
        memNm:null,
        memBirth:null,
        memAddr:null,
        memDetailAddr:null,
        memPhone:null,
        memTel:null,
        memMail:null,
        memMailReceptYn:false,
        memArea:null,
        memGrade:null,
        regDt:null,
        modDt:null,
        deleteYn:null,
        temrsAgreeYn:null
    });

    const [validation, setValidation] = useState({
        memId:true,
        memPw:true,
        memPw2:true,
        memNm:true,
        memBirth:true,
        memPhone:true,
        memTel:true,
        memMail:true
    });

    // 비구조화 할당을 통해 값 추출
    const {memKey,memClassCd,memId,memPw,memPw2,memNm,memBirth,memAddr,memDetailAddr,memPhone,memTel,memMail,memMailReceptYn,memArea,memGrade,regDt,modDt,deleteYn,temrsAgreeYn} = member;
    const {memIdV,memPwV,memPw2V,memNmV,memBirthV,memPhoneV,memTelV,memMailV} = validation;

    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {

    },[]);

    const onChange = (e) => {
        let type = e.target.name;
        let value = e.target.value;
    

        //주소 api형태로만 변경 가능
        if(type === 'memAddr') return false;

        setMember({
            ...member, // 기존의 객체를 복사한 뒤
            [type]: value // type 키를 가진 값을 value 로 설정
        });
        
        let validVal = validate(type,value);
        
        setValidation({
            ...validation, // 기존의 객체를 복사한 뒤
            [type+'V']: validVal // type 키를 가진 값을 value 로 설정
        });
    };

    // 팝업창 열기
    const openPostCode = () => {
            setIsEmailPopOpen(true);
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsEmailPopOpen(false);
    }

    //input별 유효성 체크
    const validate = (type,val) => {
        let res = false;

        if(type === 'memId'){
            res = checkMemId(val);
        }else if(type === 'memBirth'){
            res = checkMemBirth(val);
        }else if(type === 'memPhone'){
            res = checkMemPhoneNumber(val);
        }else if(type === 'memTel'){
            res = checkMemTel(val);
        }else if(type === 'memPw'){
            res = checkValidPw(val);
        }else if(type === 'memPw2'){
            res = checkSamePw(memPw,val);
        }

        return res;
    }

    const checkSamePw = (pw1,pw2) => {
        if(pw1===pw2) return true 
        else return false;
    }

    const authEmail = async() => {
        try{
            const response = await axios.get('http://localhost:8888/member/getMemberById/'+memId);
            console.log(response.data.code);
            if(response.data.code < 0){
                alert('사용 가능한 ID입니다.');
            }else{
                alert('중복 ID가 있습니다.');
                return(
                    <div>error</div>
                )
            }
        } catch (e) {
        console.log(e);
        }
    }
    //ID 중복확인
    const duplicateChkId = async() => {
        
        if(memId === ''){
            alert('ID를 입력해 주세요.');
            return;
        }else if(memIdV === false){
            alert('유효하지 않은 ID입니다.');
            return;
        }

        try{
            const response = await axios.get('http://localhost:8888/member/getMemberById/'+memId);
            console.log(response.data.code);
            if(response.data.code < 0){
                alert('사용 가능한 ID입니다.');
            }else{
                alert('중복 ID가 있습니다.');
                return(
                    <div>error</div>
                )
            }
        } catch (e) {
        console.log(e);
        }
    }

    // 공백확인 함수
    const checkExistData = (value) => {
        if (value == "") {
            return false;
        }
        return true;
    }
    
    const checkMemId = (v) => {
        //공백체크
        if (!checkExistData(v))
            return false;
 
        let idRegExp = /^[a-zA-z0-9]{6,16}$/; //영문 대소문자, 숫자만 사용, 최소 6~16를 만족해야하는 정규표현식
        if (!idRegExp.test(v)) {
            return false;
        }
        return true;
    }

    const checkValidPw = (v) => {
        //공백체크
        if (!checkExistData(v))
            return false;
 
        var idRegExp = /^[a-zA-z0-9]{6,16}$/; //영문 대소문자, 숫자만 사용, 최소 6~16를 만족해야하는 정규표현식
        if (!idRegExp.test(v)) {
            return false;
        }
        return true;
    }

    const checkMemBirth = (v) => {
        //공백체크
        if (!checkExistData(v))
            return false;
 
        let val = v.split('-');
        
        if(v.length != 10) return false;
        if(val.length != 3) return false;
        if(val[0].length != 4) return false;
        if(val[1].length != 2) return false;
        if(val[2].length != 2) return false;

        let idRegExp = /^[0-9]{4,4}$/;  //4글자 숫자
        if(!idRegExp.test(val[0])) return false;
        idRegExp = /^[0-9]{0,2}$/;  //2글자 숫자
        if(!idRegExp.test(val[1])) return false;
        idRegExp = /^[0-9]{0,2}$/;  //4글자 숫자
        if(!idRegExp.test(val[2])) return false;
        
        return true;
    }

    const checkMemPhoneNumber = (v) => {
        //공백체크
        if (!checkExistData(v))
            return false;
 
        let val = v.split('-');
        
        if(val.length !== 3) return false;
        if(val[2].length != 4) return false;

        let idRegExp = /^[0-9]{2,3}$/;  //2~3글자 숫자
        if(!idRegExp.test(val[0])) return false;
        idRegExp = /^[0-9]{3,4}$/;  //2글자 숫자
        if(!idRegExp.test(val[1])) return false;
        idRegExp = /^[0-9]{4,4}$/;  //4글자 숫자
        if(!idRegExp.test(val[2])) return false;
        
        return true;
    }

    const checkMemTel = (v) => {
        //공백체크
        if (!checkExistData(v))
            return true;
 
        let val = v.split('-');
        
        if(val.length !== 3) return false;
        if(val[2].length != 4) return false;

        let idRegExp = /^[0-9]{2,3}$/;  //2~3글자 숫자
        if(!idRegExp.test(val[0])) return false;
        idRegExp = /^[0-9]{3,4}$/;  //2글자 숫자
        if(!idRegExp.test(val[1])) return false;
        idRegExp = /^[0-9]{4,4}$/;  //4글자 숫자
        if(!idRegExp.test(val[2])) return false;
        
        return true;
    }





    return(
    <div id="wrap">

        <div id="container">
            <div id="contents">
                <div className="path">
                    <span>현재 위치</span>
                    <ol>
                        <li><a href="/">홈</a></li>
                        <li title="현재 위치"><strong>회원 가입</strong></li>
                    </ol>
                </div>

                <div className="titleArea">
                    <h2>JOIN US</h2>
                </div>

                <center>SNS 회원가입, 로그인을 원하시는 분은 아래 아이콘을 클릭하시면 해당페이지로 이동합니다.
                    <br/><br/>
                    <p><a href="//www.furnimass.com/member/login.html"><img style={{width:"250px"}} src={naver_login}/></a></p>
                </center>
                <br/><br/>

                {/* form */}
                <form id="joinForm" name="joinForm">
                    <div className="xans-element- xans-member xans-member-join">
                      
                        <h3 className=" ">기본정보</h3>
                        <p className="required ">
                            <img src={red_dot} alt="필수"/> 필수입력사항
                        </p>
                        <div className="boardWrite">
                            <table border="1" summary="">
                                <caption>회원 기본정보</caption>
                                <tbody>
                                    <tr className="">
                                        <th scope="row">회원구분
                                            <img src={red_dot} alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="memGrade" name="memGrade" value="p" type="radio" checked="checked" onChange={onChange} />
                                            <label>개인회원</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            아이디 <img src={red_dot} alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="memId" name='memId' className="inputTypeText" type="text" style={{verticalAlign : "-10px"}} onChange={onChange} value={memId || ''} />
                                            <span id="idMsg" style={{verticalAlign : "-10px"}}> (영문소문자/숫자, 4~16자)</span>
                                            
                                            <div className="btnArea M b_right" >
                                                <span className="black" style={{cursor:'pointer'}} onClick={duplicateChkId}>중복 확인</span>
                                            </div>

                                            <br/>
                                            {
                                                (() => {
                                                    if(memIdV===false)
                                                        return <><span style={{color:'red'}}>유효하지 않습니다.</span></>
                                                })()
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">비밀번호 <img src={red_dot} alt="필수"/></th>
                                        <td>
                                            <input id="memPw" name="memPw" type="password" value={memPw || ''} onChange={onChange}/>
                                            (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)
                                            <br/>
                                            {
                                                (() => {
                                                    if(memPwV===false)
                                                        return <><span style={{color:'red'}}>유효하지 않습니다.</span></>
                                                })()
                                            }
                                        </td>
                                    </tr> 
                                    <tr>
                                        <th scope="row">비밀번호 확인<img src={red_dot} alt="필수"/></th>
                                        <td>
                                            <input id="memPw2" name="memPw2" type="password" value={memPw2 || ''} onChange={onChange}/>
                                            <br/>
                                            {
                                                (() => {
                                                    if(memPw2V===false)
                                                        return <><span style={{color:'red'}}>비밀번호가 동일하지 않습니다.</span></>
                                                })()
                                            }
                                            <span id="pwConfirmMsg"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" id="nameTitle">이름<img src={red_dot} alt="필수"/></th>
                                        <td>
                                            <span id="nameContents">
                                            <input id="memNm" name="memNm" className="ec-member-name" type="text" onChange={onChange} value={memNm || ''} />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">
                                            생년월일
                                            <img src={red_dot} className="" alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="memBirth" name="memBirth" type="text" onChange={onChange} value={memBirth || ''} />
                                            (ex:1990-09-09)
                                            <br/>
                                            {
                                                (() => {
                                                    if(memBirthV===false)
                                                        return <><span style={{color:'red'}}>유효하지 않습니다.</span></>
                                                })()
                                            }
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">주소 <img src={red_dot} alt="필수"/></th>
                                        <td>
                                            {/* 주소 api */}
                                            <img src={addr_api} style={{cursor:'pointer'}}alt="우편번호" onClick={openPostCode}/>
                                            <div id='popupDom'>
                                                {isEmailPopOpen && (
                                                    <PopupDom>
                                                        <PopupPostCode onClose={closePostCode} setMember={setMember} member={member}/>
                                                    </PopupDom>
                                                )}
                                            </div>

                                            <br/>
                                            <input id="memAddr" name="memAddr" className="inputTypeText" type="text" onChange={onChange} value={memAddr || ''} /> 기본주소(우편 주소 버튼 이용)
                                            <br/>
                                            <input id="memDetailAddr" name="memDetailAddr" className="inputTypeText" type="text" onChange={onChange} value={memDetailAddr || ''}/> 나머지주소
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">
                                         일반전화
                                        </th>
                                        <td>
                                            <input id="memTel" name="memTel" className="inputTypeText" type="text" onChange={onChange} value={memTel || ''} /> 
                                            <br/>
                                            {
                                                (() => {
                                                    if(memTelV===false)
                                                        return <><span style={{color:'red'}}>유효하지 않습니다.</span></>
                                                })()
                                            }
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">
                                            휴대전화
                                            <img src={red_dot} className="" alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="memPhone" name="memPhone" className="inputTypeText" type="text" onChange={onChange} value={memPhone || ''} /> 
                                            <br/>
                                            {
                                                (() => {
                                                    if(memPhoneV===false)
                                                        return <><span style={{color:'red'}}>유효하지 않습니다.</span></>
                                                })()
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            이메일
                                            <img src={red_dot} className="" alt="필수"/>

                                        </th>
                                        <td>
                                            <input id="memMail" name="memMail" type="text" onChange={onChange} value={memMail || ''} />
                                            <span id="emailMsg"></span>
                                            
                                            
                                            <div className="btnArea M b_right" >
                                                <span className="black" onClick={authEmail}>이메일 인증</span>
                                            </div>
                                            
                                            <div className="b_right" >
                                                <img src={red_dot} className="" alt="필수" style={{verticalAlign : "-10px"}} />
                                                <span style={{verticalAlign : "-10px"}}>
                                                입력하신 정보로 본인인증을 진행합니다.
                                                </span>
                                            </div>
                                            
                                            <br/>
                                            {
                                                isEmailChk && (
                                                    <input id="authCode" name="authCode" className="inputTypeText" type="text" onChange={onChange} value={authCode || ''} /> 
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">이메일 수신여부 <img src={red_dot} alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="emailY" name="emailY" value="T" type="radio" onChange={onChange} checked={memMailReceptYn} />
                                            <label>수신함</label>
                                            <input id="emailN" name="emailN" value="F" type="radio" onChange={onChange} checked={!memMailReceptYn} />
                                            <label>수신안함</label>
                                            <p>쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수 있습니다.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div>
                            <Rules/>
                            <div className="ec-base-button">
                                <div className="btnArea L b_center">
                                    <a href="#none" className="black">회원가입</a>
                                </div>
                                <div className="btnArea L b_center">
                                    <a href="/index.html" className="gray">취소</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}


export default Join;