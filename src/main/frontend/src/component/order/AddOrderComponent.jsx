import React, { Component, useState, useEffect, useRef } from 'react';
import OrderService from 'service/OrderService';
import CartService from 'service/CartService';
import MemberService from 'service/MemberService';
import "css/optimizer.css";
import "css/common.css";
import "css/order/order.css";
import { useHistory, useParams } from "react-router-dom";
import qs from "qs";
import * as common from "js/common.js";
import DaumPostcode from 'react-daum-postcode';
import * as Auth from "component/Auth"
import { NavItem } from 'react-bootstrap';

function AddOrderComponent({location}) {
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

    const [address, setAddress] = useState(''); // 주소
    const [addressDetail, setAddressDetail] = useState(''); // 상세주소

    
    const [isOpenPost, setIsOpenPost] = useState(false);
    
    const query = qs.parse(location.search, {
        ignoreQueryPrefix:true,
    });

    useEffect(() => {
        const fetchCartList = async() => {
            try {
                CartService.getCartDetail(query.cartKey).then(res => {
                    setCartList(res.data.data);
                    // for(let i in res.data.data) {
                    //     sumPriceVal = sumPriceVal + Number(res.data.data[i].pmPrice * res.data.data[i].pmQuantity);
                    //     sumDeliveryPriceVal = sumDeliveryPriceVal + Number(res.data.data[i].pmDeliveryPrice);
                    //     sumSalesPriceVal = sumSalesPriceVal + Number(res.data.data[i].pmPrice * res.data.data[i].pmSalesRate * 0.01);
                    // }

                    sumPriceVal = sumPriceVal + Number(res.data.data.pmPrice * res.data.data.pmQuantity);
                    sumDeliveryPriceVal = sumDeliveryPriceVal + Number(res.data.data.pmDeliveryPrice);
                    sumSalesPriceVal = sumSalesPriceVal + Number(res.data.data.pmPrice * res.data.data.pmSalesRate * 0.01 * res.data.data.pmQuantity);


                    totalVal = sumPriceVal + sumDeliveryPriceVal - sumSalesPriceVal;

                    setSumPrice(sumPriceVal);
                    setSumDeliveryPrice(sumDeliveryPriceVal);
                    setSumSalesPrice(sumSalesPriceVal);
                    setTotal(totalVal);
                    setCartKey(res.data.data.cartKey);

                    fetchMemberInfo();
                }).catch(err => console.log(err))
            } catch(e) {
                console.log(e);
            }
        }

        const fetchMemberInfo = async() => {
            try {
                let username = Auth.getLoggedInUserName();

                MemberService.getMember(username).then(res => {
                    setMemberInfo(res.data.data);
                }).catch(err => console.log(err))
            } catch(e) {
                console.log(e);
            }
        }

        fetchCartList();

    }, []);
    
    const sameAddr = () => {

        const inputs = document.querySelector("[id='ec-jigsaw-area-billingInfo']").querySelectorAll("input");
        const selects = document.querySelector("[id='ec-jigsaw-area-billingInfo']").querySelectorAll("select");
        const originArr = [...inputs, ...selects];
        
        for(let i = 0; i < originArr.length; i++) {
            if(document.querySelector("[id='ec-jigsaw-area-shippingInfo']").querySelector("[id='"+originArr[i].id.replace("o","r")+"']") != null) {
                (document.querySelector("[id='ec-jigsaw-area-shippingInfo']").querySelector("[id='"+originArr[i].id.replace("o","r")+"']")).value = originArr[i].value;
            }
        }

    }

    const resetAddr = () => {

        const inputs = document.querySelector("[id='ec-jigsaw-area-shippingInfo']").querySelectorAll("input");
        const selects = document.querySelector("[id='ec-jigsaw-area-shippingInfo']").querySelectorAll("select");
        
        let setInput = (current, index, arry) => inputs[index].value = "";
        inputs.forEach(setInput);

        let setSelect = (current, index, arry) => selects[index].value = selects[index].firstElementChild.value;
        selects.forEach(setSelect);

        setAddress('');
        setAddressDetail('');

    }

    const saveOrder = (formData) => {
        if(window.confirm("해당 정보로 주문하시겠습니까?")) {
            let odReceiverTel = "";
            let odCustTel = "";
            let odCustMobile = "";
            let odCustEmail = "";
            let odReceiverMobile = "";
            for (var pair of formData.entries()) {
                if(pair[0] == "odReceiverTel1_[]") {
                    odReceiverTel += pair[1];
                } else if(pair[0] == "odCustTel1_[]") {
                    odCustTel += pair[1];
                } else if(pair[0] == "odCustMobile1_[]") {
                    odCustMobile += pair[1];
                } else if(pair[0] == "odCustEmail1") {
                    odCustEmail += pair[1];
                } else if(pair[0] == "odReceiverMobile1_[]") {
                    odReceiverMobile += pair[1];
                }
                
            }
            
            formData.append("odReceiverTel", odReceiverTel);
            formData.delete("odReceiverTel1_[]");
            formData.append("odCustTel", odCustTel);
            formData.delete("odCustTel1_[]");
            formData.append("odCustMobile", odCustMobile);
            formData.delete("odCustMobile1_[]");
            formData.append("odCustEmail", odCustEmail);
            formData.delete("odCustEmail1");
            formData.append("odReceiverMobile", odReceiverMobile);
            formData.delete("odReceiverMobile1_[]");

            // for (var pair of formData.entries()) {
            //     console.log(pair[0] + "," + pair[1])
            // }

            OrderService.createOrder(formData).then(res => {
                if(res.data.code == '1') {
                    alert("주문이 완료되었습니다.");
                    window.location.href="/order/orderResult?cartKey="+query.cartKey;
                } else {
                    alert("주문이 실패하였습니다.");
                }

            }).catch(err => console.log(err))
        }
    }

    const onChangeOpenPost = () => {
        setIsOpenPost(!isOpenPost);
    };

    const onCompletePost = (data) => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        setAddress(data.zonecode);
        setAddressDetail(fullAddr);
        setIsOpenPost(false);
    };

    const postCodeStyle = {
        display: 'block',
        position: 'relative',
        top: '0%',
        width: '400px',
        height: '400px',
        padding: '7px',
    };


    return (
        <div id="wrap">
            <div id="container">
                <div id="contents">
                    <div className="path">
                        <span>현재 위치</span>
                        <ol>
                            <li><a href="/">홈</a></li>
                            <li title="현재 위치"><strong>주문서작성</strong></li>
                        </ol>
                    </div>
                    <div className="titleArea">
                        <h2>ORDER</h2>
                    </div>
                    <form action="" id="frm_order_act" name="frm_order_act" method="post" target="_self" encType="multipart/form-data" onSubmit={(e)=>{ e.preventDefault(); const data = new FormData(e.target);saveOrder(data); }}>
                        <input id="sEleID" value="total_price||productPeriod||ophone1_1||ophone1_2||ophone1_3||ophone2_1||ophone2_2||ophone2_3||ophone1_ex1||ophone1_ex2
                            ||ophone2_ex1||ophone2_ex2||basket_type||oname||oname2||english_oname||english_name||english_name2||input_mile||input_deposit||hope_date||hope_ship_begin_time
                            ||hope_ship_end_time||is_fast_shipping_time||fname||fname2||paymethod||eguarantee_flag||eguarantee_ssn1||eguarantee_ssn2||eguarantee_year||eguarantee_month
                            ||eguarantee_day||eguarantee_user_gender||eguarantee_personal_agreement||question||question_passwd||delvType||f_country||fzipcode||faddress||fphone1_1||fphone1_2
                            ||fphone1_3||fphone1_4||fphone1_ex1||fphone1_ex2||fphone2_ex1||fphone2_ex2||fphone2||fmessage||fmessage_select||rname||rzipcode1||rzipcode2||raddr1||raddr2||rphone1_1
                            ||rphone1_2||rphone1_3||rphone2_1||rphone2_2||rphone2_3||omessage||omessage_select||ozipcode1||ozipcode2||oaddr1||oaddr2||oemail||oemail1||oemail2||ocity||ostate
                            ||ozipcode||eguarantee_id||coupon_discount||coupon_saving||order_password||is_fast_shipping||fCountryCd||message_autosave||oa_content||gift_use_flag||pname||bankaccount
                            ||regno1||regno2||escrow_agreement0||addr_paymethod||member_group_price||chk_purchase_agreement||total_plusapp_mileage_price||mileage_generate3||is_hope_shipping||sCpnPrd
                            ||sCpnOrd||coupon_shipfee||np_req_tx_id||np_save_rate||np_save_rate_add||np_use_amt||np_mileage_use_amount||np_cash_use_amount||np_total_use_amount||np_balance_amt||np_use
                            ||np_sig||flagEscrowUse||flagEscrowIcashUse||add_ship_fee||total_group_dc||pron_name||pron_name2||pron_oname||faddress2||si_gun_dosi||ju_do||is_set_product||basket_prd_no
                            ||move_order_after||is_no_ozipcode||is_no_rzipcode||__ocountry||__oaddr1||__ocity||__ostate||__addr1||__city_name||__state_name||__isRuleBasedAddrForm||sSinameZhAreaWord
                            ||sSinameTwAreaWord||sGunameZhAreaWord||sGunameTwAreaWord||delivcompany||is_store||cashreceipt_user_type||cashreceipt_user_type2||cashreceipt_regist||cashreceipt_user_mobile1
                            ||cashreceipt_user_mobile2||cashreceipt_user_mobile3||cashreceipt_reg_no||is_cashreceipt_displayed_on_screen||tax_request_regist||tax_request_name||tax_request_phone1
                            ||tax_request_phone2||tax_request_phone3||tax_request_email1||tax_request_email2||tax_request_company_type||tax_request_company_regno||tax_request_company_name
                            ||tax_request_president_name||tax_request_zipcode||tax_request_address1||tax_request_address2||tax_request_company_condition||tax_request_company_line
                            ||is_taxrequest_displayed_on_screen||isSimplyOrderForm||use_safe_phone||app_scheme||isUpdateMemberEmailOrder||defer_commission||defer_p_name||order_form_simple_type||gmo_order_id
                            ||gmo_transaction_id||receiver_id_card_key||receiver_id_card_type||simple_join_is_check||simple_join_agree_use_info||etc_subparam_member_id||etc_subparam_email1||etc_subparam_passwd
                            ||etc_subparam_user_passwd_confirm||etc_subparam_passwd_type||etc_subparam_is_sms||etc_subparam_is_news_mail||information_agreement_check_val||consignment_agreement_check_val
                            ||remind_id||remind_code||shipping_additional_fee_show||shipping_additional_fee_hide||shipping_additional_fee_name_show||save_paymethod||allat_account_nm||basket_sync_flag
                            ||member_id||input_pointfy||set_main_address0||app_discount_data||is_shipping_address_readonly_by_app||is_app_shipfee||app_shipfee_data||is_available_shipping_company_by_app
                            ||is_direct_buy||is_subscription_invoice||subscription_start_date||order_enable||is_crowd_funding||is_used_with_mileage||is_used_with_member_discount||is_used_with_coupon" type="hidden" readOnly/>
                        <input type="hidden" value={useParams()} />
                        <input type="hidden" name="cartKey" value={cartKey} />
                        <input type="hidden" name="memKey" value={memberInfo.memKey} />
                        <input type="hidden" name="pmKey" value={cartList.pmKey} />
                        <div className="xans-element- xans-order xans-order-form xans-record-">
                            {/* 이값은 지우면 안되는 값입니다. ($move_order_after 주문완료페이지 주소 / $move_basket 장바구니페이지 주소)
                                $move_order_after=/order/order_result.html
                                $move_basket=/order/basket.html
                                */}
                            {/* 혜택정보 */}
                            <div className="xans-element- xans-order xans-order-dcinfo ec-base-box typeMember">
                                <div className="information">
                                    <h3 className="title">혜택정보</h3>
                                    <div className="description">
                                        <div className="member ">
                                            <p><strong>오세현</strong> 님은, [일반회원] 회원이십니다.</p>
                                        </div>
                                        <ul className="mileage">
                                            <li><a href="#">가용적립금 : <strong>1,000원</strong></a></li>
                                            <li><a href="#">쿠폰 : <strong>0개</strong></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <ul className="ec-base-help controlInfo" style={{display:'none'}}>
                                <li className="txtWarn txt11">상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.</li>
                            </ul>
                            {/* 국내배송상품 주문내역 */}
                            <div className="orderListArea ">
                                <div className="title">
                                    <h3>국내배송상품 주문내역</h3>
                                    <p className="button">
                                        <a href={useHistory.goBack}>
                                            <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_prev.gif" alt="이전페이지" />
                                        </a>
                                    </p>
                                </div>

                                {/* 기본배송 */}
                                <div className="boardList ">
                                    {
                                        // cartList? cartList.map((item, index) => {
                                        //     return (
                                        //         <table border="1" summary="">
                                        //             <caption>기본배송</caption>
                                        //             <thead>
                                        //                 <tr>
                                        //                     <th scope="col" className="chk displaynone">
                                        //                         <input type="checkbox" disabled="" />
                                        //                         {/* onClick="EC_SHOP_FRONT_ORDERFORM_PRODUCT.proc.setCheckOrderList('chk_order_cancel_list_basic', this);"  */}
                                        //                     </th>
                                        //                     <th scope="col" className="thumb">이미지</th>
                                        //                     <th scope="col" className="product">상품정보</th>
                                        //                     <th scope="col" className="price">판매가</th>
                                        //                     <th scope="col" className="quantity">수량</th>
                                        //                     <th scope="col" className="mileage">적립금</th>
                                        //                     <th scope="col" className="delivery">배송구분</th>
                                        //                     <th scope="col" className="charge">배송비</th>
                                        //                     <th scope="col" className="total">합계</th>
                                        //                 </tr>
                                        //             </thead>
                                        //             <tfoot>
                                        //                 <tr>
                                        //                     <td colSpan="9">
                                        //                         <strong className="type">[기본배송]</strong> 상품구매금액&nbsp;
                                        //                         <strong>{ common.getCommaStr(Number(item.pmPrice) * Number(item.pmQuantity)) }</strong> + 배송비 {common.getCommaStr(item.pmDeliveryPrice) }
                                        //                         <span className=""> - 상품할인금액 { common.getCommaStr(common.getSalesPrice(item.pmPrice, item.pmSalesRate)) } </span> = 합계 : 
                                        //                         <strong className="total"><span id="domestic_ship_fee_sum">{ common.getCommaStr(Number(item.pmPrice) * Number(item.pmQuantity) + Number(item.pmDeliveryPrice) - Number(common.getSalesPrice(item.pmPrice, item.pmSalesRate))) }</span>원</strong>
                                        //                         <span className="displaynone"></span>
                                        //                     </td>
                                        //                 </tr>
                                        //             </tfoot>
                                        //             <tbody className="xans-element- xans-order xans-order-normallist">
                                        //                 <tr className="xans-record-">
                                        //                     <td className="chk displaynone">
                                        //                         <input id="chk_order_cancel_list0" name="chk_order_cancel_list_basic0" value="3840:000J:F:1034" type="checkbox" disabled="" readOnly/>
                                        //                     </td>
                                        //                     <td className="thumb">
                                        //                         <a href="/product/detail.html?product_no=3840&amp;cate_no=296">
                                        //                             <img src="//furnimass.com/web/product/tiny/201909/b7ca7aa417f7fbf0c0cdb06ca18e4bfc.jpg" alt="" />{/* onError="this.src='https://img.echosting.cafe24.com/thumb/img_product_small.gif';" */}
                                        //                         </a>
                                        //                     </td>
                                        //                     <td className="product">
                                        //                         <a href="/product/detail.html?product_no=3840&amp;cate_no=296"><strong>{ item.pmNm }</strong></a>
                                        //                         <div className="option ">[색상 : { item.pmSelectedColor }]</div>
                                        //                         <p className="free displaynone">무이자할부 상품</p>
                                        //                         <p className="period displaynone">유효기간 : </p>
                                        //                     </td>
                                        //                     <td className="price">
                                        //                         {/* <div className="discount">
                                        //                             <strong>484,000원</strong><p className="displaynone"></p>
                                        //                         </div> */}
                                        //                         <div className="">
                                        //                             <strong>{ common.getCommaStr(item.pmPrice) }</strong><p className="displaynone"></p>
                                        //                         </div>
                                        //                     </td>
                                        //                     <td className="quantity">{ item.pmQuantity }</td>
                                        //                     <td className="mileage">
                                        //                         <input id="product_mileage_all_3840_000J" name="product_mileage_all" value="3388" type="hidden" readOnly/>
                                        //                         <img src="//img.echosting.cafe24.com/design/common/icon_cash.gif" /> 
                                        //                         { common.getCommaStr(((Number(item.pmPrice)*Number(item.pmQuantity)) + Number(item.pmDeliveryPrice) - Number(common.getSalesPrice(item.pmPrice, item.pmSalesRate))) * 0.01) }
                                        //                     </td>
                                        //                     <td className="delivery">기본배송
                                        //                         <div className="displaynone">(해외배송가능)</div>
                                        //                     </td>
                                        //                     <td className="charge">{common.getCommaStr(item.pmDeliveryPrice) }</td>
                                        //                     <td className="total">
                                        //                         <strong>{ common.getCommaStr((Number(item.pmPrice)*Number(item.pmQuantity)) + Number(item.pmDeliveryPrice) - Number(common.getSalesPrice(item.pmPrice, item.pmSalesRate))) }</strong>
                                        //                         <div className="displaynone"></div>
                                        //                     </td>
                                        //                 </tr>
                                        //             </tbody>
                                        //         </table>
                                        //     )
                                        // }):
                                        // <table><tr><td colspan="9">정보가 없습니다.</td></tr></table>
                                        cartList ?
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
                                                        <span className=""> - 상품할인금액 { common.getCommaStr(common.getSalesPrice(cartList.pmPrice, cartList.pmSalesRate) * Number(cartList.pmQuantity)) } </span> = 합계 : 
                                                        <strong className="total"><span id="domestic_ship_fee_sum">{ common.getCommaStr(Number(cartList.pmPrice) * Number(cartList.pmQuantity) + Number(cartList.pmDeliveryPrice) - Number(common.getSalesPrice(cartList.pmPrice, cartList.pmSalesRate) * Number(cartList.pmQuantity))) }</span>원</strong>
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
                                        : <table><tr><td colspan="9">정보가 없습니다.</td></tr></table>
                                    }
                                </div>
                            </div>
                            <ul className="ec-base-help controlInfo typeBtm">
                                <li className="txtWarn txt11">상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.</li>
                            </ul>
                            {/* 선택상품 제어 버튼 */}
                            <div className="ec-base-button" style={{display:'none'}}>
                                <span className="gLeft displaynone">
                                    <strong className="text">선택상품을</strong>
                                    <a href="#none" id="btn_product_delete">
                                        <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_delete2.gif" alt="삭제하기" />
                                    </a>
                                </span>
                                <span className="gRight">
                                    <a href={useHistory.goBack}>
                                        <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_prev.gif" alt="이전페이지" />
                                    </a>
                                </span>
                            </div>
                            {/* 주문 정보 */}
                            <div className="orderArea  ec-shop-ordererForm">
                                <div className="title">
                                    <h3 style={{float:'left'}}>주문 정보</h3>
                                    <p className="required"><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /> 필수입력사항</p>
                                </div>
                                <div className="boardWrite">
                                    <table border="1" summary="" id="ec-jigsaw-area-billingInfo">
                                        <caption>주문 정보 입력</caption>
                                        {/* 국내 쇼핑몰 */}
                                        <tbody className="address_form  ">
                                            <tr>
                                                <th scope="row">주문하시는 분 <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></th>
                                                <td><input id="oname" name="odCustName" fw-filter="isFill" fw-label="주문자 성명" fw-msg="" className="inputTypeText" placeholder="" size="15" type="text" value={ memberInfo.memNm } /></td>
                                            </tr>
                                            <tr className="">
                                                <th scope="row">주소 <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></th>
                                                <td>
                                                    <input id="ozipcode1" name="odCustPost" fw-filter="isFill" fw-label="주문자 우편번호1" fw-msg="" className="inputTypeText" placeholder="" size="6" maxLength="6" readOnly="1" type="text" value={ memberInfo.memPost } />
                                                    <a href="#none" id="btn_search_ozipcode">
                                                        {/* <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_zipcode.gif" alt="우편번호" /> */}
                                                    </a><br />
                                                    <input id="oaddr1" name="odCustAddr" fw-filter="isFill" fw-label="주문자 주소1" fw-msg="" className="inputTypeText" placeholder="" size="40" readOnly="1" type="text" value={ memberInfo.memAddr } /> 
                                                    <span className="grid">기본주소</span><br />
                                                    <input id="oaddr2" name="odCustAddr2" fw-filter="isFill" fw-label="주문자 주소2" fw-msg="" className="inputTypeText" placeholder="" size="40" type="text" value={ memberInfo.memDetailAddr } /> 
                                                    <span className="grid">나머지주소</span><span className="grid displaynone">(선택입력가능)</span>
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <th scope="row">일반전화 <span className="displaynone"><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></span></th>
                                                <td>
                                                    <select id="ophone1_1" name="odCustTel1_[]" fw-filter="isNumber" fw-label="주문자 전화번호" fw-alone="N" fw-msg="" value={ common.getTel(memberInfo.memTel, 0) }>
                                                        <option value="02">02</option>
                                                        <option value="031">031</option>
                                                        <option value="032">032</option>
                                                        <option value="033">033</option>
                                                        <option value="041">041</option>
                                                        <option value="042">042</option>
                                                        <option value="043">043</option>
                                                        <option value="044">044</option>
                                                        <option value="051">051</option>
                                                        <option value="052">052</option>
                                                        <option value="053">053</option>
                                                        <option value="054">054</option>
                                                        <option value="055">055</option>
                                                        <option value="061">061</option>
                                                        <option value="062">062</option>
                                                        <option value="063">063</option>
                                                        <option value="064">064</option>
                                                        <option value="0502">0502</option>
                                                        <option value="0503">0503</option>
                                                        <option value="0504">0504</option>
                                                        <option value="0505">0505</option>
                                                        <option value="0506">0506</option>
                                                        <option value="0507">0507</option>
                                                        <option value="070">070</option>
                                                        <option value="010">010</option>
                                                        <option value="011">011</option>
                                                        <option value="016">016</option>
                                                        <option value="017">017</option>
                                                        <option value="018">018</option>
                                                        <option value="019">019</option>
                                                        <option value="0508">0508</option>
                                                    </select>-
                                                    <input id="ophone1_2" name="odCustTel1_[]" maxLength="4" fw-filter="isNumber" fw-label="주문자 전화번호" fw-alone="N" fw-msg="" size="4" type="text" value={ common.getTel(memberInfo.memTel, 1) }/>-
                                                    <input id="ophone1_3" name="odCustTel1_[]" maxLength="4" fw-filter="isNumber" fw-label="주문자 전화번호" fw-alone="N" fw-msg="" size="4" type="text" value={ common.getTel(memberInfo.memTel, 2) }/>
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <th scope="row">휴대전화 <span className=""><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></span></th>
                                                <td>
                                                    <select id="ophone2_1" name="odCustMobile1_[]" fw-filter="isNumber&amp;isFill" fw-label="주문자 핸드폰번호" fw-alone="N" fw-msg="" value={ common.getTel(memberInfo.memPhone, 0) }>
                                                        <option value="010">010</option>
                                                        <option value="011">011</option>
                                                        <option value="016">016</option>
                                                        <option value="017">017</option>
                                                        <option value="018">018</option>
                                                        <option value="019">019</option>
                                                    </select>-
                                                    <input id="ophone2_2" name="odCustMobile1_[]" maxLength="4" fw-filter="isNumber&amp;isFill" fw-label="주문자 핸드폰번호" fw-alone="N" fw-msg="" size="4" type="text" value={ common.getTel(memberInfo.memPhone, 1) }/>-
                                                    <input id="ophone2_3" name="odCustMobile1_[]" maxLength="4" fw-filter="isNumber&amp;isFill" fw-label="주문자 핸드폰번호" fw-alone="N" fw-msg="" size="4" type="text" value={ common.getTel(memberInfo.memPhone, 2) }/>
                                                </td>
                                            </tr>
                                        </tbody>
                                        {/* <!-- 해외 쇼핑몰 -->
                                        <!-- 이메일 국내/해외 --> */}
                                        <tbody className="email">
                                            <tr>
                                                <th scope="row">이메일 <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></th>
                                                <td>
                                                    <input id="oemail1" name="odCustEmail1" fw-filter="isFill" fw-label="주문자 이메일" fw-alone="N" fw-msg="" className="mailId" type="text" value={ common.getEmail(memberInfo.memMail, 0) }/>@<input type="hidden" name="odCustEmail1" value="@" />
                                                    <input id="oemail2" name="odCustEmail1" fw-filter="isFill" fw-label="주문자 이메일" fw-alone="N" fw-msg="" className="mailAddress" readOnly="readonly" type="text" value={ common.getEmail(memberInfo.memMail, 1) }/>
                                                    <select id="oemail3" fw-filter="isFill" fw-label="주문자 이메일" fw-alone="N" fw-msg="" value={ memberInfo.memMail === "" ?  '1' : common.getEmail(memberInfo.memMail, 1) }>
                                                        <option value="1">- 이메일 선택 -</option>
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
                                                    <p className="grid">이메일을 통해 주문처리과정을 보내드립니다.<br />이메일 주소란에는 반드시 수신가능한 이메일주소를 입력해 주세요</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        {/* <!-- 비회원 결제 --> */}
                                        <tbody className="noMember displaynone">
                                            <tr>
                                                <th scope="row">주문조회 비밀번호 <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></th>
                                                <td> (주문조회시 필요합니다. 4자에서 12자 영문 또는 숫자 대소문자 구분)</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">주문조회 비밀번호<br />확인 <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></th>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!-- 배송 정보 --> */}
                            <div className="orderArea">
                                <div className="title">
                                    <h3 style={{float:'left'}}>배송 정보</h3>
                                    <p className="required"><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /> 필수입력사항</p>
                                </div>
                                <div className="boardWrite">
                                    <table border="1" summary="" id="ec-jigsaw-area-shippingInfo">
                                        <caption>배송 정보 입력</caption>
                                        {/* <!-- 비회원 결제 -->

                                        <!-- 국내 배송지 정보 --> */}
                                        <tbody className="">
                                            <tr className="">
                                                <th scope="row">배송지 선택</th>
                                                <td>
                                                    <div className="address">
                                                        <input name="addrselector" id="sameaddr0" fw-filter="" fw-label="1" fw-msg="" value="T" type="radio" readOnly onClick={ sameAddr }/><label htmlFor="sameaddr0">주문자 정보와 동일</label>
                                                        <input name="addrselector" id="sameaddr1" fw-filter="" fw-label="1" fw-msg="" value="F" type="radio" readOnly onClick={ resetAddr }/><label htmlFor="sameaddr1">새로운 배송지</label>                            
                                                        <span className="recent ec-shop-RecentDelivery displaynone">최근 배송지 :                             </span>
                                                        <a href="#none" id="btn_shipp_addr" className=""><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_address.gif" alt="주소록 보기" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">받으시는 분 <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></th>
                                                <td><input id="rname" name="odReceiverName" fw-filter="isFill" fw-label="수취자 성명" fw-msg="" className="inputTypeText" placeholder="" size="15" type="text" required/></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">주소 <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></th>
                                                <td>
                                                    <input id="rzipcode1" name="odReceiverPost" fw-filter="isFill" fw-label="수취자 우편번호1" fw-msg="" className="inputTypeText" placeholder="" size="6" maxLength="6" type="text" value={address} readOnly required/>                        
                                                    <a href="#none" id="btn_search_rzipcode" onClick={onChangeOpenPost}><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_zipcode.gif" alt="우편번호" /></a><br />
                                                    {isOpenPost  ? (
                                                        <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost } />
                                                    ) : null}
                                                    <input id="raddr1" name="odReceiverAddr" fw-filter="isFill" fw-label="수취자 주소1" fw-msg="" className="inputTypeText" placeholder="" size="40" type="text" value={addressDetail} readOnly required/> 
                                                    <span className="grid">기본주소</span><br />
                                                    <input id="raddr2" name="odReceiverAddr2" fw-filter="isFill" fw-label="수취자 주소2" fw-msg="" className="inputTypeText" placeholder="" size="40" type="text" required/> 
                                                    <span className="grid">나머지주소</span>
                                                    <span className="grid displaynone">(선택입력가능)</span>
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <th scope="row">일반전화 <span className=""><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></span></th>
                                                <td>
                                                    <select id="rphone1_1" name="odReceiverTel1_[]" fw-filter="isNumber&amp;isFill" fw-label="수취자 전화번호" fw-alone="N" fw-msg="">
                                                        <option value="02">02</option>
                                                        <option value="031">031</option>
                                                        <option value="032">032</option>
                                                        <option value="033">033</option>
                                                        <option value="041">041</option>
                                                        <option value="042">042</option>
                                                        <option value="043">043</option>
                                                        <option value="044">044</option>
                                                        <option value="051">051</option>
                                                        <option value="052">052</option>
                                                        <option value="053">053</option>
                                                        <option value="054">054</option>
                                                        <option value="055">055</option>
                                                        <option value="061">061</option>
                                                        <option value="062">062</option>
                                                        <option value="063">063</option>
                                                        <option value="064">064</option>
                                                        <option value="0502">0502</option>
                                                        <option value="0503">0503</option>
                                                        <option value="0504">0504</option>
                                                        <option value="0505">0505</option>
                                                        <option value="0506">0506</option>
                                                        <option value="0507">0507</option>
                                                        <option value="070">070</option>
                                                        <option value="010">010</option>
                                                        <option value="011">011</option>
                                                        <option value="016">016</option>
                                                        <option value="017">017</option>
                                                        <option value="018">018</option>
                                                        <option value="019">019</option>
                                                        <option value="0508">0508</option>
                                                    </select>-
                                                    <input id="rphone1_2" name="odReceiverTel1_[]" maxLength="4" fw-filter="isNumber&amp;isFill" fw-label="수취자 전화번호" fw-alone="N" fw-msg="" size="4" type="text" required/>-
                                                    <input id="rphone1_3" name="odReceiverTel1_[]" maxLength="4" fw-filter="isNumber&amp;isFill" fw-label="수취자 전화번호" fw-alone="N" fw-msg="" size="4" type="text" required/>
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <th scope="row">휴대전화 <span className=""><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></span></th>
                                                <td>
                                                    <select id="rphone2_1" name="odReceiverMobile1_[]" fw-filter="isNumber&amp;isFill" fw-label="수취자 핸드폰번호" fw-alone="N" fw-msg="">
                                                        <option value="010">010</option>
                                                        <option value="011">011</option>
                                                        <option value="016">016</option>
                                                        <option value="017">017</option>
                                                        <option value="018">018</option>
                                                        <option value="019">019</option>
                                                    </select>-
                                                    <input id="rphone2_2" name="odReceiverMobile1_[]" maxLength="4" fw-filter="isNumber&amp;isFill" fw-label="수취자 핸드폰번호" fw-alone="N" fw-msg="" size="4" type="text" required/>-
                                                    <input id="rphone2_3" name="odReceiverMobile1_[]" maxLength="4" fw-filter="isNumber&amp;isFill" fw-label="수취자 핸드폰번호" fw-alone="N" fw-msg="" size="4" type="text" required/>
                                                </td>
                                            </tr>
                                            <tr className="displaynone">
                                                <th scope="row">안심번호</th>
                                                <td>
                                                    <p>- 안심번호 서비스는 개인정보 보호를 위하여 휴대폰번호 등 실제 연락처 대신에 1회성 임시 번호를 제공하는 서비스입니다.</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        {/* <!-- 이메일 국내/해외 -->
                                        <!-- 국내 배송관련 정보 --> */}
                                        <tbody className="delivery ">
                                            <tr className="">
                                                <th scope="row">요청사항 <span className="displaynone"><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/ico_required.gif" alt="필수" /></span></th>
                                                <td>
                                                    <textarea id="omessage" name="odReceiveRemark" fw-filter="" fw-label="배송 메세지" fw-msg="" maxLength="255" cols="70" value=""></textarea>                        
                                                    <div className="message displaynone">
                                                        <label>
                                                            <input id="omessage_autosave0" name="omessage_autosave[]" fw-filter="" fw-label="배송 메세지 저장" fw-msg="" value="T" type="checkbox" readOnly/>
                                                            <label htmlFor="omessage_autosave0"></label> 자동저장
                                                        </label>
                                                        <ul>
                                                            <li>배송메시지란에는 배송시 참고할 사항이 있으면 적어주십시오.</li>
                                                            <li>게시글은 비밀글로 저장되며 비밀번호는 주문번호 뒷자리로 자동 저장됩니다.</li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!-- 기타 문의사항 --> */}
                            <div className="orderArea ">
                                <div className="title">
                                    <h3>기타 문의사항</h3>
                                </div>
                                <div className="boardWrite">
                                    <table border="1" summary="">
                                        <caption>기타 문의사항</caption>
                                        <tbody>
                                            <tr>
                                                <th scope="row">기타 문의사항</th>
                                                <td><textarea id="question" name="odRemark" fw-filter="" fw-label="기타문의사항" fw-msg="" maxLength="255" cols="70" style={{margin: '0px', width: '782px', height: '142px'}} value=""></textarea></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">비밀번호</th>
                                                <td><input id="question_passwd" name="odPassword" fw-filter="" fw-label="기타문의사항 비밀번호" fw-msg="" type="password" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <ul className="list">
                                    <li>기타 문의 사항은 <a href="/board/product/list.html?board_no=6" target="_blank"><strong>Q&amp;A게시판</strong></a> 에 자동 등록됩니다.</li>
                                    <li>운영자에 문의할 내용이나 요청할 내용이 있는 경우 기재하여 주세요.</li>
                                    <li>비밀번호는 작성하신 문의글을 게시판에서 내용 확인 할 때 사용됩니다.</li>
                                </ul>
                            </div>
                            {/* <!-- 결제 예정 금액 --> */}
                            <div className="title">
                                <h3>결제 예정 금액</h3>
                            </div>
                            <div className="totalArea">
                                <div className="summary">
                                    <table border="1" summary="">
                                        <caption>결제 예정 금액</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <span>총 주문 금액</span>
                                                    <a href="#none" className="more"></a>{/* onClick="EC_SHOP_FRONT_ORDERFORM_DISPLAY.onDiv('order_layer_detail', event);" */}
                                                </th>
                                                <th scope="col" className="">
                                                    <span>총 </span>
                                                    <span id="total_addsale_text" className="">할인</span>
                                                    <span id="plus_mark" className=""> + </span>
                                                    <span id="total_addpay_text" className="">부가결제</span>
                                                    <span> 금액</span>
                                                </th>
                                                <th scope="col">총 결제예정 금액</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="price">
                                                    <div className="box">
                                                        <strong id="total_order_price_view">{ common.getCommaStr(sumPrice) }원 </strong>
                                                        <span className="tail displaynone"><span id="total_order_price_ref_view" className="tail"></span></span>
                                                        <input type="hidden" name="odPrice" value={sumPrice} />
                                                    </div>
                                                </td>
                                                <td className="option ">
                                                    <div className="box">
                                                        <strong id="total_order_price_view">{ common.getCommaStr(sumDeliveryPrice - sumSalesPrice) }원 </strong>
                                                        <span className="tail displaynone"><span id="total_order_price_ref_view" className="tail"></span></span>
                                                        <input type="hidden" name="salesPrice" value={sumSalesPrice} />
                                                    </div>
                                                </td>
                                                <td className="total">
                                                    <div className="box">
                                                        <strong id="total_order_price_view">{ common.getCommaStr(total) }원 </strong>
                                                        <span className="tail displaynone"><span id="total_order_price_ref_view" className="tail"></span></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="detail">
                                    <div className="">
                                        <table border="1" summary="">
                                            <caption>할인 내역</caption>
                                            <tbody>
                                                <tr className="total">
                                                    <th scope="row">총 할인금액</th>
                                                    <td><strong>{ common.getCommaStr(sumSalesPrice) }</strong>원</td>
                                                </tr>
                                                {/* <!-- //참고 --> */}
                                                <tr className="">
                                                    <th scope="row">추가할인금액</th>
                                                    <td>
                                                        <span className="grid"><span id="total_benefit_price_view">0</span>원</span>
                                                        <a href="#none">{/* onClick="EC_SHOP_FRONT_ORDERFORM_DISPLAY.onDiv('order_layer_addsale', event);"> */}
                                                            <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_list.gif" alt="내역보기" />
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="">
                                        <table border="1" summary="" className="option">
                                            <caption>부가결제 내역</caption>
                                            <tbody>
                                                <tr className="total">
                                                    <th scope="row">총 부가결제금액</th>
                                                    <td><strong id="total_addpay_price_view">{ common.getCommaStr( sumDeliveryPrice) }</strong>원</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- 결제수단 --> */}
                            <div className="title">
                                <h3>결제수단</h3>
                                <span className="">
                                    <input type="checkbox" id="save_paymethod" name="save_paymethod" />
                                    <label htmlFor="save_paymethod">결제수단과 입력정보를 다음에도 사용</label>
                                </span>
                            </div>
                            <div className="payArea">
                                <div className="payment">
                                    <div className="method">
                                        <span className="ec-base-label">
                                            <input id="addr_paymethod0" fw-filter="isFill" fw-label="결제방식" fw-msg="" value="card" type="radio" checked="checked" readOnly/>
                                            <label htmlFor="addr_paymethod0">카드 결제</label>
                                        </span>
                                    </div>

                                    <div className="info">
                                    {/* <!-- 무통장입금 --> */}
                                        <table border="1" summary="" id="payment_input_cash" style={{display:'none'}}>
                                            <caption>무통장입금</caption>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">입금자명</th>
                                                    <td><input id="pname" fw-filter="" fw-label="무통장 입금자명" fw-msg="" className="inputTypeText" placeholder="" size="15" maxLength="20" type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">입금은행</th>
                                                    <td>
                                                        <select id="bankaccount" fw-filter="" fw-label="무통장 입금은행" fw-msg="">
                                                            <option value="-1">::: 선택해 주세요. :::</option>
                                                            <option value="bank_04:92453701011510:주식회사 퍼니매스:국민은행:www.kbstar.com">국민은행:92453701011510 주식회사 퍼니매스</option>
                                                        </select>
                                                        <p className="grid ">
                                                            <a href="#none" id="btn_bank_go">
                                                                <img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_bank.gif" alt="은행사이트 바로가기" />
                                                            </a>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* <!-- 실시간 계좌이체 --> */}
                                        <table border="1" summary="" id="payment_input_tcash" style={{display:'none'}}>
                                            <caption>실시간 계좌이체</caption>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">예금주명</th>
                                                    <td><input id="allat_account_nm" fw-filter="" fw-label="무통장 입금자명" fw-msg="" className="inputTypeText" placeholder="" size="26" maxLength="30" type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td>
                                                        <input type="checkbox" name="flagEscrowUse" id="flagEscrowUse0" value="T" readOnly/>
                                                        <label htmlFor="flagEscrowUse0"> 에스크로(구매안전)서비스를 적용합니다.</label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* <!-- 에스크로(가상계좌) --> */}
                                        <table border="1" summary="" id="payment_input_icash" style={{display:'none'}}>
                                            <caption>에스크로(가상계좌)</caption>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">에스크로</th>
                                                    <td>
                                                        <input id="flagEscrowIcashUse0" name="flagEscrowIcashUse" fw-filter="" fw-label="에스크로(구매안전)" fw-msg="" value="T" type="checkbox" readOnly/>
                                                        <label htmlFor="flagEscrowIcashUse0"></label><label htmlFor="flagEscrowIcashUse0">에스크로(구매안전)서비스를 적용합니다.</label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* <!-- 무통장입금, 카드결제, 휴대폰결제, 실시간계좌이체 --><div id="pg_paymethod_info" className="payHelp" style="display: block;"> */}
                                        <p id="pg_paymethod_info_shipfee" className="ec-base-help" style={{display: 'none'}}>최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.</p>
                                        <p id="pg_paymethod_info_pg" className="ec-base-help">소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.</p>
                                    </div>

                                    {/* <!-- 케이페이 도움말 --> */}
                                    <div id="kpay_info" className="payHelp" style={{display: 'none'}}>
                                        <p className="ec-base-help">휴대폰에 설치된 케이페이 앱에서 비밀번호 입력만으로 빠르고 안전하게 결제가 가능한 서비스 입니다.</p>
                                        <p className="ec-base-help">안드로이드의 경우 구글 플레이, 아이폰의 경우 앱 스토어에서 케이페이 앱을 설치 한 후,<br />
                                            최초 1회 카드정보를 등록하셔야 사용 가능합니다.</p>
                                    </div>

                                    {/* <!-- 페이나우 도움말 --> */}
                                    <div id="paynow_info" className="payHelp" style={{display: 'none'}}>
                                        <p className="ec-base-help">휴대폰에 설치된 페이나우 앱에서 비밀번호 입력만으로 빠르고 안전하게 결제가 가능한 서비스 입니다.</p>
                                        <p className="ec-base-help">안드로이드의 경우 구글 플레이, 아이폰의 경우 앱 스토어에서 페이나우 앱을 설치 한 후,<br />
                                            최초 1회 카드 및 계좌 정보를 등록하셔야 사용 가능합니다</p>
                                    </div>

                                    {/* <!-- 페이코 도움말 --> */}
                                    <div id="payco_info" className="payHelp" style={{display: 'none'}}>
                                        <p className="ec-base-help">페이코 결제 팝업창에서 비밀번호 입력만으로 빠르고 안전하게 결제가 가능한 서비스 입니다.</p>
                                        <p className="ec-base-help"><a href="http://www.payco.com" target="_blank">www.payco.com</a> 에 회원가입 후, 최초 1회 카드 및 계좌 정보를 등록하셔야 사용 가능합니다.</p>
                                    </div>

                                    {/* <!-- 카카오페이 도움말 --> */}
                                    <div id="kakaopay_info" className="payHelp" style={{display: 'none'}}>
                                        <p className="ec-base-help">휴대폰에 설치된 카카오톡 앱에서 비밀번호 입력만으로 빠르고 안전하게 결제가 가능한 서비스 입니다.</p>
                                        <p className="ec-base-help">안드로이드의 경우 구글 플레이, 아이폰의 경우 앱 스토어에서 카카오톡 앱을 설치 한 후,<br />
                                            최초 1회 카드 및 계좌 정보를 등록하셔야 사용 가능합니다.</p>
                                        <p className="ec-base-help">인터넷 익스플로러의 경우 8 이상에서만 결제 가능합니다.</p>
                                        <p className="ec-base-help">BC카드 중 신한, 하나, 국민카드는 결제가 불가능합니다.</p>
                                    </div>
                                </div>

                                {/* <!-- 증명서류 발급 --> */}
                                <div className="agree">
                                    <table border="1" summary="">
                                        <caption>증명서류 발급</caption>
                                        <tbody className="receipt">
                                            {/* <tr id="cashreceipt_display_area" className="" style={{display: 'none'}}>
                                                <th scope="row">현금영수증 신청</th>
                                                <td>
                                                    <div className="methods">
                                                        <input id="cashreceipt_regist0" name="cashreceipt_regist" fw-filter="" fw-label="현금영수증 신청 여부" fw-msg="" value="1" type="radio" readOnly/>
                                                        <label htmlFor="cashreceipt_regist0">현금영수증 신청</label>
                                                        <input id="cashreceipt_regist1" name="cashreceipt_regist" fw-filter="" fw-label="현금영수증 신청 여부" fw-msg="" value="99" type="radio" checked="checked" readOnly/>
                                                        <label htmlFor="cashreceipt_regist1">신청안함</label>                            
                                                    </div>
                                                    <div id="cashreceipt_form_area" className="boardWrite cash">
                                                        <table border="1" summary="">
                                                            <caption>현금영수증 발급 정보 입력</caption>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">구분</th>
                                                                    <td>
                                                                        <input id="cashreceipt_user_type2__0" name="cashreceipt_user_type2" fw-filter="" fw-label="현금영수증 신청자 종류-신청여부라디오버튼과 함께" fw-msg="" value="0" type="radio" readOnly />
                                                                        <label htmlFor="cashreceipt_user_type2__0">개인</label>
                                                                        <input id="cashreceipt_user_type2__1" name="cashreceipt_user_type2" fw-filter="" fw-label="현금영수증 신청자 종류-신청여부라디오버튼과 함께" fw-msg="" value="1" type="radio" readOnly />
                                                                        <label htmlFor="cashreceipt_user_type2__1">사업자</label>
                                                                    </td>
                                                                </tr>
                                                                <tr className="mobile" id="cashreceipt_mobile_display_area">
                                                                    <th scope="row">핸드폰 번호</th>
                                                                    <td>
                                                                        <select id="cashreceipt_user_mobile1" name="cashreceipt_user_mobile[]" fw-filter="" fw-label="현금영수증 개인-핸드폰 번호" fw-alone="N" fw-msg="">
                                                                            <option value="010">010</option>
                                                                            <option value="011">011</option>
                                                                            <option value="016">016</option>
                                                                            <option value="017">017</option>
                                                                            <option value="018">018</option>
                                                                            <option value="019">019</option>
                                                                        </select>-
                                                                        <input id="cashreceipt_user_mobile2" name="cashreceipt_user_mobile[]" maxLength="4" fw-filter="" fw-label="현금영수증 개인-핸드폰 번호" fw-alone="N" fw-msg="" type="text" />-
                                                                        <input id="cashreceipt_user_mobile3" name="cashreceipt_user_mobile[]" maxLength="4" fw-filter="" fw-label="현금영수증 개인-핸드폰 번호" fw-alone="N" fw-msg="" type="text" />
                                                                    </td>
                                                                </tr>
                                                                <tr className="regno" id="cashreceipt_regno_display_area">
                                                                    <th scope="row">사업자 번호</th>
                                                                    <td><input id="cashreceipt_reg_no" name="cashreceipt_reg_no" fw-filter="" fw-label="현금영수증 사업자 번호" fw-msg="" placeholder="사업자번호" type="text" /></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr> */}
                                            {/* <tr id="tax_request_display_area" className="" style={{display: 'none'}}>
                                                <th scope="row">세금계산서 신청</th>
                                                <td>
                                                    <div className="methods">
                                                        <input id="tax_request_regist0" name="tax_request_regist" fw-filter="" fw-label="세금계산서 신청 여부" fw-msg="" value="1" type="radio" readOnly />
                                                        <label htmlFor="tax_request_regist0">세금계산서 신청</label>
                                                        <input id="tax_request_regist1" name="tax_request_regist" fw-filter="" fw-label="세금계산서 신청 여부" fw-msg="" value="99" type="radio" checked="checked" readOnly />
                                                        <label htmlFor="tax_request_regist1">신청안함</label>                            
                                                    </div>
                                                    <div id="tax_request_form_area" className="tax">
                                                        <ul className="info">
                                                            <li>- 세금 계산서 발행 신청을 위해 아래 모든 입력사항을 빠짐없이 입력하십시오.</li>
                                                            <li>- 신청양식 작성 후 사업자 등록증 사본을 팩스(02.1234.5678)로 보내주십시오.</li>
                                                            <li>- 신청하신 세금계산서는 <b>배송완료</b> 후 월말로 발행처리됩니다. </li>
                                                        </ul>
                                                        <strong className="title">신청자 정보</strong>
                                                        <div className="boardWrite">
                                                            <table border="1" summary="">
                                                                <caption>세금계산서 신청자 정보 입력</caption>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">신청자 이름</th>
                                                                        <td><input id="tax_request_name" name="tax_request_name" fw-filter="" fw-label="세금계산서 신청의 신청자 이름" fw-msg="" className="inputTypeText" placeholder="" size="15" value="오세현" type="text" readOnly /></td>
                                                                    </tr>
                                                                    <tr className="mobile">
                                                                        <th scope="row">신청자 전화번호</th>
                                                                        <td>
                                                                            <select id="tax_request_phone1" name="tax_request_phone[]" fw-filter="" fw-label="세금계산서 신청의 신청자 전화번호" fw-alone="N" fw-msg="">
                                                                                <option value="02">02</option>
                                                                                <option value="031">031</option>
                                                                                <option value="032">032</option>
                                                                                <option value="033">033</option>
                                                                                <option value="041">041</option>
                                                                                <option value="042">042</option>
                                                                                <option value="043">043</option>
                                                                                <option value="044">044</option>
                                                                                <option value="051">051</option>
                                                                                <option value="052">052</option>
                                                                                <option value="053">053</option>
                                                                                <option value="054">054</option>
                                                                                <option value="055">055</option>
                                                                                <option value="061">061</option>
                                                                                <option value="062">062</option>
                                                                                <option value="063">063</option>
                                                                                <option value="064">064</option>
                                                                                <option value="0502">0502</option>
                                                                                <option value="0503">0503</option>
                                                                                <option value="0504">0504</option>
                                                                                <option value="0505">0505</option>
                                                                                <option value="0506">0506</option>
                                                                                <option value="0507">0507</option>
                                                                                <option value="070">070</option>
                                                                                <option value="010">010</option>
                                                                                <option value="011">011</option>
                                                                                <option value="016">016</option>
                                                                                <option value="017">017</option>
                                                                                <option value="018">018</option>
                                                                                <option value="019">019</option>
                                                                                <option value="0508">0508</option>
                                                                            </select>-
                                                                            <input id="tax_request_phone2" name="tax_request_phone[]" maxLength="4" fw-filter="" fw-label="세금계산서 신청의 신청자 전화번호" fw-alone="N" fw-msg="" size="4" type="text" />-
                                                                            <input id="tax_request_phone3" name="tax_request_phone[]" maxLength="4" fw-filter="" fw-label="세금계산서 신청의 신청자 전화번호" fw-alone="N" fw-msg="" size="4" type="text" />                                                
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="regno">
                                                                        <th scope="row">E-Mail</th>
                                                                        <td>
                                                                            <input id="tax_request_email1" name="tax_request_email1" fw-filter="" fw-label="세금계산서 신청의 E-Mail" fw-alone="N" fw-msg="" className="mailId" value="osh5656" type="text" readOnly/>@
                                                                            <input id="tax_request_email2" name="tax_request_email2" fw-filter="" fw-label="세금계산서 신청의 E-Mail" fw-alone="N" fw-msg="" className="mailAddress" readOnly="readonly" value="naver.com" type="text" readOnly/>
                                                                            <select id="tax_request_email3" fw-filter="" fw-label="세금계산서 신청의 E-Mail" fw-alone="N" fw-msg="" value={'naver.com'}>
                                                                                <option value="">- 이메일 선택 -</option>
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
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <strong className="title">사업자 정보</strong>
                                                        <div className="boardWrite">
                                                            <table border="1" summary="">
                                                                <caption>세금계산서 사업자 정보 입력</caption>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">사업자 구분</th>
                                                                        <td>
                                                                            <div className="businessType">
                                                                                <input id="tax_request_company_type0" name="tax_request_company_type" fw-filter="" fw-label="세금계산서 사업자 정보: 사업자 구분" fw-msg="" value="A" type="radio" checked="checked" readOnly/>
                                                                                <label htmlFor="tax_request_company_type0">개인</label>
                                                                                <input id="tax_request_company_type1" name="tax_request_company_type" fw-filter="" fw-label="세금계산서 사업자 정보: 사업자 구분" fw-msg="" value="B" type="radio" readOnly/>
                                                                                <label htmlFor="tax_request_company_type1">법인</label>                                                    
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">사업자등록번호</th>
                                                                        <td><input id="tax_request_company_regno" name="tax_request_company_regno" fw-filter="" fw-label="세금계산서 신청의 사업자등록번호" fw-msg="" type="text" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">상호(법인명)</th>
                                                                        <td><input id="tax_request_company_name" name="tax_request_company_name" fw-filter="" fw-label="세금계산서 신청의 상호(법인명)" fw-msg="" className="inputTypeText" placeholder="" maxLength="200" size="15" type="text" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">대표자명</th>
                                                                        <td><input id="tax_request_president_name" name="tax_request_president_name" fw-filter="" fw-label="세금계산서 신청의 대표자명" fw-msg="" className="inputTypeText" placeholder="" size="15" value="오세현" type="text" readOnly/></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">사업장 주소</th>
                                                                        <td>
                                                                            <input id="tax_request_zipcode" name="tax_request_zipcode" fw-filter="" fw-label="세금계산서 신청의 우편번호" fw-msg="" className="inputTypeText" placeholder="" size="6" maxLength="6" readOnly="1" value="21933" type="text" readOnly/>                                                    
                                                                            <a href="#none" id="btn_search_tzipcode"><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_address_search.gif" alt="주소검색" /></a><br />
                                                                            <input id="tax_request_address1" name="tax_request_address1" fw-filter="" fw-label="세금계산서 신청의 사업장 주소" fw-msg="" className="inputTypeText" placeholder="" size="40" readOnly="1" value="인천광역시 연수구 새말로 111 (연수동)" type="text" readOnly/><br />
                                                                            <input id="tax_request_address2" name="tax_request_address2" fw-filter="" fw-label="세금계산서 신청의 사업장 주소" fw-msg="" className="inputTypeText" placeholder="" size="40" value="영남아파트 102동 606호" type="text" readOnly/>                                                
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">업태</th>
                                                                        <td><input id="tax_request_company_condition" name="tax_request_company_condition" fw-filter="" fw-label="세금계산서 신청의 업태" fw-msg="" className="inputTypeText" placeholder="" maxLength="50" size="15" type="text" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">종목</th>
                                                                        <td><input id="tax_request_company_line" name="tax_request_company_line" fw-filter="" fw-label="세금계산서 신청의 종목" fw-msg="" className="inputTypeText" placeholder="" maxLength="50" size="15" type="text" /></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                        {/* <!-- 청약철회방침 --> */}
                                        <tbody className="displaynone">
                                            <tr>
                                                <th scope="row">청약철회방침</th>
                                                <td>
                                                    <div className="textArea">
                                                        <textarea id="subscription_terms" fw-filter="" fw-label="청약철회방침" fw-msg="" maxLength="250" cols="70" readOnly="1" value="">
                                                            ①“”과 재화등의 구매에 관한 계약을 체결한 이용자는 수신확인의 통지를 받은 날부터 7일 이내에는 청약의 철회를 할 수 있습니다.

                                                            ② 이용자는 재화등을 배송받은 경우 다음 각호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
                                                            1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다)
                                                            2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우
                                                            3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우
                                                            4. 같은 성능을 지닌 재화등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우

                                                            ③ 제2항제2호 내지 제4호의 경우에 “몰”이 사전에 청약철회 등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의 청약철회등이 제한되지 않습니다.

                                                            ④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화등을 공급받은 날부터 3월이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.

                                                            제16조(청약철회 등의 효과)

                                                            ① “”은 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화등의 대금을 환급합니다. 이 경우 “몰”이 이용자에게 재화등의 환급을 지연한 때에는 그 지연기간에 대하여 공정거래위원회가 정하여 고시하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.

                                                            ② “”은 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화등의 대금을 지급한 때에는 지체없이 당해 결제수단을 제공한 사업자로 하여금 재화등의 대금의 청구를 정지 또는 취소하도록 요청합니다.

                                                            ③ 청약철회등의 경우 공급받은 재화등의 반환에 필요한 비용은 이용자가 부담합니다. “몰”은 이용자에게 청약철회등을 이유로 위약금 또는 손해배상을 청구하지 않습니다. 다만 재화등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회등을 하는 경우 재화등의 반환에 필요한 비용은 “”이 부담합니다.

                                                            ④ 이용자가 재화등을 제공받을때 발송비를 부담한 경우에 “몰”은 청약 철회시 그 비용을 누가 부담하는지를 이용자가 알기 쉽도록 명확하게 표시합니다.
                                                        </textarea>                                
                                                        <a href="#none">{/* onClick="winPop('/order/agreement/subscription.html')" */}<img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_more.gif" alt="전체보기" /></a>
                                                    </div>
                                                    <p>
                                                        <input id="subscription_agreement_chk0" name="subscription_agreement_chk" fw-filter="" fw-label="" fw-msg="" value="T" type="checkbox" disabled="" readOnly/>
                                                        <label htmlFor="subscription_agreement_chk0"></label><label htmlFor="subscription_agreement_chk0"><strong>동의함</strong></label>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        {/* <!-- 전자보증보험--> */}
                                        <tbody className="guarantee displaynone" style={{display: 'none'}}>
                                            <tr>
                                                <th scope="row">전자보증보험</th>
                                                <td>
                                                    <div>
                                                        <p>
                                                            전자보증보험 발급 여부 : 
                                                            <input id="eguarantee_flag0" fw-filter="" fw-label="전자보증보험 발급여부" fw-msg="" value="T" type="radio" disabled="" readOnly/>
                                                            <label htmlFor="eguarantee_flag0">발급</label>
                                                            <input id="eguarantee_flag1" fw-filter="" fw-label="전자보증보험 발급여부" fw-msg="" value="F" type="radio" checked="checked" disabled="" readOnly/>
                                                            <label htmlFor="eguarantee_flag1">미발급</label>
                                                        </p>
                                                        <p>전자보증보험 안내(100% 매매보호 안전결제) <a href="/common/usafe_notice.php" target="_blank">[자세히보기]</a>{/* onClick="window.open(this.href,'new','height=500 width=550 toolbar=no location=no directory=no status=no resizable=no'); return false;" */}</p>
                                                        <p>물품대금결제시 구매자의 피해보호를 위해 '(주)서울보증보험'의 보증보험증권이 발급됩니다.</p>
                                                        <p>증권이 발급되는 것의 의미는, 물품대금 결제시에 소비자에게 서울보증보험의 쇼핑몰보증보험 계약체결서를 인터넷상으로 자동 발급하여, 피해발생시 쇼핑몰보증보험으로써 완벽하게 보호받을 수 있습니다.</p>
                                                        <p>또한, 입력하신 개인정보는 증권발급을 위해 필요한 정보이며 다른 용도로 사용되지 않습니다. </p>
                                                        <p>전자보증보험 발생시 별도의 수수료가 부과되지 않습니다.</p>
                                                    </div>
                                                    <div id="eguarantee_personal">
                                                        <p>
                                                            생년월일 : 
                                                            <input id="eguarantee_year" fw-filter="" fw-label="전자보증보험 생년월일1" fw-msg="" className="inputTypeText" placeholder="" size="4" maxLength="4" type="text" disabled=""/> 년 
                                                            <input id="eguarantee_month" fw-filter="" fw-label="전자보증보험 생년월일2" fw-msg="" className="inputTypeText" placeholder="" size="2" maxLength="2" type="text" disabled="" /> 월 
                                                            <input id="eguarantee_day" fw-filter="" fw-label="전자보증보험 생년월일3" fw-msg="" className="inputTypeText" placeholder="" size="2" maxLength="2" type="text" disabled="" /> 일
                                                        </p>
                                                        <p>
                                                            성별 : <input id="eguarantee_user_gender0" fw-filter="" fw-label="전자보증보험 성별" fw-msg="" value="1" type="radio" disabled="" readOnly/>
                                                            <label htmlFor="eguarantee_user_gender0">남자</label>
                                                            <input id="eguarantee_user_gender1" fw-filter="" fw-label="전자보증보험 성별" fw-msg="" value="2" type="radio" disabled="" readOnly/>
                                                            <label htmlFor="eguarantee_user_gender1">여자</label>
                                                        </p>
                                                        <p>
                                                            개인정보 이용동의 : 
                                                            <input id="eguarantee_personal_agreement0" fw-filter="" fw-label="전자보증보험 개인정보 이용동의" fw-msg="" value="T" type="radio" disabled="" readOnly/>
                                                            <label htmlFor="eguarantee_personal_agreement0">동의함</label>
                                                            <input id="eguarantee_personal_agreement1" fw-filter="" fw-label="전자보증보험 개인정보 이용동의" fw-msg="" value="F" type="radio" checked="checked" disabled="" readOnly/>
                                                            <label htmlFor="eguarantee_personal_agreement1">동의안함</label>
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        {/* <!-- Daum 비회원 구매 동의 --> */}
                                        <tbody className="displaynone">
                                            <tr>
                                                <th scope="row">Daum 비회원 구매<br />쇼핑정보 제공동의</th>
                                                <td>
                                                    <div className="textArea">
                                                        <a href="#none" onClick=""><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_more.gif" alt="전체보기" /></a>
                                                    </div>
                                                    <p><label htmlFor="daum_agreement_chk0"><strong>동의함</strong></label></p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* <!-- 최종결제금액 --> */}
                            <div className="total">
                                <h4>
                                    <strong id="current_pay_name">카드 결제</strong> 
                                    <span>&nbsp;&nbsp;최종결제 금액</span>
                                </h4>
                                <p className="price">
                                    <span></span>
                                    <span className="inputSpan">{ common.getCommaStr(total) }원</span>
                                </p>
                                <p className="paymentAgree" id="chk_purchase_agreement" style={{display: 'none'}}>
                                    <input id="chk_purchase_agreement0" name="chk_purchase_agreement" fw-filter="" fw-label="구매진행 동의" fw-msg="" value="T" type="checkbox" style={{display: 'none'}} readOnly/>
                                    <label htmlFor="chk_purchase_agreement0">결제정보를 확인하였으며, 구매진행에 동의합니다.</label>
                                </p>
                                <div className="button"><input type="submit" value="결제하기" /></div>
                                <div className="mileage {$total_save_mileage_display|display">
                                    <p><strong>총 적립예정금액</strong><span id="mAllMileageSum" style={{display: 'block'}}>{ common.getCommaStr(total * 0.01) }원</span></p>
                                    <ul>
                                        <li>
                                            <strong>상품별 적립금</strong><span id="mProductMileage">{ common.getCommaStr(total * 0.01) }원</span>
                                        </li>
                                        <li>
                                            <strong>회원 적립금</strong><span id="mMemberMileage">0원</span>
                                        </li>
                                        <li>
                                            <strong>쿠폰 적립금</strong><span id="mCouponMileage">0원</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 무이자 할부 이용안내 --> */}
                        <div className="ec-base-help">
                            <h3>무이자 할부 이용안내</h3>
                            <div className="inner">
                                <ul>
                                    <li>무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에 구매할 경우 전체 주문 상품 금액에 대해 무이자할부가 적용되지 않습니다.</li>
                                    <li>무이자할부를 원하시는 경우 장바구니에서 무이자할부 상품만 선택하여 주문하여 주시기 바랍니다.</li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- 이용안내 --> */}
                        <div className="ec-base-help">
                            <h3>이용안내</h3>
                            <div className="inner">
                                <h4>WindowXP 서비스팩2를 설치하신후 결제가 정상적인 단계로 처리되지 않는경우, 아래의 절차에 따라 해결하시기 바랍니다.</h4>
                                <ol>
                                    <li className="item1"><a href="" onClick="window.open('https://service-api.echosting.cafe24.com/shop/notice_XP_ActiveX.html','','width=795,height=500,scrollbars=yes',resizable=1);">안심클릭 결제모듈이 설치되지 않은 경우 ActiveX 수동설치</a></li>
                                    <li className="item2"><a href="http://www.microsoft.com/korea/windowsxp/sp2/default.asp" target="_blank">Service Pack 2에 대한 Microsoft사의 상세안내 </a></li>
                                    <li className="item3"></li>
                                </ol>
                                {/* <!-- 크로스 브라우징 지원 --> */}
                                <div className="">
                                    <h4>아래의 쇼핑몰일 경우에는 모든 브라우저 사용이 가능합니다.</h4>
                                    <ol>
                                        <li className="item1"><strong>KG이니시스, KCP, LG U+를 사용하는 쇼핑몰일 경우</strong></li>
                                        <li className="item2">결제가능브라우저 : 크롬,파이어폭스,사파리,오페라 브라우저에서 결제 가능<br />(단, window os 사용자에 한하며 리눅스/mac os 사용자는 사용불가)</li>
                                        <li className="item3">최초 결제 시도시에는 플러그인을 추가 설치 후 반드시 브라우저 종료 후 재시작해야만 결제가 가능합니다.<br />(무통장, 휴대폰결제 포함)</li>
                                    </ol>
                                </div>
                                <h4>세금계산서 발행 안내</h4>
                                <ol>
                                    <li className="item1">부가가치세법 제 54조에 의거하여 세금계산서는 배송완료일로부터 다음달 10일까지만 요청하실 수 있습니다.</li>
                                    <li className="item2">세금계산서는 사업자만 신청하실 수 있습니다.</li>
                                    <li className="item3">배송이 완료된 주문에 한하여 세금계산서 발행신청이 가능합니다.</li>
                                    <li className="item4">[세금계산서 신청]버튼을 눌러 세금계산서 신청양식을 작성한 후 팩스로 사업자등록증사본을 보내셔야 세금계산서 발생이 가능합니다.</li>
                                    <li className="item5">[세금계산서 인쇄]버튼을 누르면 발행된 세금계산서를 인쇄하실 수 있습니다.</li>
                                </ol>
                                <h4>부가가치세법 변경에 따른 신용카드매출전표 및 세금계산서 변경안내</h4>
                                <ol>
                                    <li className="item1">변경된 부가가치세법에 의거, 2004.7.1 이후 신용카드로 결제하신 주문에 대해서는 세금계산서 발행이 불가하며</li>
                                    <li className="item2">신용카드매출전표로 부가가치세 신고를 하셔야 합니다.(부가가치세법 시행령 57조)</li>
                                    <li className="item3">상기 부가가치세법 변경내용에 따라 신용카드 이외의 결제건에 대해서만 세금계산서 발행이 가능함을 양지하여 주시기 바랍니다.</li>
                                </ol>
                                <h4>현금영수증 이용안내</h4>
                                <ol>
                                    <li className="item1">현금영수증은 1원 이상의 현금성거래(무통장입금, 실시간계좌이체, 에스크로, 예치금)에 대해 발행이 됩니다.</li>
                                    <li className="item2">현금영수증 발행 금액에는 배송비는 포함되고, 적립금사용액은 포함되지 않습니다.</li>
                                    <li className="item3">발행신청 기간제한 현금영수증은 입금확인일로 부터 48시간안에 발행을 해야 합니다.</li>
                                    <li className="item4">현금영수증 발행 취소의 경우는 시간 제한이 없습니다. (국세청의 정책에 따라 변경 될 수 있습니다.)</li>
                                    <li className="item5">현금영수증이나 세금계산서 중 하나만 발행 가능 합니다.</li>
                                </ol>
                            </div>
                        </div>
                        {/* <!-- 결제진행바 --> */}
                        <iframe id="h_payment" name="h_payment" width="0" height="0" frameBorder="0" src=""></iframe>
                        {/* <!-- //결제진행바 --> */}
                        {/* </div> */}
                    </form>
                {/* <!--구매안전 안내노출--> */}
                    <br />
                    <center>
                        <a href="https://iniweb.inicis.com/popup/common/popup_escrow_notice.jsp?mid=ECAfurn12a" target="_blank">
                            <img src="https://m-img.cafe24.com/images/bi/escrow/bnr_escrow_660x94.jpg" style={{width:'660px', height:'94px'}} border="0" />
                        </a>
                    </center>
                </div>
            </div>
        </div>

    );
}

export default AddOrderComponent;

