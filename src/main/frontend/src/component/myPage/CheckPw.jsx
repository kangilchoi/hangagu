import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

/*css*/
import "css/myPage/memberModify.css"

/*js*/

/*img*/
import red_dot from "img/red_dot.gif"


function CheckPw(){
    let history = useHistory();

    const [responseUrl, setResponseUrl] = useState(window.location.search.substring(1));
    const [isCorrectPw, setIsCorrectPw] = useState(false);   //pw확인 완료
    const [pw, setPw] = useState('');
    
    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
        console.log(responseUrl);
    },[]);

    const onChange = (e) => {
        let type = e.target.id;
        let value = e.target.value;
        
        setPw(value);

      };

    //axios member(pw)
    const fetchPw = async(e) =>{
        e.preventDefault();
        if(pw === ''){
            alert("비밀번호를 입력해주세요.");
            return false;
        }

        try{
            const response = await axios.get('http://localhost:8888/member/isCorrePwById/kangil',{params: {memPw:pw}});
            if(response.data.code >=0){
                setIsCorrectPw(true);
                alert("확인되었습니다.");
                history.push({
                    pathname: responseUrl,
                    state: {pw: pw}
                  });
            }else{
                alert("비밀번호가 일치하지 않습니다.");
                setPw('');
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
                                            <th scope="row">현재 비밀번호 <img src={red_dot} alt="필수"/></th>
                                            <td>
                                                <input id="pw" name="pw" type="password" value={pw || ''} onChange={onChange}/> 
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="ec-base-button">
                                    <div className="btnArea L b_center">
                                        <a href="" className="black" onClick={(e) => e,fetchPw}>비밀번호 확인</a>
                                    </div>
                                    <div className="btnArea L b_center">
                                        <Link to="/profile"> 
                                            <span href="" className="gray" >취소</span>
                                        </Link>
                                    </div>
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

export default CheckPw;