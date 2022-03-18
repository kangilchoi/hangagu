import React, { Component, useState, useEffect } from 'react';
import CartService from 'service/CartService';
import InterestProductService from 'service/InterestProductService';
import "css/optimizer.css";
import "css/common.css";
import "css/datepicker.css";
import "css/myPage/shoppingCart.css";
import qs from "qs";
import * as common from "js/common.js";
import * as Auth from "component/Auth.jsx"


function CartComponent({location}) {
    // 장바구니 목록
    const [cartList, setCartList] = useState([]);
    const [cartLength, setCartLength] = useState(0);
    const [totalPmPrice, setTotalPmPrice] = useState(0);
    const [totalDeliveryPrice, setTotalDeliveryPrice] = useState(0);
    const [totalSalesPrice, setTotalSalesPrice] = useState(0);

    const [memKey, setMemKey] = useState('');

  
    const query = qs.parse(location.search, {
        ignoreQueryPrefix:true,
    });


    let sumPmPrice = 0;
    let sumDeliveryPrice = 0;
    let sumSalesPrice = 0;

    
    useEffect(() => {
        
        const fetchCart = async() => {
            try {
                let memKey = await(Auth.getLoggedInMemKey());

                setMemKey(memKey);

                CartService.getCarts(memKey).then(res => {
                    
                    for(var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].pmColor = res.data.data[i].pmColor.split(",");
                    }

                    for(var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].pmQuantity == 0? res.data.data[i].pmQuantity = 1:res.data.data[i].pmQuantity = res.data.data[i].pmQuantity;
                        sumPmPrice += Number(res.data.data[i].pmPrice) * Number(res.data.data[i].pmQuantity);
                        sumDeliveryPrice += Number(res.data.data[i].pmDeliveryPrice);
                        sumSalesPrice += (Number(res.data.data[i].pmPrice) * Number(res.data.data[i].pmSalesRate) * 0.01) * Number(res.data.data[i].pmQuantity);
                        
                    }

                    setTotalPmPrice(sumPmPrice);
                    setTotalDeliveryPrice(sumDeliveryPrice);
                    setTotalSalesPrice(sumSalesPrice);

                    setCartLength(res.data.data.length)
                    setCartList(res.data.data);


                }).catch(err => console.log(err))
            } catch(e) {
                console.log(e);
            }
        };

        

        fetchCart();
        
    }, []);

    
    const handlePmColor = (obj) => {
        obj.target.previousSibling.previousSibling.innerHTML = "[옵션: " + obj.target.selectedOptions[0].value + "]";
        obj.target.nextSibling.value = obj.target.selectedOptions[0].value;
    }

    const toAddOrder = (param) => {
        if(param == null && document.querySelectorAll('input[name="cartKeyRaio"]:checked').length == 0) {
            alert("주문할 상품을 선택해주세요.");
        } else {
            let cartKey = "";

            if(param != null) {
                cartKey = param;
            } else {
                cartKey = document.querySelector('input[name="cartKeyRaio"]:checked').value;
            }
            
            let form = document.querySelector("#updateForm");
            
            while (form.hasChildNodes()) { 
                form.removeChild( form.firstChild ); 
            }

            for(let i = 0; i < document.querySelector("#cart"+cartKey).querySelectorAll("input").length; i++) {
                form.appendChild(document.querySelector("#cart"+cartKey).querySelectorAll("input")[i].cloneNode())
            }

            var ondeleteYn=document.createElement('input')
            ondeleteYn.setAttribute('name', 'deleteYn');
            ondeleteYn.setAttribute('value', 'N');
            
            form.appendChild(ondeleteYn);

            let formData = new FormData(form);

            CartService.updateCart(formData).then(res => {
                if(res.data.code == '1') {
                    window.location.href="/order/addView?cartKey=" + res.data.data.cartKey;
                } else {
                    alert("주문하기 페이지 로딩이 실패하였습니다.");
                }
            }).catch(err => console.log(err))
        }
    }

    const toAddWishList = (param) => {
        if(window.confirm("해당 상품을 관심상품으로 등록하시겠습니까?")) {
            let form = document.querySelector("#updateForm");
            
            while (form.hasChildNodes()) { 
                form.removeChild( form.firstChild ); 
            }

            for(let i = 0; i < document.querySelector("#cart"+param).querySelectorAll("input").length; i++) {
                form.appendChild(document.querySelector("#cart"+param).querySelectorAll("input")[i].cloneNode())
            }

            let formData = new FormData(form);

            InterestProductService.createInterestProduct(formData).then(res => {
                if(res.data.code == '1') {
                    alert("관심상품에 등록되었습니다.");
                } else {
                    alert("관심상품 등록에 실패하였습니다.");
                }

                window.location.reload();
            }).catch(err => console.log(err))
        }
    }

    const deleteCart = (param) => {
        if(window.confirm("장바구니에서 삭제하시겠습니까?")) {
            let form = document.querySelector("#updateForm");
            
            while (form.hasChildNodes()) { 
                form.removeChild( form.firstChild ); 
            }

            for(let i = 0; i < document.querySelector("#cart"+param).querySelectorAll("input").length; i++) {
                form.appendChild(document.querySelector("#cart"+param).querySelectorAll("input")[i].cloneNode())
            }

            var ondeleteYn=document.createElement('input')
            ondeleteYn.setAttribute('name', 'deleteYn');
            ondeleteYn.setAttribute('value', 'Y');
            
            form.appendChild(ondeleteYn);

            let formData = new FormData(form);

            CartService.updateCart(formData).then(res => {
                if(res.data.code == '1') {
                    alert("삭제되었습니다.");
                    window.location.reload();
                } else {
                    alert("삭제가 실패되었습니다.");
                }
            }).catch(err => console.log(err))
        }
    }

    const addQuantityShortcut = (id) => {
        document.querySelector("#" + id).outerHTML = '<input id='+ id +' name="pmQuantity" size="2" value=' + (Number(document.querySelector("#" + id).value) + 1) +' type="text" />'
        
        let idx = (id).split('_').reverse()[0];
        document.querySelector("#total_" + idx).innerHTML = common.getCommaStr(Number(document.querySelector("#price_" + idx).value) * Number(document.querySelector("#" + id).value) + Number(document.querySelector("#deliveryPrice_" + idx).value))+"원";
        document.querySelector("#newtotal_" + idx).value = Number(document.querySelector("#originPrice_" + idx).value) * Number(document.querySelector("#" + id).value);
        document.querySelector("#newsales_" + idx).value = Number(document.querySelector("#originSales_" + idx).value) * Number(document.querySelector("#" + id).value);
        modfooterTotal();
    }

    const outQuantityShortcut = (id) => {
        if(document.querySelector("#" + id).value > 1) {
            document.querySelector("#" + id).outerHTML = '<input id='+ id +' name="pmQuantity" size="2" value=' + (Number(document.querySelector("#" + id).value) - 1) +' type="text" />'
            
            let idx = (id).split('_').reverse()[0];
            document.querySelector("#total_" + idx).innerHTML = common.getCommaStr(Number(document.querySelector("#price_" + idx).value) * Number(document.querySelector("#" + id).value) + Number(document.querySelector("#deliveryPrice_" + idx).value))+"원";
            document.querySelector("#newtotal_" + idx).value = Number(document.querySelector("#originPrice_" + idx).value) * Number(document.querySelector("#" + id).value);
            document.querySelector("#newsales_" + idx).value = Number(document.querySelector("#originSales_" + idx).value) * Number(document.querySelector("#" + id).value);
        
            modfooterTotal();
        }
    }

    const modfooterTotal = () => {
        let price = document.querySelectorAll("._price");
        let sales = document.querySelectorAll("._sales");
        let sum = 0;
        let salesSum = 0;

        for (let i = 0; i < price.length; ++i) {
            sum += Number(price[i].value)
        }

        for (let i = 0; i < sales.length; ++i) {
            salesSum += Number(sales[i].value)
        }

        // setTotalPmPrice(sum);
        // setTotalSalesPrice(salesSum);

        document.querySelector("#footprice").innerHTML = common.getCommaStr(sum);
        document.querySelector("#footsales").innerHTML = common.getCommaStr(salesSum);
        
        document.querySelector("#foottotal").innerHTML = "<span>"+common.getCommaStr(sum + totalDeliveryPrice - salesSum)+"원</span>";
        
    }

    return (
        <div id="wrap">
            <div id="container">
                <div id="contents">
                    {/* <!-- title --> */}
                    <div className="titleArea">
                        <h2>SHOPPING CART</h2>
                    </div>

                    {/* <!-- 장바구니 모듈 --> */}
                    <div className="xans-element- xans-order xans-order-basketpackage ">
                        {/* <!-- 탭 --> */}
                        <div className="xans-element- xans-order xans-order-tabinfo ec-base-tab typeLight ">
                            <ul className="menu">
                                <li className="selected "><a href="/order/basket.html">국내배송상품 ({cartLength})</a></li>
                                {/* <!-- <li className=" "><a href="/order/basket.html?delvtype=B">해외배송상품 (0)</a></li> --> */}
                            </ul>
                            <p className="right small_txt">장바구니에 담긴 상품은 30일 동안 보관됩니다.</p>
                        </div>
                        
                        {/* <!-- 장바구니 상품 있을경우 --> */}
                        <div className="orderListArea">
                            {/* <div className="xans-element- xans-order xans-order-normtitle title "><h3>일반상품 (1)</h3></div> */}
		
                            {/* <!-- 일반상품 (기본배송) --> */}
                            <table border="1" summary="" className="xans-element- xans-order xans-order-normnormal boardList xans-record-">
                                <colgroup>
                                    <col style={{width:27+'px'}}></col>
                                    <col style={{width:92+'px'}}></col>
                                    <col style={{width:200+'px'}}></col>
                                    <col style={{width:'auto'}}></col>
                                    <col style={{width:'auto'}}></col>
                                    <col style={{width:'auto'}}></col>
                                    <col style={{width:'auto'}}></col>
                                    <col style={{width:110+'px'}}></col>
                                </colgroup>
                                <thead className="shoppingcart_thead">
                                    <tr>
                                        <th scope="col">선택</th>
                                        {/* <input type="checkbox" onClick="Basket.setCheckBasketList('basket_product_normal_type_normal', this);" /> */}
                                        <th scope="col">이미지</th>
                                        <th scope="col">상품정보</th>
                                        <th scope="col">판매가</th>
                                        <th scope="col">수량</th>
                                        <th scope="col">배송비</th>
                                        <th scope="col">합계</th>
                                        <th scope="col">선택</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td colSpan="8">
                                            <strong className="type">[기본배송]</strong>
                                                상품구매금액 <strong id="footprice">{common.getCommaStr(totalPmPrice)}
                                            </strong>
                                            <span className="displaynone">
                                            </span> + 배송비 {common.getCommaStr(totalDeliveryPrice)}
                                            <span className=""> - 상품할인금액 <label id="footsales">{common.getCommaStr(totalSalesPrice)}</label> </span> = 합계 : <strong className="total" id="foottotal"><span>{common.getCommaStr(totalPmPrice + totalDeliveryPrice - totalSalesPrice)}</span>원</strong> <span className="displaynone"> </span>
                                        </td>
                                    </tr>
                                </tfoot>
                                {/* <!-- 상품 목록 --> */}
                                <tbody className="xans-element- xans-order xans-order-list">
                                    {
                                        cartList.length != 0 ? cartList.map((item, index) => {
                                            return (
                                            <tr className="xans-record-" id={"cart" + item.cartKey}>
                                                {/* <!-- col 1 --> */}
                                                <td className="table_col1">
                                                    <input type="radio" id="cartKey" name="cartKeyRaio" value={item.cartKey}/>
                                                    <input type="hidden" name="cartKey" value={item.cartKey}/>
                                                    <input type="hidden" name="pmKey" value={item.pmKey}/>
                                                    <input type="hidden" name="memKey" value={memKey}/>
                                                </td>
                                                {/* <!-- col 2 --> */}
                                                <td className="thumb">
                                                    <a href="/product/detail.html?product_no=4436&amp;cate_no=1">
                                                        <img src={item.pmImgSrc} onError="this.src='https://img.echosting.cafe24.com/thumb/img_product_small.gif';" alt={item.pmNm} style={{width: 80+'px'}} />
                                                    </a>
                                                </td>
                                                {/* <!-- col 3 --> */}
                                                <td className="product display_block">
                                                    <a href="/product/detail.html?product_no=4436&amp;cate_no=1">
                                                        <strong>{item.pmNm}</strong>
                                                        
                                                    </a>
                                                    <ul className="xans-element- xans-order xans-order-optionall option" style={{padding:0+'px'}}>
                                                        <li className="xans-record-">
                                                            <label>[옵션: {item.pmSelectedColor}]</label>
                                                            <br></br>
                                                            <select name="option1" id={"product_option_id_" + item.cartKey} className="ProductOption0" onChange={handlePmColor.bind(this)}>
                                                                <option value="*" selected="">
                                                                    - [필수] 옵션을 선택해 주세요 -
                                                                </option>
                                                                <option value="**">
                                                                    -------------------
                                                                </option>
                                                                {item.pmColor.map((color, idx) =>
                                                                    item.pmSelectedColor === color?
                                                                    <option value={color} selected>{color}</option>
                                                                    : <option value={color}>{color}</option>
                                                                )}
                                                                
                                                            </select> 
                                                            <input type="hidden" id={"color_id_"+item.cartKey } name="pmSelectedColor" value={item.pmSelectedColor}/>
                                                        </li>
                                                    </ul>
                                                </td>
                                                {/* <!-- col 4 --> */}
                                                <td className="price display_block">
                                                    <div className="discount display_inline_block">
                                                        <strong>{common.getCommaStr(item.pmPrice)}원</strong>
                                                        <input type="hidden" id={"originPrice_" + item.cartKey} value={item.pmPrice} />
                                                    </div>
                                                    <div className="display_inline_block">
                                                        <strong>{common.getCommaStr(Number(item.pmPrice) - Number(Number(item.pmPrice) * Number(item.pmSalesRate * 0.01)))}원</strong>
                                                        <input type="hidden" id={"price_" + item.cartKey} value={Number(item.pmPrice) - Number(Number(item.pmPrice) * Number(item.pmSalesRate * 0.01))} />
                                                        <input type="hidden" id={"originSales_" + item.cartKey} value={Number(item.pmPrice) * Number(item.pmSalesRate)* 0.01 } />  
                                                    </div>
                                                </td>
                                                {/* <!-- col 5 --> */}
                                                <td className="display_block">
                                                    <span className="ec-base-qty">
                                                        <input id={"quantity_id_" + item.cartKey } name="pmQuantity" size="2" value={item.pmQuantity==0?1:item.pmQuantity} type="text" />
                                                        <a href="#" onClick={() => addQuantityShortcut("quantity_id_" + item.cartKey)}>
                                                            <img src="https://img.echosting.cafe24.com/skin/base/common/btn_quantity_up.gif" alt="수량증가" className="up"></img>
                                                        </a>
                                                        <a href="#" onClick={() => outQuantityShortcut("quantity_id_" + item.cartKey)}>
                                                            <img src="https://img.echosting.cafe24.com/skin/base/common/btn_quantity_down.gif" alt="수량감소" className="down"></img>
                                                        </a>
                                                    </span>
                                                </td>
                                                {/* <!-- col 6 --> */}
                                                <td className="delivery display_block">
                                                    기본배송
                                                    <p className="display_inline_block">{common.getCommaStr(item.pmDeliveryPrice)}원</p>
                                                    <input type="hidden" id={"deliveryPrice_" + item.cartKey} value={item.pmDeliveryPrice} />
                                                </td>
                                                {/* <!-- col 7 --> */}
                                                <td className="total display_block">
                                                    <strong id={"total_" + item.cartKey}>{common.getCommaStr((Number(item.pmPrice) - Number(Number(item.pmPrice) * Number(item.pmSalesRate * 0.01))) * Number(item.pmQuantity) + Number(item.pmDeliveryPrice))}원</strong>
                                                    <input type="hidden" id={"newtotal_" + item.cartKey} class="_price" value={Number(item.pmPrice) * Number(item.pmQuantity)} />
                                                    <input type="hidden" id={"newsales_" + item.cartKey} class="_sales" value={Number(item.pmPrice) * Number(item.pmSalesRate)* 0.01 * Number(item.pmQuantity)} />
                                                </td>
                                                {/* <!-- col 8 -->		 */}
                                                <td className="button">
                                                    <a className="shoppingcart_table_btn" href="#none" onClick={() => toAddOrder(item.cartKey)}><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_order.gif" alt="주문하기"></img></a>
                                                    <a className="shoppingcart_table_btn" href="#none" onClick={() => toAddWishList(item.cartKey)}><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_wish.gif" alt="관심상품등록"></img></a>
                                                    <a className="shoppingcart_table_btn" href="#none" onClick={() => deleteCart(item.cartKey)}><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_delete.gif" alt="삭제"></img></a>
                                                </td>
                                            </tr>
                                            )
                                        }):
                                        <tr>
                                            <td colSpan="8" className="empty">장바구니가 비어있습니다.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
	        	        </div>
                
                        {/* <!-- 버튼 3개 --> */}
                        <div className="xans-element- xans-order xans-order-totalorder ec-base-button">
                            {/* <div className="btnArea L b_center ">
                                <a href="#none" onClick="" className="black " link-order="/order/orderform.html?basket_type=all_buy">전체상품주문</a>
                            </div> */}
                            <div className="btnArea L b_center ">
                                <a href="#none" className="gray" onClick={() => toAddOrder()}>선택상품주문</a>
                            </div>
                            <div className="btnArea L b_center">
                                <a href="/" className="white">쇼핑계속하기</a>
                            </div>
                        </div>
			        </div>
                    {/* <!-- end 장바구니 모듈 --> */}

                    {/* <!-- 이용안내 --> */}
                    <div className="xans-element- xans-order xans-order-basketguide ec-base-help "><h3>이용안내</h3>
                        <div className="inner">
                            <h4>장바구니 이용안내</h4>
                            <ol>
                                <li className="item1">해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.</li>
                                <li className="item2">해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.</li>
                                <li className="item3">선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</li>
                                <li className="item4">[쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</li>
                                <li className="item5">장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.</li>
                                <li className="item6">파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.</li>
                            </ol>
                            <h4>무이자할부 이용안내</h4>
                            <ol>
                                <li className="item1">상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여 [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.</li>
                                <li className="item2">[전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든 상품에 대한 주문/결제가 이루어집니다.</li>
                                <li className="item3">단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을 받으실 수 없습니다.</li>
                            </ol>
                        </div>
                    </div>
                    <form id="updateForm" className="displaynone">

                    </form>
                </div>
            </div>
        </div>
    );
}

export default CartComponent;