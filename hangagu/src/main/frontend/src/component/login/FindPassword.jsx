import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

/*css*/
import 'css/login/findPassword.css';

/*img*/
import red_dot from "img/red_dot.gif"

/*비밀번호 찾기*/
function FindPassword(props) {
    let history = useHistory();
    
    //input 입력 state들
    const [grade, setGrade] = useState('STAFF');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [authCode,  setAuthCode] = useState('');      //인증코드
    
    const [sendMail, setSendMail] = useState(false);    //인증메일 전송여부
    const [returnCode,  setReturnCode] = useState('');  //발급받은 인증코드
    const [completeAuthCode,setCompleteAuthCode] = useState();  //인증 성공여부

    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
        //아이디찾기 결과 -> 비밀번호 찾기인 경우
        if(props.location.state){
            setId(props.location.state.id.chkId);
            setEmail(props.location.state.email.chkEmail);
            setName(props.location.state.name.chkNm);
        }
    },[]);

    //input onChange
    const onChange = (e) => {
        let type = e.target.name;
        let value = e.target.value;


        if(type === 'grade')
            setGrade(value);
        else if(type === 'name'){
            setName(value);
        }else if(type === "email")
            setEmail(value);
        else if(type === "id")
            setId(value);
        else if(type === "authCode")
            setAuthCode(value);
    }

    //pw 찾기
    const findPw = () => {
        if(completeAuthCode){
            history.push({
                pathname: "/updatePassword"
                ,state: {id:id}
            });
        }else{
            alert('본인 인증을 진행해주세요.');
        }
    }

    //본인인증 진행
    const execAuth = () =>{
        validMember();
    }
    //일치 회원 찾기
    const validMember = () => {
        let params = {
            "memMail": email
            ,"memId": id
            ,"memGrade": grade
            ,"memNm": name 
        };
        let res = false;
        axios.post('/auth/findMember',params).then(response => {
            if(response.data.code >0){
                res = true;
                sendAuthMail();
            }else{
                res = false;
                alert('일치하는 회원이 없습니다');
            }
            
        }).catch(error => {
            // ... 에러 처리
            console.log(error);
            return(
                <div>error</div>
            )
        }).finally(e => {
            console.log('/'+res);
            return res;
        });

        
    }

    //인증메일 전송
    const sendAuthMail = async() => {
        try{
            const response = await axios.get('/auth/verifyEmail/'+email);
            if(response.data.code > 0){
                alert('인증번호가 전송되었습니다.');
                setSendMail(true);
                setReturnCode(response.data.data);

            }else{
                alert('인증 이메일 발송이 실패하였습니다.');
                return(
                    <div>error</div>
                )
                console.log(response);
            }
        } catch (e) {
            console.log(e);
        }
    }

    //인증코드 일치여부 확인
    const comfirmAuthCode = (e) => {
        if(completeAuthCode){
            alert("인증이 완료되었습니다.");
            return true;
        }
        //console.log(authCode+"/"+returnCode);
        if(authCode+""===returnCode+""){
            alert("인증되었습니다.");
            setCompleteAuthCode(true);
            return true;
        }else{
            alert("인증 실패하였습니다.");
            return false;
        }
    }

    return (
        <div id="wrap">

            <div id="container">
                <div id="contents">

                    <div className="path">
                        <span>현재 위치</span>
                        <ol>
                            <li><a href="/">홈</a></li>
                            <li title="현재 위치"><strong>비밀번호 찾기</strong></li>
                        </ol>
                    </div>

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
                                            <select id="grade" name="grade" onChange={onChange}>
                                                <option value="STAFF">개인회원</option>
                                            </select>
                                        </p>
                                        
                                        <p className="id">
                                            <strong>아이디</strong>
                                            <input id="id" name="id" className="lostInput" placeholder=""value={id} type="text" style={{height:"28px"}} onChange={onChange}/>
                                        </p>
                                        <p id="name_view" className="name" >
                                            <strong id="name_lable">이름</strong>
                                            <input id="name" name="name" className="lostInput ec-member-name" placeholder="" value={name} type="text" style={{height:"28px"}} onChange={onChange}/>
                                        </p>
                                        <p id="email_view" className="email" >
                                            <strong>이메일</strong>
                                            <input id="email" name="email" className="lostInput" placeholder="" value={email} type="text" style={{height:"28px"}} onChange={onChange}/>
                                        </p>

                                        {/*메일 인증*/}
                                        <br/>
                                        <p>
                                        <strong>인증번호</strong>
                                        <input id="authCode" name="authCode" style={{width:"80px",height:"28px",verticalAlign : "-10px"}} className="inputTypeText" type="text" onChange={onChange} value={authCode || ''} /> 
                                        {
                                            !sendMail && (
                                            <span className="btnArea L b_right" >
                                                <span className="black" style={{cursor:'pointer',width:'100px',float:"right"}} onClick={execAuth}>인증번호 전송</span>
                                            </span>
                                            )
                                        }
                                        {
                                            sendMail && (
                                            <span className="btnArea M b_right" >
                                                <span className="black" style={{cursor:'pointer'}} onClick={comfirmAuthCode}>인증하기</span>
                                            </span>
                                            )
                                        }
                                        </p>

                                        <div className="b_right" >
                                            <img src={red_dot} className="" alt="필수" style={{verticalAlign : "-10px"}} />
                                            <span style={{verticalAlign : "-10px"}}>
                                            입력 정보로 본인인증을 진행합니다.
                                            </span>
                                        </div>
                                        
                                        <br/>
                                        
                                        <div className="ec-base-button" style={{padding:"15px 0 !important"}}>
                                            <div className="btnArea b_full b_center">
                                                <span style={{cursor:"pointer"}} onClick={findPw} className="black">확인</span>
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

export default FindPassword;