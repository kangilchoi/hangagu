import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Auth from 'component/Auth';
import { Link } from 'react-router-dom'

/*css*/
import "css/myPage/myPage.css"

function MyPage(){
	//회원 정보
	const [memberNm, setMemberNm] = useState(null);
	const [memberGrade, setMemberGrade] = useState(null);
	const [memLoading, setMemloading] = useState(false);
  	const [memError, setMemError] = useState(null);
	//배송정보
	const [delBeforeDeposit, setDelBeforeDeposit] = useState(0);
	const [delReady, setDelReady] = useState(0);
	const [delInDelivery, setDelInDelivery] = useState(0);
	const [delComplete, setDelComplete] = useState(0);
	const [delCancel, setDelCancel] = useState(0);
	const [delExchange, setDelExchange] = useState(0);
	const [delReturn, setDelReturn] = useState(0);

	//Hook(useEffect) : 컴포넌트 랜더링마다 실행
	useEffect(() => {

		//fetch Member 정보
		const fetchMember = async () => {
		  try {
			//초기화
			setMemError(null);
			setMemberNm(null);
			setMemberGrade(null);
			setMemloading(true);

			let username = Auth.getLoggedInUserName();

			//axios
			const response = await axios.get('/member/getGradeInfo/'+username);
			//console.log(response.data.data.memGrade);
			//setter
			if(response.data.data){
				setMemberNm(response.data.data.memNm);
				setMemberGradeInfo(response.data.data.memGrade);
			}

		  } catch (e) {
			setMemError(e);
			console.log(e);
		  }
		  setMemloading(false);
		};
		
		//setter
		const setMemberGradeInfo = (memGrade) => {
			let res='';

			if(memGrade==='STAFF'){
				res = '일반'	
			}
			setMemberGrade(res);
		}

		//fetch 배송정보
		const fetchDeliverInfo = async () => {
			try {
			  //초기화
			  initDeliverInfo();
  
			  let username = Auth.getLoggedInUserName();
			  //axios
			  const response = await axios.get(
				'/member/myPage/'+username
			  );
			  //setter
			  setDeliverInfo(response.data);
			} catch (e) {
			  console.log(e);
			}
		};

		//init
		const initDeliverInfo = () => {
			setDelBeforeDeposit(0);
			setDelReady(0);
			setDelInDelivery(0);
			setDelComplete(0);
			setDelCancel(0);
			setDelExchange(0);
			setDelReturn(0);
		}

		//setter
		const setDeliverInfo = (data) => {
			const del = data.data;
			del.map(type => (
				(()=>{
					let k = type[0];
					let v = type[1];

					if(k==='BEFORE_DEPOSIT')
						setDelBeforeDeposit(v);
					else if(k==='READY')
						setDelReady(v);
					else if(k==='IN_DELIVERY')
						setDelInDelivery(v);
					else if(k==='COMPLETE')
						setDelComplete(v);
					else if(k==='CANCEL')
						setDelCancel(v);
					else if(k==='EXCHANGE')
						setDelExchange(v);
					else if(k==='RETURN')
						setDelReturn(v);
				})()
			))
		}
	
		fetchMember();
		fetchDeliverInfo();
	}, []);   //처음만 수행 []
	
	if(!memberNm) return <div>회원 이름 조회 error</div>;
	if(!memberGrade) return <div>회원 등급 조회 error</div>;
	if(memError) return <div>회원 정보 조회 error</div>
	if(memLoading) return <div>loading...</div>

	//if(!deliverInfo) return null;

	return(
		
	<div id="wrap">

		<div id="container">
			<div id="contents">
				<div className="titleArea">
					<h2>MY PAGE</h2>
				</div>
				
				<div className="xans-element- xans-myshop xans-myshop-asyncbenefit">
					<div className="information">
						<div className="description">
							<p>
								{/* 회원등급 */}
								<strong className="txtEm">
									<span className="xans-member-var-name">{memberNm}</span>
									</strong> 님은 <strong>
									[
									<span className="xans-member-var-group_name">
										{memberGrade}
									</span>
									<span className="myshop_benefit_ship_free_message"></span>
									]
								</strong> 
								회원이십니다.
							</p>
						</div>
					</div>
				</div>
				
				
				{/* <!-- 주문 현황 --> */}
				<div className="xans-element- xans-myshop xans-myshop-orderstate ">
					<div className="title">
						<h3>
							나의 주문처리 현황 <span className="desc">(최근 <em>3개월</em> 기준)</span>
						</h3>
					</div>
					<div className="state">
						<ul className="order">
							<li>
								<strong>입금전</strong>
								<a href="/myshop/order/list.html?order_status=shipped_before" className="count">
									<span id="xans_myshop_orderstate_shppied_before_count">
									{delBeforeDeposit}
									</span>
								</a>
							</li>
							<li>
								<strong>배송준비중</strong>
								<a href="/myshop/order/list.html?order_status=shipped_standby" className="count">
									<span id="xans_myshop_orderstate_shppied_standby_count">
									{delReady}
									</span>
								</a>
							</li>
							<li>
								<strong>배송중</strong>
								<a href="/myshop/order/list.html?order_status=shipped_begin" className="count">
									<span id="xans_myshop_orderstate_shppied_begin_count">
									{delInDelivery}
									</span>
								</a>
							</li>
							<li>
								<strong>배송완료</strong>
								<a href="/myshop/order/list.html?order_status=shipped_complate" className="count">
									<span id="xans_myshop_orderstate_shppied_complate_count">
									{delComplete}
									</span>
								</a>
							</li>
						</ul>
						<ul className="cs">
							<li>
								<span className="icoDot"></span>
								<strong>취소 : </strong>
								<a href="/myshop/order/list.html?order_status=order_cancel" className="count">
									<span id="xans_myshop_orderstate_order_cancel_count">{delCancel}</span>
								</a>
							</li>
							<li>
								<span className="icoDot"></span>
								<strong>교환 : </strong>
								<a href="/myshop/order/list.html?order_status=order_exchange" className="count">
									<span id="xans_myshop_orderstate_order_exchange_count">{delExchange}</span>
								</a>
							</li>
							<li>
								<span className="icoDot"></span>
								<strong>반품 : </strong>
								<a href="/myshop/order/list.html?order_status=order_return" className="count">
									<span id="xans_myshop_orderstate_order_return_count">{delReturn}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				
				{/* <!-- 하단 Link --> */}
				<div id="myshopMain" className="xans-element- xans-myshop xans-myshop-main ">
					<ul>
						<li>
							<a href="/myshop/order/list.html">
								<h3>
									<strong>Order</strong>주문내역 조회
								</h3>
								<p>고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다. 비회원의 경우, 주문서의 주문번호와
									비밀번호로 주문조회가 가능합니다.</p>
							</a>
						</li>
						<li>
							<a href="/member/modify.html">
								<h3>
									<strong>Profile</strong>회원 정보
								</h3>
								<p>회원이신 고객님의 개인정보를 관리하는 공간입니다. 개인정보를 최신 정보로 유지하시면 보다 간편히 쇼핑을
									즐기실 수 있습니다.</p>
							</a>
						</li>
						<li>
							<a href="/myshop/wish_list.html">
								<h3>
									<strong>Wishlist</strong>관심 상품
								</h3>
								<p>관심상품으로 등록하신 상품의 목록을 보여드립니다.</p>
							</a>
						</li>
						<li className="displaynone">
							<a href="">
								<h3>
									<strong>Like it</strong>좋아요
								</h3>
								<p>'좋아요'를 선택한 상품과 상품분류 목록을 보여드립니다.</p>
							</a>
						</li>
						<li>
							<a href="/myshop/mileage/historyList.html">
								<h3>
									<strong>Mileage</strong>적립금
								</h3>
								<p>적립금은 상품 구매 시 사용하실 수 있습니다. 적립된 금액은 현금으로 환불되지 않습니다.</p>
							</a>
						</li>
						<li className="displaynone">
							<a href="/myshop/deposits/historyList.html">
								<h3>
									<strong>Deposits</strong>예치금
								</h3>
								<p>예치금은 현금과 동일하게 상품 구매시 사용하실 수 있습니다. 예치된 금액은 현금으로 환불이 가능합니다.
									(예치금 적립: 주문취소 등의 환불금액 발생 시 예치금으로 적립이 가능합니다.)</p>
							</a>
						</li>
						<li className="displaynone">
							<a href="/board/consult/list.html">
								<h3>
									<strong>Consult</strong>1:1 맞춤상담
								</h3>
								<p>고객님의 궁금하신 문의사항에 대하여 1:1맞춤상담 내용을 확인하실 수 있습니다.</p>
							</a>
						</li>
						<li className="displaynone">
							<a href="/myshop/coupon/coupon.html">
								<h3>
									<strong>Coupon</strong>쿠폰
								</h3>
								<p>고객님이 보유하고 계신 쿠폰내역을 보여드립니다.</p>
							</a>
						</li>
						<li>
							<a href="/myshop/board_list.html">
								<h3>
									<strong>Board</strong>게시물 관리
								</h3>
								<p>고객님께서 작성하신 게시물을 관리하는 공간입니다. 고객님께서 작성하신 글을 한눈에 관리하실 수
									있습니다.</p>
							</a>
						</li>
						<li>
							<a href="/myshop/addr/list.html">
								<h3>
									<strong>Address</strong>배송 주소록 관리
								</h3>
								<p>자주 사용하는 배송지를 등록하고 관리하실 수 있습니다.</p>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	);
}

export default MyPage;