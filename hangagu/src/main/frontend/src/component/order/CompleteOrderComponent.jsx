import React, { Component, useState, useEffect, useRef } from 'react';
import OrderService from 'service/OrderService';
import CartService from 'service/CartService';
import MemberService from 'service/MemberService';
import "css/optimizer.css";
import "css/common.css";
import "css/order/orderResult.css";
import "css/order/order.css";
import { useHistory, useParams } from "react-router-dom";
import qs from "qs";
import * as common from "js/common.js";
import DaumPostcode from 'react-daum-postcode';
import * as Auth from "component/Auth"

function CompleteOrderComponent({location}) {
    const [cartList, setCartList] = useState([]);
    const [memberInfo, setMemberInfo] = useState([]);

    let sumPriceVal = 0;
    let sumDeliveryPriceVal = 0;
    let sumSalesPriceVal = 0;
    let totalVal = 0;

    const [sumPrice, setSumPrice] = useState(0);
    const [sumDeliveryPrice, setSumDeliveryPrice] = useState(0);
    const [sumSalesPrice, setSumSalesPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [cartKey, setCartKey] = useState();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix:true,
    });

    useEffect(() => {
        const fetchCartList = async() => {
            try {
                let username = Auth.getLoggedInUserName();

                CartService.getCartDetail(query.cartKey).then(res => {
                    setCartList(res.data.data);
                    

                    sumPriceVal = sumPriceVal + Number(res.data.data.pmPrice * res.data.data.pmQuantity);
                    sumDeliveryPriceVal = sumDeliveryPriceVal + Number(res.data.data.pmDeliveryPrice);
                    sumSalesPriceVal = sumSalesPriceVal + Number(res.data.data.pmPrice * res.data.data.pmSalesRate * 0.01 * res.data.data.pmQuantity);


                    totalVal = sumPriceVal + sumDeliveryPriceVal - sumSalesPriceVal;

                    setSumPrice(sumPriceVal);
                    setSumDeliveryPrice(sumDeliveryPriceVal);
                    setSumSalesPrice(sumSalesPriceVal);
                    setTotal(totalVal);
                    setCartKey(res.data.data.cartKey);

                    fetchMemberInfo(username);
                }).catch(err => console.log(err))
            } catch(e) {
                console.log(e);
            }
        }

        const fetchMemberInfo = async(username) => {
            try {
                MemberService.getMember(username).then(res => {
                    setMemberInfo(res.data.data);
                }).catch(err => console.log(err))
            } catch(e) {
                console.log(e);
            }
        }

        fetchCartList();

    }, []);

    const toOrderList = () => {
        window.location.href="/order/get/"+memberInfo.memKey;
    }


    return (
        <div id="wrap">
            <div id="container">
                <div id="contents">

                    <div className="path">
                        <span>현재 위치</span>
                        <ol>
                            <li><a href="/">홈</a></li>
                            <li title="현재 위치"><strong>주문 완료</strong></li>
                        </ol>
                    </div>

                    <div className="titleArea">
                        <h2>THANKS TO</h2>
                    </div>

                    <div className="xans-element- xans-member xans-member-joincomplete ">
                        <div className="joinComplete">
                            <p className="desc">주문이 완료되었습니다.</p>

                            <div className="information">
                                <div className="description">
                                    <div className="boardList">
                                        <table border="1" summary="">
                                            <caption>기본배송</caption>
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="chk displaynone">
                                                        <input type="checkbox" disabled="" />
                                                        {/* onClick="EC_SHOP_FRONT_ORDERFORM_PRODUCT.proc.setCheckOrderList('chk_order_cancel_list_basic', this);"  */}
                                                    </th>
                                                    <th scope="col" className="thumb">이미지</th>
                                                    <th scope="col" className="product">상품정보</th>
                                                    <th scope="col" className="price">판매가</th>
                                                    <th scope="col" className="quantity">수량</th>
                                                    <th scope="col" className="mileage">적립금</th>
                                                    <th scope="col" className="delivery">배송구분</th>
                                                    <th scope="col" className="charge">배송비</th>
                                                    <th scope="col" className="total">합계</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="9">
                                                        <strong className="type">[기본배송]</strong> 상품구매금액&nbsp;
                                                        <strong>{ common.getCommaStr(Number(cartList.pmPrice) * Number(cartList.pmQuantity)) }</strong> + 배송비 {common.getCommaStr(cartList.pmDeliveryPrice) }
                                                        <span className=""> - 상품할인금액 { common.getCommaStr(common.getSalesPrice(cartList.pmPrice, cartList.pmSalesRate)) } </span> = 합계 : 
                                                        <strong className="total"><span id="domestic_ship_fee_sum">{ common.getCommaStr(Number(cartList.pmPrice) * Number(cartList.pmQuantity) + Number(cartList.pmDeliveryPrice) - Number(common.getSalesPrice(cartList.pmPrice, cartList.pmSalesRate))) }</span>원</strong>
                                                        <span className="displaynone"></span>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                            <tbody className="xans-element- xans-order xans-order-normallist">
                                                <tr className="xans-record-">
                                                    <td className="chk displaynone">
                                                        <input id="chk_order_cancel_list0" name="chk_order_cancel_list_basic0" value="3840:000J:F:1034" type="checkbox" disabled="" readOnly/>
                                                    </td>
                                                    <td className="thumb">
                                                        <a href="/product/detail.html?product_no=3840&amp;cate_no=296">
                                                            <img src={cartList.pmImgSrc} alt={cartList.pmNm} />{/* onError="this.src='https://img.echosting.cafe24.com/thumb/img_product_small.gif';" */}
                                                        </a>
                                                    </td>
                                                    <td className="product">
                                                        <a href="/product/detail.html?product_no=3840&amp;cate_no=296"><strong>{ cartList.pmNm }</strong></a>
                                                        <div className="option ">[색상 : { cartList.pmSelectedColor }]</div>
                                                        <p className="free displaynone">무이자할부 상품</p>
                                                        <p className="period displaynone">유효기간 : </p>
                                                    </td>
                                                    <td className="price">
                                                        {/* <div className="discount">
                                                            <strong>484,000원</strong><p className="displaynone"></p>
                                                        </div> */}
                                                        <div className="">
                                                            <strong>{ common.getCommaStr(cartList.pmPrice) }</strong><p className="displaynone"></p>
                                                        </div>
                                                    </td>
                                                    <td className="quantity">{ cartList.pmQuantity }</td>
                                                    <td className="mileage">
                                                        <input id="product_mileage_all_3840_000J" value="3388" type="hidden" readOnly/>
                                                        <img src="//img.echosting.cafe24.com/design/common/icon_cash.gif" /> 
                                                        { common.getCommaStr(((Number(cartList.pmPrice)*Number(cartList.pmQuantity)) + Number(cartList.pmDeliveryPrice) - Number(common.getSalesPrice(cartList.pmPrice, cartList.pmSalesRate))) * 0.01) }
                                                    </td>
                                                    <td className="delivery">기본배송
                                                        <div className="displaynone">(해외배송가능)</div>
                                                    </td>
                                                    <td className="charge">{common.getCommaStr(cartList.pmDeliveryPrice) }<input type="hidden" value={cartList.pmDeliveryPrice} name="deliveryPrice" /></td>
                                                    <td className="total">
                                                        <strong>{ common.getCommaStr((Number(cartList.pmPrice)*Number(cartList.pmQuantity)) + Number(cartList.pmDeliveryPrice) - Number(common.getSalesPrice(cartList.pmPrice, cartList.pmSalesRate))) }</strong>
                                                        <div className="displaynone"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="xans-element- xans-member xans-member-benefitjoin memberSpecial">
                                <p>
                                    <strong>
                                        <span>오세현</span> 님
                                    </strong>
                                    은 [일반회원] 회원이십니다.
                                </p>
                            </div>
                            <p className="memberEmail ">이메일 주소로 발송된 인증 메일을 통해 인증하신 후에 로그인이 가능합니다.</p> */}

                            <div className="ec-base-button">
                                <div className="btnArea L b_center">
                                    <a href="/index.html" className="gray">메인으로 이동</a>
                                </div>
                                <div class="btnArea L b_center">
                                    <a href="#" class="black" onClick={ toOrderList } id="toList">주문내역 보기</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompleteOrderComponent;