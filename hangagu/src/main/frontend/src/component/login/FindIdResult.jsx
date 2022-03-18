import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

/*css*/
import "css/login/findIdResult.css"
import "css/common.css"

/*js*/

/*img*/
import img_member_default from "img/img_member_default.gif"

function FindIdResult(props){
    const [list,setList] = useState(props.location.state.list);
    const [chkId,setChkId] = useState('');

    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
        
    },[]);

    const onChange = (e) =>{
        let type = e.target.name;
        let value = e.target.value;

        setChkId(value);
    }

    return(
        <div id="wrap">
            <div id="container">
                <div id="contents">
                    <div className="titleArea">
                        <h2>FIND ID</h2>
                    </div>

                    <div className="xans-element- xans-member xans-member-findidresult">
                        <div className="findId">
                            <p className="desc">- 고객님 아이디 찾기가 완료 되었습니다. -</p>
                            <div className="ec-base-box typeMember gMessage">
                                <p className="message">다음정보로 가입된 아이디가 총 <span className="txtEm">{list.length}</span>개 있습니다.</p>
                                {
                                    list.map(member=>{
                                        return(
                                            <div className="information" style={{borderBottom:"1px solid #ddd"}} key={member.memId}>
                                                <p className="thumbnail">
                                                    <img src={img_member_default} alt=""/></p>
                                                <ul className="description">
                                                    <li>이름 : <strong><span>{member.memNm}</span></strong>
                                                    </li>
                                                    <li>이메일 : <span>{member.memMail}</span></li>
                                                    <li><label><input type="radio" name="chkId" value={member.memId} onChange={onChange} checked={member.memId===chkId}/>
                                                    <span className="id"><b>{member.memId}</b></span> 
                                                    <span className="gaip">( {member.memGrade}, {member.regDt} 가입 )</span></label><br/></li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>

                            <div className="ec-base-button">
                                <div className="btnArea L b_center " style={{cursor:"pointer"}}>
                                    <Link to={{pathname:"/login",state:{id:{chkId}}}}>
                                        <span className="black">비밀번호 변경</span>
                                    </Link>
                                </div>
                                <div className="btnArea L b_center " style={{cursor:"pointer"}}>
                                    <a href="#" className="white">비밀번호 찾기</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FindIdResult;