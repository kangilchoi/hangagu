import React, { Component, useState, useEffect } from 'react';
import InterestProductService from 'service/InterestProductService';
import CartService from 'service/CartService';
import "css/optimizer.css";
import "css/common.css";
import "css/datepicker.css";
import "css/myPage/wishList.css";
import qs from "qs";
import * as common from "js/common.js";
import Pagination from "react-js-pagination";
import * as Auth from "component/Auth.jsx"


function CartComponent({location}) {
    // 관심상품 목록
    const [wishList, setWishList] = useState([]);
    
    const [page, setPage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const [memKey, setMemKey] = useState('');

  
    const query = qs.parse(location.search, {
        ignoreQueryPrefix:true,
    });


    
    useEffect(() => {
        
        const fetchInterestProduct = async() => {
            try {
                let memKey = await(Auth.getLoggedInMemKey());

                setMemKey(memKey);

                InterestProductService.getInterestProducts(memKey, page).then(res => {
                    
                    for(var i = 0; i < res.data.data.content.length; i++) {
                        res.data.data.content[i].pmColor = res.data.data.content[i].pmColor.split(",");
                    }

                    setWishList(res.data.data.content);

                    setItemsCountPerPage(res.data.data.size);
                    setTotalItemsCount(res.data.data.totalElements);
                    
                }).catch(err => console.log(err))
            } catch(e) {
                console.log(e);
            }
        };

        

        fetchInterestProduct();
        
    }, []);

    const serializeArr = (form) => {
        let output = {};
        [...form.querySelectorAll('input, textarea, select')].map((el) => {
            switch (el.localName) {
                case 'input':
                case 'select':
                    output[el.getAttribute('name')] = (el.getAttribute('type') === 'checkbox') ? el.checked : el.value;
                    break;
            }
        });

        return output;
    }

    const handlePageChange = async(page) => {
        setPage(page);

        try {
            InterestProductService.getInterestProducts(document.querySelector("#memKey").value, page).then(res => {
                for(var i = 0; i < res.data.data.content.length; i++) {
                    res.data.data.content[i].pmColor = res.data.data.content[i].pmColor.split(",");
                }
                
                setWishList(res.data.data.content);
            }).catch(err => console.log(err))
        } catch(e) {
            console.log(e);
        }
    }

    const handlePmColor = (obj) => {
        obj.target.previousSibling.previousSibling.innerHTML = "[옵션: " + obj.target.selectedOptions[0].value + "]";
        //obj.target.nextSibling.value = obj.target.selectedOptions[0].value;
    }

    const checkAll = (e) => {
        
        let chk = document.querySelectorAll('input[name=interestCheck]');
        for(let i = 0; i < chk.length; i++) {
            if(chk[i].checked) {
                chk[i].checked = false;
            } else {
                chk[i].checked = true;
            }
        }

    }


    const toAddCart = (param) => {
        if(param == null && document.querySelectorAll('input[name="interestCheck"]:checked').length == 0) {
            alert("장바구니 추가할 상품을 선택해주세요.");
        } else {
            if(window.confirm("해당 상품을 장바구니에 등록하시겠습니까?")) {
                let objArr = new Array();
                let object = {};
                    
                if(param == null) {
                    
                    for(let i = 0; i < document.querySelectorAll('input[name="interestCheck"]:checked').length; i++) {
                        let form = document.querySelector("#form"+document.querySelectorAll('input[name="interestCheck"]:checked')[i].value);
                        if(form.querySelector("select").value.length == 0) {
                            alert("색상을 선택해주세요.");
                            return;
                        } else {
                            objArr.push(serializeArr(form));
                        }
                    }

                    // object["cartDtoList"] = objArr;

                    // let sendData = JSON.stringify(object);

                    // console.log(sendData)
                
                } else {
                    
                    let form = document.querySelector("#form"+param);
                    if(form.querySelector("select").value.length == 0) {
                        alert("색상을 선택해주세요.");
                        return;
                    } else {
                        objArr.push(serializeArr(form));
                    }
                }

                CartService.createCarts(objArr).then(res => {
                    if(res.data.code == '1') {
                        alert("장바구니에 추가되었습니다.");
                    } else {
                        alert("장바구니 추가에 실패하였습니다.")
                    }

                    window.location.reload();
                }).catch(err => console.log(err))
            }
        }
    }

    const deleteProduct = (param) => {
        if(param == null && document.querySelectorAll('input[name="interestCheck"]:checked').length == 0) {
            alert("삭제할 상품을 선택해주세요.");
        } else {
            if(window.confirm("해당 상품을 삭제하겠습니까?")) {
                let objArr = new Array();
                    
                if(param == null) {
                    
                    for(let i = 0; i < document.querySelectorAll('input[name="interestCheck"]:checked').length; i++) {
                        let form = document.querySelector("#form"+document.querySelectorAll('input[name="interestCheck"]:checked')[i].value);
                        
                        objArr.push(serializeArr(form));
                    }
                
                } else {
                    
                    let form = document.querySelector("#form"+param);
                    
                    objArr.push(serializeArr(form));
                }

                InterestProductService.deleteInterestProducts(objArr).then(res => {
                    if(res.data.code == '1') {
                        alert("상품이 삭제되었습니다.");
                    } else {
                        alert("상품 삭제에 실패하였습니다.")
                    }

                    window.location.reload();
                }).catch(err => console.log(err))
            }
        }
    }


    return (
        <div id="wrap">
            <div id="container">
                <div id="contents">
                    {/* <!-- title --> */}
                    <div className="titleArea">
                        <h2>WISH LIST</h2>
                    </div>
                    <input type="hidden" id="memKey" value={memKey} />
                    {/* <!-- 관심상품 있을경우 --> */}
                    <div className="xans-element- xans-myshop xans-myshop-wishlist xans-record-">
                        <table border="1" summary="" className="">
                            <colgroup>
                                <col style={{width: 27+'px'}}></col>
                                <col style={{width: 120+'px'}}></col>
                                <col style={{width: 200+'px'}}></col>
                                <col style={{width: 'auto'}} className="swapTh"></col>
                                <col style={{width: 'auto'}} className="swapTh"></col>
                                <col style={{width: 'auto'}} className="swapTh"></col>
                                <col style={{width: 'auto'}} className="swapTh"></col>
                                {/* <col style={{width: 'auto'}} className="swapTh"></col> */}
                                <col style={{width: 110+'px'}}></col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col"><input type="checkbox" onClick={() => checkAll()}/></th>
                                    <th scope="col">이미지</th>
                                    <th scope="col">상품정보</th>
                                    <th scope="col" className="swapTh">판매가</th>
                                    {/* <th scope="col" className="swapTh">적립금</th> */}
                                    <th scope="col" className="swapTh">배송구분</th>
                                    <th scope="col" className="swapTh">배송비</th>
                                    <th scope="col" className="swapTh">합계</th>
                                    <th scope="col">선택</th>
                                </tr>
                            </thead>

                            <tbody className="xans-element- xans-myshop xans-myshop-wishlistitem">
                                {
                                    wishList.length != 0 ? wishList.map((item, index) => {
                                        return (
                                            <tr className="xans-record-" id={"form"+index}>
                                                {/* <!-- col 1 --> */}
                                                <td>
                                                    <input id="wish_idx_0" className="" value={index} type="checkbox" name="interestCheck"/>
                                                    <input type="hidden" name="memKey" value={memKey} />
                                                    <input type="hidden" name="pmKey" value={item.pmKey} />
                                                    <input type="hidden" name="interestPmKey" value={item.interestPmKey} />
                                                    <input type="hidden" name="deleteYn" value="Y" />
                                                </td>
                                                {/* <!-- col 2 : 이미지--> */}
                                                <td className="thumb">
                                                    <a href="/product/detail.html?product_no=5069&amp;cate_no=1&amp;display_group=">
                                                        <img src={item.pmImgSrc} alt={item.pmNm} style={{width:80+'px'}}></img>
                                                    </a>
                                                </td>
                                                {/* <!-- col 3 : 상품정보--> */}
                                                <td className="product">
                                                    <a href="/product/detail.html?product_no=4436&amp;cate_no=1">
                                                        <strong>{item.pmNm}</strong>
                                                    </a>
                                                    <ul className="xans-element- xans-order xans-order-optionall option">
                                                        <li className="xans-record-">
                                                            {/* [옵션: 오렌지] */}
                                                            <label></label>
                                                            <br></br>
                                                            <select name="pmSelectedColor" id="product_option_id1" className="ProductOption0" onChange={handlePmColor.bind(this)}>
                                                                <option value="" selected="">
                                                                    - [필수] 옵션을 선택해 주세요 -
                                                                </option>
                                                                {item.pmColor.map((color, idx) =>
                                                                    <option value={color}>{color}</option>
                                                                )}
                                                            </select>
                                                        </li>
                                                    </ul>
                                                </td>
                                                {/* <!-- col 4 : 가격--> */}
                                                <td className="price swapTd">
                                                    <strong className="">{common.getCommaStr(item.pmPrice)}원</strong>
                                                </td>

                                                {/* <!-- col 5 : 마일리지--> */}
                                                {/* <td className="mileage swapTd">-</td> */}

                                                {/* <!-- col 6 : 배송 타입--> */}
                                                <td className="delivery swapTd">기본배송</td>

                                                {/* <!-- col 7 : 배송비--> */}
                                                <td className="swapTd">{common.getCommaStr(item.pmDeliveryPrice)}원</td>

                                                {/* <!-- col 8 : 합계--> */}
                                                <td className="total swapTd">{common.getCommaStr(Number(item.pmPrice) + Number(item.pmDeliveryPrice))}</td>
                                                
                                                {/* <!-- col 9 : 버튼 --> */}
                                                <td className="button">
                                                    {/* <!-- 주문 버튼 --> */}
                                                    {/* <a href="#none" className="">
                                                        <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_order.gif" alt="주문하기"></img>
                                                    </a> */}
                                                    {/* <!-- 장바구니 버튼 --> */}
                                                    <a href="#none" className="" onClick={() => toAddCart(index)}>
                                                        <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_basket.gif" alt="장바구니담기"></img>
                                                    </a>
                                                    {/* <!-- 삭제 버튼 --> */}
                                                    <a href="#none" className="" onClick={() => deleteProduct(index)}>
                                                        <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_delete.gif" alt="삭제"></img>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    }):
                                    <tr>
                                        <td colSpan="8" className="empty">관심 상품이 비어있습니다.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        
                        {/* <!-- 일괄 처리 버튼들 --> */}
                        <div className="xans-element- xans-myshop xans-myshop-wishlistbutton ec-base-button xans-record-">
                            <div className="btnArea M b_left">
                                <a href="#none" className="black_s" onClick={() => toAddCart()}>장바구니 담기</a>
                            </div>
                            <div className="btnArea L b_right">
                                <a href="#none" className="gray" onClick={() => deleteProduct()}>상품 삭제</a>
                            </div>
                            {/* <div className="btnArea L b_right">
                                <a href="" onclick="searchProductPopup()" className="black">상품 주문</a>
                            </div> */}
                        </div>

                        {/* <!-- paging --> */}
                        <div className="xans-element- xans-board xans-board-paging-4 xans-board-paging xans-board-4 ec-base-paginate">
                            <ol>
                                <Pagination activePage={page} itemsCountPerPage={itemsCountPerPage} totalItemsCount={totalItemsCount} pageRangeDisplayed={5} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} /> 
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
	    </div>
    );
}

export default CartComponent;