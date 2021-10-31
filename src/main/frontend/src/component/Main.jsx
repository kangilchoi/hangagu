import Button from 'react-bootstrap/Button';
import {DropdownButton, Dropdown} from 'react-bootstrap'

/*css*/
import "css/main/nanumgothic.css"
import "css/main/googlefont1.css"
import "css/main/googlefont2.css"
import "css/main/googlefont3.css"
import "css/optimizer.css"
import "css/main.css"

/*img*/
import g_btn_menu_plus from "img/g_btn_menu_plus.png"
import member_icon_b from "img/member_icon_b.png"
import cart_icon_b from "img/cart_icon_b.png"
import find_icon_b from "img/find_icon_b.png"

/*javascript(view 관련 소스, ex : slider, menu drop down...)*/
// import "js/main/common.js"
// import "js/main/generate.js"
// import "js/main/wcslog.js"
// import "js/main/moment.js"
// import "js/main/i18n.js"

// import "js/main/optimizer5.js" 

function Main() {
  return (
    <div id="header">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="success">Success</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="info">Info</Button>
    <Button variant="light">Light</Button>
    <Button variant="dark">Dark</Button>
    <Button variant="link">Link</Button>
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      Dropdown Button
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
		<div className="header_inner">
			<div className="top_left_menu">
				<div className="xans-element- xans-layout xans-layout-logotop logotop ">
					<a href="/main2.html">
						<img src="https://furnimass.com/web/upload/category/logo/8dbe91e7181cad0f62904267b5630a07_10_top.jpg" alt="퍼미내스"/>
					</a>
				</div>
				<ul>
					<li>
						<div id="category" className="xans-element- xans-layout xans-layout-category top_category">
							<div className="position">
								<ul>
									<li className="full_btn">
										<img src={g_btn_menu_plus} alt="전체보기"/>
									</li>
									{/* 
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
						<li className="t_menu">
							<a href="#">COMMUNITY</a>
							<div className="t_view">
								<div className="sub_sec">
									<ul>
										<li><a href="#">Q&A</a></li>
										<li><a href="#">REVIEW</a></li>
										<li><a href="#">MEDIA</a></li>
										<li><a href="#">CUSTOM MADE</a></li>
									</ul>
								</div>
							</div>
						</li>
						<li className="t_menu">
							<a href="#">EVENT</a>
							<div className="t_view">
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
					</ul>
				</div>
				<div className="xans-element- xans-layout xans-layout-statelogoff top_util">
					<ul>
						<li className="t_menu">
							<a href="#">
								<img src={member_icon_b} width="18px" alt="멤버쉽"/>
							</a>
							<div className="t_view">
								<div className="sub_sec">
									<ul>
										<li><a href="./login/login.html" className="log">로그인</a></li>
										<li><a href="#">회원가입</a></li>
										<li><a href="#">마이페이지</a></li>
									</ul>
								</div>
							</div>
						</li>
						<li className="t_menu">
							<a id="addcart" href="#">
								<img src={cart_icon_b} width="18px" alt="장바구니"/>
							</a>
							<div className="t_view">
								<div className="sub_sec">
									<ul>
										<li>
											<a id="addcart" href="#">
												장바구니
												<span className="count displaynone"></span>
											</a>
										</li>
										<li>
											<a href="#">주문조회</a>
										</li>
										<li>
											<a href="#">ONLY U</a>
										</li>
									</ul>
								</div>
							</div>
						</li>
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
		</div>
	</div>
  );
}

export default Main;
