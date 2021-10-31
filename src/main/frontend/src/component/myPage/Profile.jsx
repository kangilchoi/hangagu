import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*css*/
import "css/common.css"
import "css/myPage/memberModify.css"


function Profile(){
    const [grade,setGrade] = useState(null);
    const [id,setId] = useState(null);
    // const [pw,setPw] = useState(null);
    const [name,setName] = useState(null);
    const [birth,setBirth] = useState(null);
    const [addr,setAddr] = useState(null);
    const [addrDetail,setAddrDetail] = useState(null);
    const [phone,setPhone] = useState(null);
    const [tel,setTel] = useState(null);
    const [email,setEmail] = useState(null);
    const [emailYN,setEmailYN] = useState(null);

    
    

    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
        fetchMember();
    },[]);

    const setInfo = (data) =>{
        let m = data.data;
        console.log(m);
        setGrade(getGrade(m.memClassCd));
        setId(m.memId);
        setName(m.memNm);
        setBirth(m.memBirth);
        setAddr(m.memAddr);
        setAddrDetail(m.memDetailAddr);
        setPhone(m.memPhone);
        setTel(m.memTel);
        setEmail(m.memMail);
        setEmailYN(m.memlmailReceptYN);
    }

    //axios member
    const fetchMember = async() =>{
        try{
            const response = await axios.get('http://localhost:8888/member/getMember/MK210004');
            setInfo(response.data);
        } catch (e) {
        console.log(e);
        }
    };

    const getGrade = (memClassCd) => {
        let res='';

        if(memClassCd==='STAFF'){
            res = '일반'	
        }
        return res;
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
                                    회원님은 <strong>[<span className="xans-member-var-group_name">{grade}</span>
                                    <span className="myshop_benefit_ship_free_message"></span>]</strong> 회원이십니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form id="editForm" name="editForm" action="" method="post" target="_self">
                        <div className="xans-element- xans-member xans-member-edit">
                            <h3 className=" ">기본정보</h3>
                            <p className="required">
                                <img src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif" alt="필수"/>필수입력사항
                            </p>
                            
                            <div className="boardWrite">
                                <table border="1" summary="">
                                    <caption>회원 기본정보</caption>
                                    <tbody>
                                    <tr>
                                        <th scope="row">
                                            아이디
                                            <img src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif" alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="member_id" className="inputTypeText" type="text" onChange={1} value={id || ''} />123(변경불가)
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">비밀번호 <img
                                                src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif"
                                                className=""
                                                alt="필수"/></th>
                                        <td>
                                            <input id="passwd" name="passwd" fw-filter="isFill&amp;isMin[4]&amp;isMax[16]"
                                                fw-label="비밀번호" fw-msg=""
                                                 type="password"/> (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)
                                                
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">비밀번호 확인 <img
                                                src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif"
                                                alt="필수"/></th>
                                        <td><input id="user_passwd_confirm" name="user_passwd_confirm"
                                                fw-filter="isFill&amp;isMatch[passwd]" fw-label="비밀번호 확인"
                                                fw-msg="비밀번호가 일치하지 않습니다." 
                                                 type="password"/><span id="pwConfirmMsg"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" id="">이름 <img
                                                src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif"
                                                alt="필수"/></th>
                                        <td>
                                            <input id="name" name="name" className="ec-member-name" type="text" onChange={1} value={name || ''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" id="">생년월일 <img
                                                src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif"
                                                alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="name" name="name" type="text" onChange={1} value={birth || ''} />
                                                (ex:1990-09-09)
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">주소
                                            <img src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif" className="" alt="필수"/>
                                        </th>
                                        <td>

                                            &nbsp; 
                                            <a href="#none" id="postBtn">
                                                <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/member/btn_zipcode.gif" alt="우편번호"/>
                                            </a>
                                            <br/>

                                            <input id="addr1" name="addr1" className="inputTypeText" type="text" onChange={1} value={addr || ''} /> 기본주소
                                            <br/>
                                            <input id="addr2" name="addr2" className="inputTypeText" type="text" onChange={1} value={addrDetail || ''}/> 나머지주소
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">일반전화<img  src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif" className="displaynone" alt="필수"/></th>
                                        <td>
                                            <select id="phone1" name="phone[]" fw-filter="isNumber&amp;isNumber" fw-label="일반전화" fw-alone="N" fw-msg="">
                                                <option value="02">02</option>
                                                <option value="031">031</option>
                                                <option value="032">032</option>
                                                <option value="033">033</option>
                                                <option value="041">041</option>
                                                <option value="042">042</option>
                                                <option value="043">043</option>
                                                <option value="044">044</option>
                                                <option value="051">051</option>
                                                <option value="052">052</option>
                                                <option value="053">053</option>
                                                <option value="054">054</option>
                                                <option value="055">055</option>
                                                <option value="061">061</option>
                                                <option value="062">062</option>
                                                <option value="063">063</option>
                                                <option value="064">064</option>
                                                <option value="0502">0502</option>
                                                <option value="0503">0503</option>
                                                <option value="0504">0504</option>
                                                <option value="0505">0505</option>
                                                <option value="0506">0506</option>
                                                <option value="0507">0507</option>
                                                <option value="070">070</option>
                                                <option value="010">010</option>
                                                <option value="011">011</option>
                                                <option value="016">016</option>
                                                <option value="017">017</option>
                                                <option value="018">018</option>
                                                <option value="019">019</option>
                                                <option value="0508">0508</option>
                                            </select>
                                            -
                                            <input id="phone2" name="phone[]"  fw-filter="isNumber&amp;isNumber" fw-label="일반전화" fw-alone="N" fw-msg=""  type="text"/>-<input id="phone3" name="phone[]"
                                             fw-filter="isNumber&amp;isNumber" fw-label="일반전화" fw-alone="N" fw-msg=""  type="text"/>
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">휴대전화 <img
                                                src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif"
                                                className=""
                                                alt="필수"/></th>
                                        <td>
                                            <select id="mobile1" name="mobile[]" fw-filter="isNumber&amp;isFill"
                                                    fw-label="휴대전화"
                                                    fw-alone="N" fw-msg="">
                                                <option value="010">010</option>
                                                <option value="011">011</option>
                                                <option value="016">016</option>
                                                <option value="017">017</option>
                                                <option value="018">018</option>
                                                <option value="019">019</option>
                                            </select>
                                            -
                                            <input id="mobile2" name="mobile[]"
                                                        fw-filter="isNumber&amp;isFill" fw-label="휴대전화" fw-alone="N"
                                                        fw-msg=""
                                                         type="text"/>
                                            -
                                            <input id="mobile3" name="mobile[]" fw-filter="isNumber&amp;isFill" fw-label="휴대전화" fw-alone="N" fw-msg=""  type="text"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">이메일 <img src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif" alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="email1" name="email1" type="text" onChange={1} value={email || ''} />
                                            <span id="emailMsg"></span>
                                            <p className="">이메일 주소 변경 시 로그아웃 후 재인증을 하셔야만 로그인이 가능합니다.
                                            <br/>인증 메일은 24시간 동안 유효하며, 유효 시간이 만료된 후에는 가입 정보로 로그인 하셔서 재발송 요청을 해주시기 바랍니다.</p>
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th scope="row">이메일 수신여부 <img
                                                src="http://img.echosting.cafe24.com/skin/base/common/ico_required.gif"
                                                alt="필수"/>
                                        </th>
                                        <td>
                                            <input id="is_news_mail0" name="is_news_mail" fw-filter="isFill"
                                                fw-label="is_news_mail" fw-msg="" value="T" type="radio"/>
                                                <label>수신함</label>
                                            <input id="is_news_mail1" name="is_news_mail" fw-filter="isFill"
                                                fw-label="is_news_mail" fw-msg="" value="F" type="radio"
                                                /><label>수신안함</label>
                                            <p>쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수 있습니다.</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        
                            <div className="ec-base-button">
                                <div className="btnArea L b_center">
                                    <a href="#none" className="black">회원정보수정</a>
                                </div>
                                <div className="btnArea L b_center">
                                    <a href="/index.html" className="gray">취소</a>
                                </div>
                                <div className="btnArea L b_center">
                                    <a href="#none" className="white">회원탈퇴</a>
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

export default Profile;