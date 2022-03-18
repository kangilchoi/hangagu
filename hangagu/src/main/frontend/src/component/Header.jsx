//import Button from 'react-bootstrap/Button';
//import {DropdownButton, Dropdown} from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import * as Auth from 'component/Auth';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

/*css*/
import "css/main/nanumgothic.css"
import "css/main/googlefont1.css"
import "css/main/googlefont2.css"
import "css/main/googlefont3.css"
//import "css/optimizer.css"
import "css/main.css"
import "css/dropDown.css"

/*img*/
import g_btn_menu_plus from "img/g_btn_menu_plus.png"
import member_icon_b from "img/member_icon_b.png"
import cart_icon_b from "img/cart_icon_b.png"
import find_icon_b from "img/find_icon_b.png"
import wish_icon_b from "img/wish_icon_b.png"

/*javascript(view 관련 소스, ex : slider, menu drop down...)*/
// import "js/main/common.js"
// import "js/main/generate.js"
// import "js/main/wcslog.js"
// import "js/main/moment.js"
// import "js/main/i18n.js"

//import "js/main/optimizer5.js" 

function Header() {
	const [isLogin, setIsLogin] = useState(false);
	const [id,setId] = useState('');
	const history = useHistory();

	//Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
		login();
		// history.push({
		// 	pathname: "/main"
		// });
    },[]);

	const login = () =>{
		let userId = Auth.getLoggedInUserName();
		//비로그인
		if(''===userId){
			setIsLogin(false);
		}else {
			//로그인
			setIsLogin(true);
			setId(userId);
		}
		//window.location.reload();
	}
	const logout = () =>{
		Auth.logout();
		alert('로그아웃 되었습니다.');
		setIsLogin(false);
		setId("");
		history.push({
			pathname: "/main"
		});
	}

  return (
    <div id="header">
		<div className="header_inner">
			<div className="top_left_menu">
				<div className="xans-element- xans-layout xans-layout-logotop logotop ">
				<Link to="/main">
						<span style={{fontSize:"25px"}}>
							<span style={{fontWeight:"bold"}}>Han</span>
							<span>gagu</span>
						</span>
				</Link>
				</div>
				<ul>
					<li>
						<div id="category" className="xans-element- xans-layout xans-layout-category top_category">
							<div className="position">
								<ul>
									{/* 
									<li className="full_btn">
										<img src={g_btn_menu_plus} alt="전체보기"/>
									</li>
                  					<li className="full_btn_plus" style="display: none;">
										<img src="img/g_btn_menu_plus.png" alt="전체보기 닫기"/>
									</li>
                 					 */}
									<li className="xans-record-">
										<a href="#">ABOUT US</a>
									</li>
									<li className="xans-record-">
										<a href="#">COLLECTION</a>
									</li>
									<li className="xans-record-">
										<a href="#">WOODSLAB</a>
									</li>
									<li className="xans-record-">
										<a href="#">HOME FURNITURE</a>
									</li>
									<li className="xans-record-">
										<a href="#">CONTRACT FURNITURE</a>
									</li>
									<li>
										<a href="#">PORTFOLIO</a>
										<div className="t_view"></div>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div className="top_right_menu">
				<div className="top_board">
					<ul>
						<li className="t_menu dropDown">
							<a href="" style={{verticalAlign: "-4px"}}>COMMUNITY</a>
							<div className="t_view dropDownMenu">
								<ul className="">
									<li><a href="#">Q&A</a></li>
									<li><a href="#">REVIEW</a></li>
									<li><a href="#">MEDIA</a></li>
									<li><a href="#">CUSTOM MADE</a></li>
								</ul>
							</div>
						</li>
						<li className="t_menu dropDown">
							<a href="#" style={{verticalAlign: "-4px"}}>EVENT</a>
							<div className="t_view dropDownMenu">
								<div className="sub_sec">
									<ul>
										<li>
											<a href="#">
												<font>~60%세일</font>
											</a>
										</li>
										<li>
											<a href="#">이벤트&소재</a>
										</li>
									</ul>
								</div>
							</div>
						</li>

						{/*회원이름*/}
						<li className="t_menu dropDown">
								{
									(() => {
										if(isLogin){
											return <span style={{fontSize:"15px", fontWeight:"bold"}}>
											{id} 님
											</span>
										}
									})()
								}
						</li>
					</ul>
				</div>
				
				<div className="xans-element- xans-layout xans-layout-statelogoff top_util">
					<ul>
						<li className="t_menu dropDown">
							<a href="#">
								<img src={member_icon_b} width="18px" alt="멤버쉽"/>
							</a>
							<div className="t_view dropDownMenu">
								<div className="sub_sec">
									<ul>
										{
											(() => {
												if(!isLogin){
													return <>
													<Link to="/login">
													<li><span style={{cursor:"pointer"}} className="log">로그인</span></li>
													</Link>
													
													<Link to="/join">
													<li><span style={{cursor:"pointer"}} className="log">회원가입</span></li>
													</Link>
													</>
												}else{
													return <>
														<Link to="/myPage">
                                                        	<li className="black">마이페이지</li>
                                                   		</Link>
														<Link to="/profile">
															<li className="black">회원정보</li>
                                                   		</Link>
														<li><span>내 리뷰보기</span></li>
														<li><span style={{cursor:"pointer"}} onClick={logout}>로그아웃</span></li>
													</>
												}
											})()
										}
									</ul>
								</div>
							</div>
						</li>
						{
							(() => {
								if(isLogin){
									return <>
									<li className="t_menu dropDown">
										<a id="addcart" href="#">
											<img src={cart_icon_b} width="18px" alt="장바구니"/>
										</a>
										<div className="t_view dropDownMenu">
											<div className="sub_sec">
												<ul>
                                                    <Link to="/cart/get">
                                                        <li>
                                                            <a id="addcart" href="#">
                                                                장바구니
                                                                <span className="count displaynone"></span>
                                                            </a>
                                                        </li>
                                                    </Link>
                                                    <Link to="/order/get">
													<li>
														<a href="#">주문조회</a>
													</li>
                                                    </Link>
												</ul>
											</div>
										</div>
									</li>
									</>
								}
							})()
						}
						<li className="t_menu">
							<span className="search_btn_on">
								<img src={find_icon_b} width="18px" alt="검색"/>
							</span>
							<div className="t_view_search">
								<form id="searchBarForm" name="" action="/product/search.html" method="get" target="_self">
									<input id="banner_action" name="banner_action" type="hidden"/>
									<div className="xans-element- xans-layout xans-layout-searchheader">
										<fieldset>
										  <legend>검색</legend>
										  <input id="keyword" name="keyword" fw-filter="" fw-label="검색어" fw-msg="" className="inputTypeText" type="text"/>
										  <input type="image" src="https://furnimass.com/innoy/images/search_icon_b.png" width="18px" alt="검색"/>
										</fieldset>
									</div>
								</form>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="full_menu"></div>

            <div class="right_bt_page">
                <div class="right_search_bt">
                    {/* <!-- 장바구니 --> */}
                    <button class="search_pop_bt" alt="Search bt">
                        <Link to="/cart/get">
                            <img src={cart_icon_b} alt="Search"></img>
                        </Link>
                        <div class="text">장바구니</div>
                    </button>
                </div>

                {/* <!--관심 상품-->   */}
                <div class="right_kakao_bt">
                    <Link to="/interestProduct/get">
                        <img src={wish_icon_b} alt="Search"></img>
                    </Link>
                    <div class="text">관심상품</div>
                </div>
            </div>
		</div>
	</div>
  );
}

export default Header;