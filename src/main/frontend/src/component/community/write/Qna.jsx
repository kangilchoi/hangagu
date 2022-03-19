import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import PopupDom from 'component/PopupDom';
import PopupPostCode from 'component/PopupPostCode';
import * as Auth from 'component/Auth';
import { useHistory } from "react-router-dom";

/*css*/
//import "css/community/write/board.css"

import red_dot from "img/red_dot.gif"
import addr_api from "img/addr_api.gif"
import naver_login from "img/login_btn_naver.png"
function qa(){

    return(
        <div id="wrap">
            <div id="container">
                <div id="contents">
                    <div className="xans-element- xans-board xans-board-writepackage-4 xans-board-writepackage xans-board-4">
                        <div className="xans-element- xans-board xans-board-title-4 xans-board-title xans-board-4">
                            <div className="path">
                                <span>현재 위치</span>
                                <ol>
                                    <li><a href="/">홈</a></li>
                                    <li><a href="#">게시판</a></li>
                                    <li title="현재 위치"><strong>Q&amp;A</strong></li>
                                </ol>
                            </div>
                            <div className="titleArea">
                                <h2><font color="#000000">Q&amp;A</font></h2>
                            </div>
                        </div>
                        <form id="boardWriteForm" name="" action="/exec/front/Board/write/6" method="post" target="_self" encType="multipart/form-data">
                            <div className="xans-element- xans-board xans-board-write-4 xans-board-write xans-board-4">
                                <div className="ec-base-box typeProduct displaynone ">
                                    <p className="thumbnail">
                                        <a href="/product/detail.html?product_no=3499">
                                            <img id="iPrdImg" src="//furnimass.com/web/product/tiny/201906/c977be245ce2b5ca6b1448eb22e08506.jpg" onError="this.src='https://img.echosting.cafe24.com/thumb/75x75.gif'" alt="" />
                                        </a>
                                    </p>
                                    <div className="information">
                                        <span id="sPrdCommonImg">

                                        </span>
                                        <h3>
                                            <a href="/product/detail.html?product_no=3499" id="aPrdNameLink">
                                                <span id="sPrdName">우드스틱 테이블 스탠드 L-311</span>
                                            </a>
                                        </h3>
                                        <p className="price">
                                            <span id="sPrdPrice">280,000원</span>
                                        </p>
                                        <p className="button">
                                            <span id="iPrdView" className="">
                                                <a href="/product/detail.html?product_no=3499" id="aPrdLink" target="_blank">
                                                    <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/board/btn_prd_detail.gif" alt="상품상세보기"/>
                                                </a>
                                            </span>
                                            <span className="displaynone">
                                                <a href="#none" onClick="BOARD_WRITE.product_popup('/product/search_board_list.html')">
                                                    <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/board/btn_prd_select.gif" alt="상품정보선택"/>
                                                </a>
                                            </span>
                                            <span className="displaynone">
                                                <a href="#none" onClick="BOARD_WRITE.product_popup('/order/search_board_list.html')">
                                                    <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/board/btn_prd_order.gif" alt="주문상품선택"/>
                                                </a>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="boardWrite ">
                                     <table border="1" summary="">
                                         <caption>글쓰기 폼</caption>
                                         <tbody>
                                         <tr className="first">
                                             <th scope="row">제목</th>
                                             <td>
                                                 <select id="subject" name="subject" fw-filter="isFill" fw-label="제목" fw-msg="">
                                                     <option value="상품 문의드립니다^^">상품 문의드립니다^^</option>
                                                     <option value="배송 문의드립니다^^">배송 문의드립니다^^</option>
                                                     <option value="견적 문의드립니다^^">견적 문의드립니다^^</option>
                                                     <option value="기타 문의드립니다^^">기타 문의드립니다^^</option>
                                                 </select>
                                         </td>
                                         </tr>
                                         <tr className="">
                                            <th scope="row">작성자</th>
                                            <td>
                                                <input id="writer" name="writer" fw-filter="isFill" fw-label="작성자" fw-msg="" className="inputTypeText" placeholder="" maxLength="50" value="" type="text"/>
                                            </td>
                                         </tr>
                                         <tr className="">
                                             <th scope="row">이메일</th>
                                             <td>
                                                  <input id="email1" name="email1" fw-filter="" fw-label="이메일" fw-alone="N" fw-msg="" className="mailId" value="" type="text" />
                                                      @
                                                 <input id="email2" name="email2" fw-filter="" fw-label="이메일" Mfw-alone="N" fw-msg="" className="mailAddress" readOnly="readonly" value="" type="text"/>
                                                     <select id="email3" fw-filter="" fw-label="이메일" fw-alone="N" fw-msg="">
                                                         <option value="" selected="selected">
                                                             -이메일 선택 -
                                                         </option>
                                                         <option value="naver.com">naver.com</option>
                                                         <option value="daum.net">daum.net</option>
                                                         <option value="nate.com">nate.com</option>
                                                         <option value="hotmail.com">hotmail.com</option>
                                                         <option value="yahoo.com">yahoo.com</option>
                                                         <option value="empas.com">empas.com</option>
                                                         <option value="korea.com">korea.com</option>
                                                         <option value="dreamwiz.com">dreamwiz.com</option>
                                                         <option value="gmail.com">gmail.com</option>
                                                         <option value="etc">직접입력</option>
                                                     </select>
                                             </td>
                                         </tr>
                                         <tr className="displaynone">
                                             <th scope="row">평점</th>
                                             <td>

                                             </td>
                                         </tr>
                                         <tr>
                                             <td colSpan="2" className="write">

                                                 <script type="text/javascript" src="//editor.cafe24.com/js/nneditor.js?c=ko"></script>
                                                 {/*<style type="text/css">*/}
                                                 {/*   @import "https://editor.cafe24.com/css/style.css?ver=r3.4.0.20200729.1";*/}
                                                 {/*   @import"https://editor.cafe24.com/css/styleie8.css?ver=r3.4.0.20200729.1";*/}
                                                 {/*</style>*/}
                                                 <script type="text/javascript" src="https://editor.cafe24.com/lang/ko.js?version=r3.4.0.20200729.1" charSet="UTF-8"></script>
                                                 <script type="text/javascript" src="https://editor.cafe24.com/js/nneditorUtils.dev.js?version=r3.4.0.20200729.1" charSet="UTF-8"></script>
                                                 <script type="text/javascript" src="https://editor.cafe24.com/js/nneditorRange.dev.js?version=r3.4.0.20200729.1" charSet="UTF-8"></script>
                                                 <script type="text/javascript" src="https://editor.cafe24.com/js/nneditorCore.dev.js?version=r3.4.0.20200729.1"  charSet="UTF-8"></script>
                                                 <script type="text/javascript">
                                                {/*    NN.Config.instanceID = "content";*/}
                                                {/*    NN.Config.value = "";*/}
                                                {/*    NN.Config.toolbarType = "simple";*/}


                                                {/*    //Editor Height*/}
                                                {/*    NN.Config.height = 400;*/}

                                                {/*    var oNN_content = new NNEditor();*/}
                                                {/*    oNN_content.build();*/}

                                                {/*    if (typeof $Editor != "object") {*/}
                                                {/*    $Editor = {*/}
                                                {/*        _obj: {},*/}

                                                {/*        push: function (obj, id) {*/}
                                                {/*            this._obj[id] = obj;*/}
                                                {/*        },*/}

                                                {/*        get: function (id) {*/}
                                                {/*            return this._obj[id];*/}
                                                {/*        },*/}

                                                {/*        reset: function (id) {*/}
                                                {/*            this._obj[id].getText().value = "";*/}
                                                {/*            this._obj[id].getIFDoc().body.innerHTML = this._obj[id].Config.START_HTML;*/}
                                                {/*        },*/}

                                                {/*        contents: function (id, context) {*/}
                                                {/*            this._obj[id].getText().value = context;*/}
                                                {/*            this._obj[id].getIFDoc().body.innerHTML = this._obj[id].view.parsing(2);*/}
                                                {/*        }*/}
                                                {/*    };*/}
                                                {/*}*/}

                                                {/*    $Editor.push(oNN_content, "content"*/}
                                                {/*)*/}
                                                {/*;*/}
                                                 </script>
                                                 <div id="content_CONTAINER" className="nneditor-container">
                                                     <table className="seLayout">
                                                         <tbody>
                                                         <tr>
                                                             <td id="content_toolbar_container" className="nneditor-toolbar-container">
                                                                 <div id="content_TOOLBAR" className="SE_TOOLBAR">
                                                                     <ul className="se_toolbar_left2">
                                                                         <li>
                                                                             <div className="divide"></div>
                                                                         </li>
                                                                         <li className="mode">
                                                                             <table className="nneditor-table">
                                                                                 <tbody>
                                                                                 <tr>
                                                                                     <td>
                                                                                         <div style={{cursor: 'pointer'}} rel="viewSrc" className="img_button mode"></div>
                                                                                     </td>
                                                                                     <td>
                                                                                         <div style={{cursor: 'pointer'}} rel="viewSrc">소스</div>
                                                                                     </td>
                                                                                 </tr>
                                                                                 </tbody>
                                                                             </table>
                                                                         </li>
                                                                         <li className="fonttype">
                                                                             <table className="nneditor-table">
                                                                                 <tbody>
                                                                                 <tr>
                                                                                     <td>
                                                                                         <button type="button" className="nneditor-fonttype" title="폰트" rel="fonttypePanel" id="fonttypePanel">글꼴</button>
                                                                                     </td>
                                                                                     <td>
                                                                                         <a href="#" rel="fonttypePanel" className="fieldButton"></a>
                                                                                     </td>
                                                                                 </tr>
                                                                                 </tbody>
                                                                             </table>
                                                                         </li>
                                                                         <li className="fontsize">
                                                                             <table className="nneditor-table">
                                                                                 <tbody>
                                                                                 <tr>
                                                                                     <td>
                                                                                         <button type="button" className="nneditor-fontsize" title="글자 크기" rel="fontsizePanel" id="fontsizePanel">크기</button>
                                                                                     </td>
                                                                                     <td>
                                                                                         <a href="#" rel="fontsizePanel" className="fieldButton"></a>
                                                                                     </td>
                                                                                 </tr>
                                                                                 </tbody>
                                                                             </table>
                                                                         </li>
                                                                     </ul>
                                                                     <ul className="se_toolbar_left2">
                                                                         <li>
                                                                             <div className="divide"></div>
                                                                         </li>
                                                                         <li className="undo">
                                                                             <button id="content_BUTTON_undo" type="button" title="취소" rel="undo" rel2="m"></button>
                                                                         </li>
                                                                         <li className="redo">
                                                                             <button id="content_BUTTON_redo" type="button" title="재실행" rel="redo" rel2="m"></button>
                                                                         </li>
                                                                     </ul>
                                                                     <ul className="se_toolbar_left2">
                                                                         <li>
                                                                             <div className="divide"></div>
                                                                         </li>
                                                                         <li className="fontcolor">
                                                                             <table className="nneditor-table">
                                                                                 <tbody>
                                                                                 <tr>
                                                                                     <td>
                                                                                         <span className="simpleIcon forecolor" title="글자 색상" rel="evtPickColorDirect"></span>
                                                                                         <div id="content_content_forecolor_preview" className="content-forecolor-preview"></div>
                                                                                     </td>
                                                                                     <td>
                                                                                         <a href="#" className="nneditor-da" rel="fontcolorPanel"></a>
                                                                                     </td>
                                                                                 </tr>
                                                                                 </tbody>
                                                                             </table>
                                                                         </li>
                                                                         <li className="fontbgcolor">
                                                                             <table className="nneditor-table">
                                                                                 <tbody>
                                                                                 <tr>
                                                                                     <td>
                                                                                         <span className="simpleIcon bgcolor" title="배경 색상" rel="evtBgColorDirect"></span>
                                                                                         <div id="content_content_bgcolor_preview" className="content-bgcolor-preview"></div>
                                                                                     </td>
                                                                                     <td>
                                                                                         <a href="#" className="nneditor-da" rel="fontbgcolorPanel"></a>
                                                                                     </td>
                                                                                 </tr>
                                                                                 </tbody>
                                                                             </table>
                                                                         </li>
                                                                     </ul>
                                                                     <ul className="se_toolbar_left2">
                                                                         <li>
                                                                             <div className="divide"></div>
                                                                         </li>
                                                                         <li className="bold">
                                                                             <button id="content_BUTTON_bold" type="button" title="진하게" rel="basic" argv1="bold" el2="m"></button>
                                                                         </li>
                                                                         <li className="underline">
                                                                             <button id="content_BUTTON_underline" type="button" title="밑줄" rel="basic" argv1="underline" rel2="m"></button>
                                                                         </li>
                                                                         <li className="italic">
                                                                             <button id="content_BUTTON_italic" type="button" title="이텔릭" rel="basic" argv1="italic" rel2="m"></button>
                                                                         </li>
                                                                         <li className="strikethrough">
                                                                             <button id="content_BUTTON_strikethrough" type="button" title="" rel="basic" argv1="strikethrough" rel2="m"></button>
                                                                         </li>
                                                                         <li className="superscript">
                                                                             <button id="content_BUTTON_superscript" type="button" title="위 첨자" rel="basic" argv1="superscript" rel2="m"></button>
                                                                         </li>
                                                                         <li className="subscript">
                                                                             <button id="content_BUTTON_subscript" type="button" title="아래 첨자" rel="basic" argv1="subscript" rel2="m"></button>
                                                                         </li>
                                                                     </ul>
                                                                     <ul className="se_toolbar_left2">
                                                                         <li>
                                                                             <div className="divide"></div>
                                                                         </li>
                                                                         <li className="justifyleft">
                                                                             <button id="content_BUTTON_justifyleft" type="button" title="왼쪽 정렬" rel="basic" argv1="justifyleft" rel2="m"></button>
                                                                         </li>
                                                                         <li className="justifycenter">
                                                                             <button id="content_BUTTON_justifycenter" type="button" title="가운데 정렬" rel="basic" argv1="justifycenter" rel2="m"></button>
                                                                         </li>
                                                                         <li className="justifyright">
                                                                             <button id="content_BUTTON_justifyright" type="button" title="오른쪽 정렬" rel="basic" argv1="justifyright" rel2="m"></button>
                                                                         </li>
                                                                         <li className="justifyfull">
                                                                             <button id="content_BUTTON_justifyfull" type="button" title="양쪽 맞춤" rel="basic" argv1="justifyfull" rel2="m"></button>
                                                                         </li>
                                                                     </ul>
                                                                     <ul className="se_toolbar_left2">
                                                                         <li>
                                                                             <div className="divide"></div>
                                                                         </li>
                                                                         <li className="insertorderedlist">
                                                                             <button id="content_BUTTON_insertorderedlist" type="button" title="순서있는 목록" rel="basic" argv1="insertorderedlist" rel2="m"></button>
                                                                         </li>
                                                                         <li className="insertunorderedlist">
                                                                             <button id="content_BUTTON_insertunorderedlist" type="button" title="순서없는 목록" rel="basic" argv1="insertunorderedlist" rel2="m"></button>
                                                                         </li>
                                                                         <li className="outdent">
                                                                             <button id="content_BUTTON_outdent" type="button" title="내어쓰기" rel="default" argv1="outdent" rel2="m"></button>
                                                                         </li>
                                                                         <li className="indent">
                                                                             <button id="content_BUTTON_indent" type="button" title="들여쓰기" rel="default" argv1="indent" rel2="m"></button>
                                                                         </li>
                                                                         <li className="inserthorizontalrule">
                                                                             <button id="content_BUTTON_inserthorizontalrule" type="button" title="수평선 삽입" rel="basic" argv1="inserthorizontalrule" rel2="m"></button>
                                                                         </li>
                                                                     </ul>
                                                                     <ul className="se_toolbar_left2">
                                                                         <li>
                                                                             <div className="divide"></div>
                                                                         </li>
                                                                         <li className="link">
                                                                             <button id="content_BUTTON_link" type="button" title="링크" rel="default" argv1="link" rel2="m"></button>
                                                                         </li>
                                                                         <li className="unlink">
                                                                             <button id="content_BUTTON_unlink" type="button" title="링크 삭제" rel2="m" style={{opacity: '0.3'}}></button>
                                                                         </li>
                                                                     </ul>
                                                                     <ul className="se_toolbar_left2">
                                                                         <li>
                                                                             <div className="divide"></div>
                                                                         </li>
                                                                         <li className="table">
                                                                             <button id="content_BUTTON_table" type="button" title="표" rel="table" rel2="m"></button>
                                                                         </li>
                                                                     </ul>
                                                                 </div>
                                                             </td>
                                                         </tr>
                                                         <tr>
                                                             <td id="content_iframe_container" className="nneditor-iframe-container">
                                                                 <iframe id="content_IFRAME" frameBorder="no" tabIndex="0" style={{width: "100%", height: "400px", display: "block"}}></iframe>
                                                                 <textarea id="content_TEXTAREA" name="content" style={{display: "none", width: "100%", height: "400px", border: "0px none", clear: "both", fontSize: "9pt", fontFamily: "gulim", margin: "0px", padding: "0px", resize: "none"}}></textarea>
                                                             </td>
                                                         </tr>
                                                         <tr>
                                                             <td>
                                                                 <button type="button" id="content_seResize" className="seResize2" onFocus="this.blur()" tabIndex="100000">
                                                                     <span>입력창 크기 조절</span>
                                                                 </button>
                                                             </td>
                                                         </tr>
                                                         </tbody>
                                                     </table>
                                                 </div>
                                                 <input type="hidden" id="content_hidden" fw-filter="isSimplexEditorFill" fw-label="내용" value="oNN_content"/>
                                                 </td>
                                             </tr>
                                         </tbody>
                                         <tbody className="">
                                         <tr>
                                             <th scope="row">첨부파일1</th>
                                             <td>
                                                 <input name="attach_file[]" type="file"/>
                                             </td>
                                         </tr>
                                         <tr>
                                             <th scope="row">첨부파일2</th>
                                             <td>
                                                 <input name="attach_file[]" type="file"/>
                                             </td>
                                             </tr>
                                         <tr>
                                             <th scope="row">첨부파일3</th>
                                             <td>
                                                 <input name="attach_file[]" type="file"/>
                                             </td>
                                         </tr>
                                         <tr>
                                             <th scope="row">첨부파일4</th>
                                             <td>
                                                 <input name="attach_file[]"type="file"/>
                                             </td>
                                         </tr>
                                         <tr>
                                             <th scope="row">첨부파일5</th>
                                             <td>
                                                 <input name="attach_file[]" type="file"/>
                                             </td>
                                         </tr>
                                         </tbody>
                                         <tbody>
                                         <tr>
                                             <th scope="row">비밀번호</th>
                                             <td>
                                                 <input id="password" name="password" fw-filter="isFill" fw-label="비밀번호" fw-msg="" value="" type="password"/>
                                             </td>
                                         </tr>
                                         <tr className="">
                                             <th scope="row">비밀글설정</th>
                                             <td>
                                                 <input id="secure0" name="secure" fw-filter="isFill" fw-label="비밀글설정" fw-msg="" value="F" type="radio" checked="checked" disabled=""/>
                                                 <label htmlFor="secure0">공개글</label>
                                                 <input id="secure1" name="secure" fw-filter="isFill" fw-label="비밀글설정" fw-msg="" value="T" type="radio" checked="checked"/>
                                                 <label htmlFor="secure1">비밀글</label>
                                                 </td>
                                         </tr>
                                         <tr className="captcha ">
                                             <th scope="row">
                                                 자동등록방지<br/>보안문자
                                             </th>
                                             <td>
                                                 <img src="https://furnimass.com/Exec/Front/Board/Captcha/?no=&type=Write" id="captcha_Write"/>
                                                 <img src="//img.echosting.cafe24.com/skin/base/common/btn_captcha_refresh.png" onClick="BOARD.refresh_captcha('Write','');"/>
                                                 <p>
                                                     <input id="captcha" name="captcha" fw-filter="isFill" fw-label="보안문자" fw-msg="" className="inputTypeText" placeholder="보안문자를 입력해 주세요." value="" type="text"/>
                                                     <span className="ec-base-help txtInfo">영문, 숫자 조합을 공백없이 입력하세요(대소문자구분)</span>
                                                 </p>
                                             </td>
                                         </tr>
                                         <tr className="agree ">
                                             <th scope="row">개인정보 수집 및 <br/>이용 동의</th>
                                             <td>
						                         <textarea id="privacy_agreement" name="privacy_agreement" fw-filter="" fw-label="개인정보보호정책" fw-msg="">
							                        ■ 개인정보의 수집·이용 목적
													서비스 제공 및 계약의 이행, 구매 및 대금결제, 물품배송 또는 청구지 발송, 회원관리 등을 위한 목적

													■ 수집하려는 개인정보의 항목
													이름, 주소, 연락처, 이메일 등

													■ 개인정보의 보유 및 이용 기간
													회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외없이 해당정보를 파기합니다.
												 </textarea>
                                                 <br/>개인정보 수집 및 이용에 동의하십니까?
                                                 <input id="privacy_agreement_radio0" name="privacy_agreement_radio" fw-filter="isFill" fw-label="개인정보보호정책" fw-msg="" value="T" type="radio"/>
                                                 <label htmlFor="privacy_agreement_radio0">동의함</label>
                                                 <input id="privacy_agreement_radio1" name="privacy_agreement_radio" fw-filter="isFill" fw-label="개인정보보호정책" fw-msg="" value="F" type="radio" checked="checked"/>
                                                 <label htmlFor="privacy_agreement_radio1">동의안함</label>
                                             </td>
                                         </tr>
                                         </tbody>
                                         </table>
                                         </div>
                                <div className="button_g ">
                                    <div className="btnArea M b_left">
                                        <a href="/board/product/list.html?board_no=6&amp;cate_no=273" className="black_s">목록보기</a>
                                    </div>
                                    <div className="btnArea M b_left displaynone">
                                        <a href="#none" onClick="" className="gray_s">관리자답변보기</a>
                                    </div>
                                    <div className="btnArea M b_right">
                                        <a href="/board/product/list.html?board_no=6&amp;cate_no=273" className="gray_s">취소</a>
                                    </div>
                                    <div className="btnArea M b_right">
                                        <a href="#none" onClick="BOARD_WRITE.form_submit('boardWriteForm');" className="black_s" onMouseDown="_AceTM.ReView(document.getElementById('product_no').value,document.getElementById('subject').value,5);">등록하기</a>

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

export default qa;