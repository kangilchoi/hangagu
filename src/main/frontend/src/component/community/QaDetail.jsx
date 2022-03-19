import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import PopupDom from 'component/PopupDom';
import PopupPostCode from 'component/PopupPostCode';
import * as Auth from 'component/Auth';
import { useHistory } from "react-router-dom";

/*css*/
import "css/community/community.css"

/*js*/

function QaDetail(){

    return(
        <div id="wrap">
            <div id="container">
                <div id="contents">
                    <div className="xans-element- xans-board xans-board-listpackage-4 xans-board-listpackage xans-board-4 ">
                        <div className="xans-element- xans-board xans-board-title-4 xans-board-title xans-board-4 ">
                            <div className="titleArea">
                                <h2><font color="#000000">Q&A</font></h2>
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div>
                        <table className="community_table">
                            <tbody>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <strong>만족</strong>
                                </td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>네이****</td>
                            </tr>
                            <tr className="etcArea">
                                <td colSpan="2">
                                </td>
                            </tr>
                            <tr className="view">
                                <td colSpan="2">
                                    <div className="detail">퀄리티 있고 좋습니다<br/><br/><span style="color:#999999;">(2020-11-04 18:58:12 에 등록된 네이버 페이 구매평)</span>
                                    </div>
                                </td>
                            </tr>

                            <tr className="etcArea">
                                <td colSpan="2">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="button_g ">
                        <div className="btnArea M b_left">
                            {/*<a href="/board/product/list.html?board_act=list&amp;board_no=4&amp;product_category_depth1=&amp;product_category_depth2=&amp;product_category_depth3=&amp;product_category_depth4=" className="black_s">목록보기</a>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default QaDetail;