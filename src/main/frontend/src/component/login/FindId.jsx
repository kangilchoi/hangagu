import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'css/login/findId.css';



function findId() {

    axios.post('/users', {
        username: 'blabla',
        name: 'blabla'
    });

    return (
        <div id="wrap">

            <div id="container">
                <div id="contents">

                    <div className="path">
                        <span>현재 위치</span>
                        <ol>
                            <li><a href="/">홈</a></li>
                            <li title="현재 위치"><strong>아이디 찾기</strong></li>
                        </ol>
                    </div>

                    <div className="titleArea">
                        <h2>FIND ID</h2>
                    </div>
                    <form id="findIdForm" name="findIdForm" action="/exec/front/Member/findId/" method="post" target="_self" encType="multipart/form-data">
                        <input id="returnUrl" name="returnUrl" value="/member/id/findIdResult.html" type="hidden" />
                            <div className="xans-element- xans-member xans-member-findid ">
                                <div className="findId">
                                    <fieldset>
                                        <legend>아이디 찾기</legend>
                                        <p className="member"><strong>회원유형</strong>
                                            <select id="searchType" name="searchType">
                                                <option value="indi" selected="selected">개인회원</option>
                                            </select></p>
                                        <p className="check">
                                            <input id="check_method0" name="check_method" value="1" type="radio" style={{display: "none"}}/>
                                            <label htmlFor="check_method0" style={{display: "none"}}>
                                                <span id="ssn_lable" style={{display: "none"}}></span>
                                            </label>
                                            <input id="check_method1" name="check_method" value="2" type="radio"
                                                   checked="checked"/>
                                            <label htmlFor="check_method1">이메일</label>
                                            <input id="check_method2" name="check_method" value="3" type="radio"/>
                                            <label htmlFor="check_method2">
                                                <span id="search_type_mobile_lable" style={{display: "inline"}}>휴대폰번호</span>
                                            </label>
                                        </p>
                                        <p id="name_view" className="name">
                                            <strong id="name_lable">이름</strong>
                                            <input id="name" name="name" className="lostInput" placeholder="" value="" type="text"/>
                                        </p>
                                        <p id="email_view" className="email">
                                            <strong>이메일로 찾기</strong>
                                            <input id="email" name="email" className="lostInput" placeholder="" value="" type="text"/>
                                        </p>
                                        <p id="mobile_view" className="mobile" style={{display: "none"}}>
                                            <strong>휴대폰 번호로 찾기</strong>
                                            <input id="mobile1" name="mobile1" className="mobile1" placeholder="" maxLength="3" value="" type="text"/>
                                            -
                                            <input id="mobile2" name="mobile2" className="mobile2" placeholder="" maxLength="4" value="" type="text"/>
                                            -
                                            <input id="mobile3" name="mobile3" fclass="mobile2" placeholder="" maxLength="4" value="" type="text"/>
                                        </p>
                                        <div className="ec-base-button" style={{padding: "15px 0 !important"}}>
                                            <div className="btnArea b_full b_center">
                                                <a href="#none" onClick="findId.action('furnimass' , 'kcp'); return false;"
                                                   className="black">확인</a>
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

export default findId;