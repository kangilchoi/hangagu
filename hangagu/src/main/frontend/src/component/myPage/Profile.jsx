import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupDom from 'component/PopupDom';
import PopupPostCode from 'component/PopupPostCode';
import { Link } from 'react-router-dom'

/*css*/
import "css/myPage/memberModify.css"

/*js*/

/*img*/
import red_dot from "img/red_dot.gif"
import addr_api from "img/addr_api.gif"


function Profile(){
    //조회, 변경 화면 변수
    const [isUpdate,setIsUpdate] = useState(false);
    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [member, setMember] = useState({
        memKey:'MK210004',
        memClassCd:null,
        memId:null,
        memPw:null,
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
    });

    const [validation, setValidate] = useState({
        memClassCd:true,
        memId:true,
        memPw:true,
        memNm:true,
        memBirth:true,
        memAddr:true,
        memDetailAddr:true,
        memPhone:true,
        memTel:true,
        memMail:true,
        memMailReceptYn:true,
    });
    
    // 비구조화 할당을 통해 값 추출
    const {memKey,memClassCd,memId,memPw,memNm,memBirth,memAddr,memDetailAddr,memPhone,memTel,memMail,memMailReceptYn,modDt} = member; 
    const {memClassCdV,memIdV,memPwV,memNmV,memBirthV,memAddrV,memDetailAddrV,memPhoneV,memTelV,memMailV,memMailReceptYnV} = validation; 

    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
        fetchMember();
    },[]);

    const setInfo = (data) => {
        setMember({
            memKey:'MK210004',
            memClassCd:data.memClassCd,
            memId:data.memId,
            memPw:data.memPw,
            memNm:data.memNm,
            memBirth:data.memBirth,
            memAddr:data.memAddr,
            memDetailAddr:data.memDetailAddr,
            memPhone:data.memPhone,
            memTel:data.memTel,
            memMail:data.memMail,
            memMailReceptYn:data.memMailReceptYn,
            memArea:data.memArea,
            memGrade:data.memGrade,
            regDt:data.regDt,
            modDt:data.modDt,
            deleteYn:data.deleteYn
        });
    }
    const onChange = (e) => {
        let type = e.target.name;
        let value = e.target.value;
        
        //수정상태에서만 사용
        if(!isUpdate) return false;

        //주소 api형태로만 변경 가능
        if(type === 'memAddr') return false;

        setMember({
            ...member, // 기존의 객체를 복사한 뒤
            [type]: value // type 키를 가진 값을 value 로 설정
        });
        
        let validVal = validate(type,value);

        setValidate({
            ...validation, // 기존의 객체를 복사한 뒤
            [type+'V']: validVal // type 키를 가진 값을 value 로 설정
        });
    };
    
      // 팝업창 열기
    const openPostCode = () => {
        if(isUpdate){
            setIsPopupOpen(true);
        }
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false);
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
        }

        return res;
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
    //axios get member
    const fetchMember = async() =>{
        try{
            const response = await axios.get('http://localhost:8888/member/getMember/MK210004');
            if(response.data.code >=0){
                setInfo(response.data.data);
            }else{
                return(
                    <div>error</div>
                )
            }
        } catch (e) {
        console.log(e);
        }
    };
    

    //axios update member
    const updateMember = async() =>{
        
        try{
            
            const response = await axios.get('http://localhost:8888/member/updateMember',{params: {...member}});
            if(response.data.code >=0){
                alert("변경되었습니다.");
                fetchMember();
            }else{
                return(
                    <div>error</div>
                )
            }
        } catch (e) {
            console.log(e);
        }

        //완료
        setIsUpdate(false);
    };

    //회원정보 수정<->조회 클릭
    const toggleIsUpdateBtn = (e,toggle) => {
        e.preventDefault();

        let msg = '';
        if(toggle && window.confirm('변경하시겠습니까?')){
            setIsUpdate(toggle);
            if(isUpdate){
                updateMember();
            }
        }else if(!toggle && window.confirm('변경사항이 저장되지 않습니다. 취소하시겠습니까?')){
            fetchMember();
            setIsUpdate(toggle);
        }
    }

    return(
    <div id="wrap">
        <div id="container">
            <div id="contents">
                <div className="path">
                    <span>현재 위치</span>
                    <ol>
                        <li><a href="/">홈</a></li>
                        <li title="현재 위치"><strong>회원 정보 수정</strong></li>
                    </ol>
                </div>

                <div className="titleArea">
                    <h2 style={{fontWeight:"bold"}}>MY PROFILE</h2>
                </div>

                <div className="xans-element- xans-myshop xans-myshop-asyncbenefit">
                    
                     <div className="">
                        <div className="information">
                            <div className="description">
                                <p>
                                    회원님은 <strong>[<span className="xans-member-var-group_name">
                                    {
                                        (()=>{
                                            if(memClassCd === 'STAFF' || '')
                                            return <>일반</>;
                                        })()
                                    }
                                    </span>
                                    <span className="myshop_benefit_ship_free_message"></span>]</strong> 회원이십니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form id="editForm" name="editForm" action="" method="post" target="_self">
                        <div className="xans-element- xans-member xans-member-edit">
                            <h3 className=" ">기본정보</h3>
                            <p className="required">
                                <img src={red_dot} alt="필수"/>필수입력사항
                            </p>
                            
                            <div className="boardWrite">
                                <table border="1" summary="">
                                    <caption>회원 기본정보</caption>
                                    <tbody>
                                    <tr>
                                        <th scope="row">
                                            아이디 
                                            <img src={red_dot} alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="memId" name='memId' className="inputTypeText" type="text" onChange={onChange} value={memId || ''} />
                                            (영문소문자/숫자, 6~16자)

                                            {/* 비밀번호 변경 버튼 */}
                                            {
                                                !isUpdate &&
                                                <div className="btnArea M b_right">
                                                    <Link to="/checkPassword?updatePassword">
                                                        <span className="black">비밀번호 변경</span>
                                                    </Link>
                                                </div>
                                            }
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
                                        <th scope="row" id="">이름 <img src={red_dot} alt="필수"/></th>
                                        <td>
                                            <input id="memNm" name="memNm" className="ec-member-name" type="text" onChange={onChange} value={memNm || ''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" id="">생년월일 <img src={red_dot} alt="필수"/>
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
                                        <th scope="row">주소
                                        <img src={red_dot} alt="필수"/>
                                        </th>
                                        <td>
                                            {/* 주소 api */}
                                            <img src={addr_api} style={{cursor:'pointer'}}alt="우편번호" onClick={openPostCode}/>
                                            <div id='popupDom'>
                                                {isPopupOpen && (
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
                                        <th scope="row">일반전화</th>
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
                                        <th scope="row">휴대전화 <img src={red_dot} alt="필수"/></th>
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
                                        <th scope="row">이메일 <img src={red_dot} alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="memMail" name="memMail" type="text" onChange={onChange} value={memMail || ''} />
                                            <span id="emailMsg"></span>
                                            <p className="">이메일 주소 변경 시 로그아웃 후 재인증을 하셔야만 로그인이 가능합니다.
                                            <br/>인증 메일은 24시간 동안 유효하며, 유효 시간이 만료된 후에는 가입 정보로 로그인 하셔서 재발송 요청을 해주시기 바랍니다.</p>
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
                        
                            <div className="ec-base-button">
                                <div className="btnArea L b_center">
                                    <a href="" className="black" onClick={(e) => toggleIsUpdateBtn(e,true)}>회원정보수정</a>
                                </div>
                                {/* 조건부 렌더링 */}
                                {
                                    isUpdate && 
                                    <div className="btnArea L b_center">
                                        <a href="" className="gray" onClick={(e) => toggleIsUpdateBtn(e,false)}>취소</a>
                                    </div>
                                }
                                {
                                    !isUpdate &&
                                    <div className="btnArea L b_center">
                                        <Link to="/checkPassword?dropMember">
                                            <span href="#none" className="white">회원탈퇴</span>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>    
    );
}

export default Profile;