import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

/*css*/
import "css/login/findId.css"
import "css/common.css"

/*js*/

/*img*/

function FindId(){
    let history = useHistory();

    const [memGrade, setMemGrade] = useState('STAFF');
    const [findType, setFindType] = useState('email');
    
    const [inputNm, setInputNm] = useState('');

    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');

    const onChange = (e) => {
        let type = e.target.name;
        let value = e.target.value;


        if(type === 'memGrade')
            setMemGrade(value);
        else if(type === 'findType'){
            setFindType(value);
        }else if(type === 'inputNm'){
            setInputNm(value);
        }else if(type === "inputEmail")
            setInputEmail(value);
        else if(type === "inputPhone")
            setInputPhone(value);
    }

    

    const clickFindId = async(e) =>{
        e.preventDefault();

        let url = '/auth/';
            let params = {
                "memMail":inputEmail
                ,"memPhone":inputPhone
                ,"memGrade":memGrade
                ,"memNm":inputNm
            };

            if(findType === 'email'){
                url+='findIdByMail';
            }
            else{
                url+='findIdByPhone';
            }

            axios.post(url,params).then(response => {
                if(response.data.code >0){
                    alert(response.data.data.length+'건 조회되었습니다.');
                    history.push({
                        pathname: "/login/findIdResult",
                        state: {list: response.data.data}
                    });
                }else if(response.data.code == 0){
                    alert("조회되는 회원이 없습니다.");
                }else{
                    return(
                        <div>error</div>
                    )
                }
        
            }).catch(error => {
                // ... 에러 처리
                console.log(error);
                return(
                    <div>error</div>
                )
            });
    };

    return(
        <div id="wrap">
        <div id="container">
            <div id="contents">
                <div className="path">
                    <span>현재 위치</span>
                    <ol><li><a href="/">홈</a></li>
                        <li title="현재 위치"><strong>아이디 찾기</strong></li>
                    </ol></div>

                <div className="titleArea">
                    <h2>FIND ID</h2>
                </div>

                <form id="findIdForm" name="findIdForm" action="/exec/front/Member/findId/" method="post" target="_self" encType="multipart/form-data">
                        <input id="returnUrl" name="returnUrl" value="/member/id/findIdResult.html" type="hidden"/>
                        <div className="xans-element- xans-member xans-member-findid ">

                        <div className="findId">
                            <fieldset>
                                <legend>아이디 찾기</legend>
                                <p className="member"><strong>회원유형</strong>
                                    <select id="memGrade" name="memGrade" onChange={onChange}>
                                        <option value="STAFF">개인회원</option>
                                    </select>
                                </p>
                                <p className="check">
                                    <input id="findType" name="findType" value="email" type="radio" onChange={onChange} checked={findType === "email"}/>
                                    <label>이메일</label>
                                    <input id="findType" name="findType" value="phone" type="radio" onChange={onChange} checked={findType === "phone"}/>
                                    <label><span id="search_type_mobile_lable" style={{display:"inline"}}>휴대폰번호</span></label>
                                </p>
                                <p id="name_view" className="name">
                                    <strong id="name_lable">이름</strong> 
                                    <input id="inputNm" name="inputNm" className="lostInput" style={{height:"28px"}} value={inputNm} type="text" onChange={onChange}/>
                                </p>
                                {
                                    (findType==='email')&&
                                    <p id="email_view" className="email">
                                        <strong>이메일로 찾기</strong>
                                        <input id="inputEmail" name="inputEmail" style={{height:"28px"}} value={inputEmail} placeholder="hangagu@naver.com" type="text" onChange={onChange}/>
                                    </p>
                                }
                                {
                                    (findType==='phone')&&
                                    <p id="phone_view" className="phone"><strong>휴대폰 번호로 찾기</strong>
                                        <input id="inputPhone" name="inputPhone" style={{height:"28px"}} value={inputPhone} placeholder="010-0000-0000" type="text" onChange={onChange}/>
                                    </p>
                                }
                                <div className="ec-base-button" style={{padding:"15px 0"}}>
                                    <div className="btnArea b_full b_center">
                                        <a href="" className="black" style={{cursor:"pointer"}} onClick={clickFindId}>확인</a>
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

export default FindId;