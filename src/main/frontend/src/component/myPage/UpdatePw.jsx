import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import {useLocation} from "react-router";
/*css*/
import "css/myPage/memberModify.css"

/*js*/

/*img*/
import red_dot from "img/red_dot.gif"


function UpdatePw(){
    let history = useHistory();
    const location = useLocation();

    const [isCorrectPw, setIsCorrectPw] = useState(false);   //pw확인 완료
    const [pw, setPw] = useState(location.state.pw);

    const [newPw1, setNewPw1] = useState('');   //pw확인 완료
    const [newPw1V, setNewPw1V] = useState(false);

    const [newPw2, setNewPw2] = useState('');
    
    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {

    },[]);

    const onChange = (e) => {
        let type = e.target.id;
        let value = e.target.value;
       
         if(type === 'newPw1'){
            setNewPw1(value);
            if(checkValidPw(value)){
                setNewPw1V(true);
            }else {
                setNewPw1V(false);
            }
        }else if(type === 'newPw2'){
            setNewPw2(value);
        }
        

      };

    

    // 공백확인 함수
    const checkExistData = (value) => {
        if (value == "") {
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

    const isSameNewPw = (pw1,pw2) => {
        if(pw1===pw2) return true 
        else return false;
    }

    const isSamePw = (pw,newPw1) => {
        if(pw===newPw1) return true 
        else return false;
    }

    //axios update member
    const updateMemPw = async(e) =>{
        e.preventDefault();

        //신규 pw2개 동일여부
        if(isSameNewPw(newPw1,newPw2)){

            //신규 기존 pw 동일여부
            if(isSamePw(pw,newPw1)){
                alert('기존과 동일한 비밀번호입니다.');
                return;
            }

            if(!checkValidPw(newPw1)){
                alert('유효하지 않은 비밀번호입니다.');
                return;
            }
            try{
                
                const response = await axios.get('http://localhost:8888/member/updatePwById/kangil',{params: {memPw:newPw1}});
                if(response.data.code >=0){
                    alert("변경되었습니다.");
                }else{
                    alert("변경에 실패하였습니다.");
                }
            } catch (e) {
                console.log(e);
            }
        }else{
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        //회원정보로 이동
        history.push("/profile");
    };

    //axios member(pw)
    const fetchPw = async(e) =>{
        e.preventDefault();

        try{
            const response = await axios.get('http://localhost:8888/member/isCorrectPwById/kangil',{params: {memPw:pw}});
            if(response.data.code >=0){
                alert("확인되었습니다.");
            }else{
                alert("비밀번호가 일치하지 않습니다.");
            }
        } catch (e) {
        console.log(e);
        }
    };

    return(
    <div id="wrap">

        <div id="container">
            <div id="contents">
                <div className="path">
                    <span>현재 위치</span>
                    <ol>
                        <li><a href="/">홈</a></li>
                        <li title="현재 위치"><strong>비밀번호 변경</strong></li>
                    </ol>
                </div>

                <div className="titleArea">
                    <h2 style={{fontWeight:"bold"}}>PASSWORD</h2>
                </div>

                <div className="xans-element- xans-myshop xans-myshop-asyncbenefit">
                    
                    

                    <form id="editForm" name="editForm" action="" method="post" target="_self">
                        <div className="xans-element- xans-member xans-member-edit">
                            <h3 className=" ">비밀번호 확인</h3>
                            <p className="required">
                                <img src={red_dot} alt="필수"/>필수입력사항
                            </p>
                            
                            <div className="boardWrite">
                                <table border="1" summary="">
                                    <caption>회원 기본정보</caption>
                                    <tbody>
                                        <tr>
                                            <th scope="row">신규 비밀번호 <img src={red_dot} alt="필수"/></th>
                                                <td>
                                                    <input id="newPw1" name="newPw1" type="password" value={newPw1 || ''} onChange={onChange}/> 
                                                    (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)
                                                    <br/>
                                                    {
                                                        (() => {
                                                            if(newPw1.length ===0){
                                                                return <><span style={{color:'red'}}>password를 입력해주세요.</span></>
                                                            }else if(newPw1V===false)
                                                                return <><span style={{color:'red'}}>유효하지 않습니다.</span></>
                                                        })()
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <th scope="row">신규 비밀번호 확인 <img src={red_dot} alt="필수"/></th>
                                                <td>
                                                    <input id="newPw2" name="newPw2" type="password" value={newPw2 || ''} onChange={onChange} /> 
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="ec-base-button">
                                <div className="btnArea L b_center">
                                    <a href="" className="black" onClick={(e) => e,updateMemPw}>비밀번호 변경</a>
                                </div>
                                <div className="btnArea L b_center">
                                    <Link to="/profile"> 
                                        <span href="" className="gray" >취소</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>    
    );
}

export default UpdatePw;