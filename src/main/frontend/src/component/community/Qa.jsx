import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Link } from 'react-router-dom'
import PopupDom from 'component/PopupDom';
import PopupPostCode from 'component/PopupPostCode';
import * as Auth from 'component/Auth';
import { useHistory } from "react-router-dom";

/*css*/
import "css/community/community.css"

/*js*/

/*img*/
import red_dot from "img/red_dot.gif"
import addr_api from "img/addr_api.gif"
import naver_login from "img/login_btn_naver.png"
import {render} from "react-dom";

function Qa(props){

    let list = null;

    const query = queryString.parse(props.location.search);
    let page = query.page;
    let size = query.size;

    const getList = (() => {
        axios.get('/board/BC01/list',
            {
                params: {
                    page: page,
                    size: size
                }
            }
        )
            .then(response => {
                if(response.data.code == 1) {
                    list = response.data.data.content;
                }
            }).catch(error => {
            console.log(error);
            return(
                <div>error</div>
            )
        })
    });   //처음만 수행

    getList();

    return(
        <div id="wrap">
            <div id="container">
                <div id="contents">
                    <div className="xans-element- xans-board xans-board-listpackage-4 xans-board-listpackage xans-board-4 ">
                        <div className="xans-element- xans-board xans-board-title-4 xans-board-title xans-board-4 ">
                            <div className="titleArea">
                                <h2><font color="#000000">Q&amp;A</font></h2>
                            </div>
                        </div>
                        <br/>
                        <div className="boardList">
                            <table border="1" summary="">
                                <caption></caption>
                                <colgroup className="xans-element- xans-board xans-board-listheader-4 xans-board-listheader xans-board-4 ">
                                    <col style={{width:"70px"}}/>
                                    <col style={{width:"70px"}}/>
                                    <col style={{width:"auto"}}/>
                                    <col style={{width:"100px"}}/>
                                    <col style={{width:"100px"}} className=""/>
                                    <col style={{width:"55px"}} className=""/>
                                </colgroup>
                                <thead className="xans-element- xans-board xans-board-listheader-4 xans-board-listheader xans-board-4 ">
                                <tr>
                                    <th scope="col"> 번호</th>
                                    <th scope="col" className="thumb"></th>
                                    <th scope="col" className="subjectTH">제목</th>
                                    <th scope="col">작성자</th>
                                    <th scope="col" className="">작성일</th>
                                    <th scope="col" className="">조회</th>
                                </tr>
                                </thead>
                                <tbody className="xans-element- xans-board xans-board-notice-4 xans-board-notice xans-board-4 notice">
                                <tr style={{backgroundColor:"#FFFFFF", color:"#555555"}} className="xans-record-">
                                    <td>공지</td>
                                    <td className="thumb"><a href="/product/detail.html"></a></td>
                                    <td className="subject">
                                        <span className="displaynone">
                                            <a href="#none">
                                                <img src="https://img.echosting.cafe24.com/skin/base/board/btn_unfold.gif" alt="내용 보기"/>
                                            </a>
                                        </span>
                                        <Link to="/board/detail/BK220001" style={{color:"#555555"}}>
                                            [원목 테이블]프래임 디자인
                                        </Link>
                                        <img src="//img0001.echosting.cafe24.com/front/type_b/image/common/icon_hit.gif" alt="HIT" className="ec-common-rwd-image"/>
                                        <span className="comment"></span>
                                    </td>
                                    <td>퍼니매스</td>
                                    <td className="txtLess ">2019-05-22 11:24:34</td>
                                    <td className="txtLess ">321</td>
                                </tr>
                                </tbody>
                                <tbody className="xans-element- xans-board xans-board-list-4 xans-board-list xans-board-4">
                                <tr style={{backgroundColor:"#FFFFFF", color:"#555555"}} className="xans-record-">
                                    <td>1087</td>
                                    <td className="thumb">
                                        <a href="/product/detail.html?product_no=4919"></a>
                                    </td>
                                    <td className="subject">
                                        <span className="displaynone">
                                            <a href="#none">
                                                <img src="https://img.echosting.cafe24.com/skin/base/board/btn_unfold.gif" alt="내용 보기"/>
                                            </a>
                                        </span>
                                        <Link to="/board/detail/BK220001" style={{color:"#555555"}}>
                                            상품 문의드립니다^^
                                        </Link>
                                        <img src="//img0001.echosting.cafe24.com/front/type_b/image/common/icon_lock.gif" alt="비밀글" className="ec-common-rwd-image"/>
                                        <img src="//img0001.echosting.cafe24.com/front/type_b/image/common/icon_file.gif" alt="파일첨부" className="ec-common-rwd-image"/>
                                        <span className="comment"></span>
                                    </td>
                                    <td>최지****</td>
                                    <td className="txtLess ">2020-09-18 19:14:43</td>
                                    <td className="txtLess ">5</td>
                                </tr>
                                <tr style={{backgroundColor:"#FFFFFF", color:"#555555"}} className="xans-record-">
                                    <td>1086</td>
                                    <td className="thumb"><a href="/product/detail.html?product_no=4919"></a></td>
                                    <td className="subject">
                                        <span className="displaynone">
                                            <a href="#none">
                                                <img src="https://img.echosting.cafe24.com/skin/base/board/btn_unfold.gif" alt="내용 보기"/>
                                            </a>
                                        </span>
                                        &nbsp;&nbsp;&nbsp;
                                        <img src="//img0001.echosting.cafe24.com/front/type_b/image/common/icon_re.gif" alt="답변" className="ec-common-rwd-image"/>
                                        <Link to="/board/detail/BK220001" style={{color:"#555555"}}>
                                            상품 문의드립니다^^
                                        </Link>
                                        <img src="//img0001.echosting.cafe24.com/front/type_b/image/common/icon_lock.gif" alt="비밀글" className="ec-common-rwd-image" />
                                        <span className="comment"></span>
                                    </td>
                                    <td>퍼니매스</td>
                                    <td className="txtLess ">2020-09-21 09:50:26</td>
                                    <td className="txtLess ">1</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="xans-element- xans-board xans-board-empty-4 xans-board-empty xans-board-4 boardListEmpty displaynone ">
                            <p></p>
                        </div>
                        <div className="xans-element- xans-board xans-board-buttonlist-4 xans-board-buttonlist xans-board-4  button_g ">
                            <div className="btnArea L b_center">
                                <a href="/board/product/write.html?board_no=6" className=" black_s">작성하기</a>
                            </div>
                        </div>
                    </div>
                    <div className="xans-element- xans-board xans-board-paging-4 xans-board-paging xans-board-4 ec-base-paginate">
                        <a href="?board_no=6&amp;page=1" >
                            <img src="https://img.echosting.cafe24.com/skin/base/common/btn_page_prev.gif" alt="이전 페이지"/>
                        </a>
                        <ol>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=1" className="this">1</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=2" className="other">2</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=3" className="other">3</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=4" className="other">4</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=5" className="other">5</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=6" className="other">6</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=7" className="other">7</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=8" className="other">8</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=9" className="other">9</a></li>
                            <li className="xans-record-"><a href="?board_no=6&amp;page=10" className="other">10</a></li>
                        </ol>
                        <a href="?board_no=6&amp;page=2">
                            <img src="https://img.echosting.cafe24.com/skin/base/common/btn_page_next.gif" alt="다음 페이지"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Qa;