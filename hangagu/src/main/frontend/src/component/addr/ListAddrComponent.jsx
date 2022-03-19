import React, { Component, useState, useEffect } from 'react';
import AddrService from 'service/AddrService';
import "css/optimizer.css";
import "css/common.css";
import "css/datepicker.css";
import "css/myPage/wishList.css";
import * as common from "js/common.js";
import * as Auth from "components/Auth.jsx"
import { Link } from 'react-router-dom'


function AddrComponent({location}) {
    // 관심상품 목록
    const [addrList, setAddrList] = useState([]);
    
    const [memKey, setMemKey] = useState('');

  
    useEffect(() => {
        
        const fetchAddr = async() => {
            try {
                let memKey = await(Auth.getLoggedInMemKey());

                setMemKey(memKey);

                AddrService.getAddrs(memKey).then(res => {
                    
                    console.log(res.data.data)
                    setAddrList(res.data.data);

                    
                }).catch(err => console.log(err))
            } catch(e) {
                console.log(e);
            }
        };

        

        fetchAddr();
        
    }, []);

    const toAddAddr = (addrKey) => {
        window.location.href = "/addr/addView?addrKey="+addrKey;
    }

    const deleteAddr = () => {
        if(document.querySelectorAll('input[name="addrCheck"]:checked').length == 0) {
            alert("삭제할 상품을 선택해주세요.");
            
        } else {
            if(window.confirm("해당 배송지 목록을 삭제하시겠습니까?")) {
                let addrKey = document.querySelector('input[name="addrCheck"]:checked').value;

                let form = document.querySelector("#deleteForm");
            
                while (form.hasChildNodes()) { 
                    form.removeChild( form.firstChild ); 
                }

                let ondeleteYn=document.createElement('input')
                ondeleteYn.setAttribute('name', 'deleteYn');
                ondeleteYn.setAttribute('value', 'Y');

                let onaddrKey=document.createElement('input')
                onaddrKey.setAttribute('name', 'addrKey');
                onaddrKey.setAttribute('value', addrKey);

                form.appendChild(ondeleteYn);
                form.appendChild(onaddrKey);

                let formData = new FormData(form);

                AddrService.deleteAddr(formData).then(res => {
                    if(res.data.code == '1') {
                        alert("삭제되었습니다.");
                        window.location.reload();
                    } else {
                        alert("삭제가 실패되었습니다.");
                    }
                }).catch(err => console.log(err))
            }
        }

    }

    // const serializeArr = (form) => {
    //     let output = {};
    //     [...form.querySelectorAll('input, textarea, select')].map((el) => {
    //         switch (el.localName) {
    //             case 'input':
    //             case 'select':
    //                 output[el.getAttribute('name')] = (el.getAttribute('type') === 'checkbox') ? el.checked : el.value;
    //                 break;
    //         }
    //     });

    //     return output;
    // }

    // const handlePageChange = async(page) => {
    //     setPage(page);

    //     try {
    //         InterestProductService.getInterestProducts(document.querySelector("#memKey").value, page).then(res => {
    //             for(var i = 0; i < res.data.data.content.length; i++) {
    //                 res.data.data.content[i].pmColor = res.data.data.content[i].pmColor.split(",");
    //             }
                
    //             setWishList(res.data.data.content);
    //         }).catch(err => console.log(err))
    //     } catch(e) {
    //         console.log(e);
    //     }
    // }

    // const handlePmColor = (obj) => {
    //     obj.target.previousSibling.previousSibling.innerHTML = "[옵션: " + obj.target.selectedOptions[0].value + "]";
    //     //obj.target.nextSibling.value = obj.target.selectedOptions[0].value;
    // }

    // const checkAll = (e) => {
        
    //     let chk = document.querySelectorAll('input[name=interestCheck]');
    //     for(let i = 0; i < chk.length; i++) {
    //         if(chk[i].checked) {
    //             chk[i].checked = false;
    //         } else {
    //             chk[i].checked = true;
    //         }
    //     }

    // }


    // const toAddCart = (param) => {
    //     if(param == null && document.querySelectorAll('input[name="interestCheck"]:checked').length == 0) {
    //         alert("장바구니 추가할 상품을 선택해주세요.");
    //     } else {
    //         if(window.confirm("해당 상품을 장바구니에 등록하시겠습니까?")) {
    //             let objArr = new Array();
    //             let object = {};
                    
    //             if(param == null) {
                    
    //                 for(let i = 0; i < document.querySelectorAll('input[name="interestCheck"]:checked').length; i++) {
    //                     let form = document.querySelector("#form"+document.querySelectorAll('input[name="interestCheck"]:checked')[i].value);
    //                     if(form.querySelector("select").value.length == 0) {
    //                         alert("색상을 선택해주세요.");
    //                         return;
    //                     } else {
    //                         objArr.push(serializeArr(form));
    //                     }
    //                 }

    //                 // object["cartDtoList"] = objArr;

    //                 // let sendData = JSON.stringify(object);

    //                 // console.log(sendData)
                
    //             } else {
                    
    //                 let form = document.querySelector("#form"+param);
    //                 if(form.querySelector("select").value.length == 0) {
    //                     alert("색상을 선택해주세요.");
    //                     return;
    //                 } else {
    //                     objArr.push(serializeArr(form));
    //                 }
    //             }

    //             CartService.createCarts(objArr).then(res => {
    //                 if(res.data.code == '1') {
    //                     alert("장바구니에 추가되었습니다.");
    //                 } else {
    //                     alert("장바구니 추가에 실패하였습니다.")
    //                 }

    //                 window.location.reload();
    //             }).catch(err => console.log(err))
    //         }
    //     }
    // }

    // const deleteProduct = (param) => {
    //     if(param == null && document.querySelectorAll('input[name="interestCheck"]:checked').length == 0) {
    //         alert("삭제할 상품을 선택해주세요.");
    //     } else {
    //         if(window.confirm("해당 상품을 삭제하겠습니까?")) {
    //             let objArr = new Array();
                    
    //             if(param == null) {
                    
    //                 for(let i = 0; i < document.querySelectorAll('input[name="interestCheck"]:checked').length; i++) {
    //                     let form = document.querySelector("#form"+document.querySelectorAll('input[name="interestCheck"]:checked')[i].value);
                        
    //                     objArr.push(serializeArr(form));
    //                 }
                
    //             } else {
                    
    //                 let form = document.querySelector("#form"+param);
                    
    //                 objArr.push(serializeArr(form));
    //             }

    //             InterestProductService.deleteInterestProducts(objArr).then(res => {
    //                 if(res.data.code == '1') {
    //                     alert("상품이 삭제되었습니다.");
    //                 } else {
    //                     alert("상품 삭제에 실패하였습니다.")
    //                 }

    //                 window.location.reload();
    //             }).catch(err => console.log(err))
    //         }
    //     }
    // }


    return (
        <div id="wrap">
            <div id="container">
                <div id="contents">
                    {/* <!-- title --> */}
                    <div className="titleArea">
                        <h2>배송지 목록</h2>
                    </div>
                    <input type="hidden" id="memKey" value={memKey} />
                    {/* <!-- 배송지 목록 있을경우 --> */}
                    <div className="xans-element- xans-myshop xans-myshop-wishlist xans-record-">
                        <table border="1" summary="" className="">
                            <colgroup>
                                <col style={{width: 27+'px'}}></col>
                                <col style={{width: 50+'px'}}></col>
                                <col style={{width: 100+'px'}}></col>
                                <col style={{width: 150+'px'}} className="swapTh"></col>
                                <col style={{width: 150+'px'}} className="swapTh"></col>
                                <col style={{width: 350+'px'}} className="swapTh"></col>
                                <col style={{width: 50+'px'}}></col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>선택</th>
                                    <th scope="col">배송지명</th>
                                    <th scope="col">수령인</th>
                                    <th scope="col" className="swapTh">일반전화</th>
                                    {/* <th scope="col" className="swapTh">적립금</th> */}
                                    <th scope="col" className="swapTh">휴대전화</th>
                                    <th scope="col" className="swapTh">주소</th>
                                    <th scope="col" className="swapTh">수정</th>
                                </tr>
                            </thead>

                            <tbody className="xans-element- xans-myshop xans-myshop-wishlistitem">
                                {
                                    addrList.length != 0 ? addrList.map((item, index) => {
                                        return (
                                            <tr className="xans-record-" id={"form"+index}>
                                                {/* <!-- col 1 --> */}
                                                <td>
                                                    <input id="wish_idx_0" className="" value={item.addrKey} type="radio" name="addrCheck"/>
                                                    
                                                </td>

                                                <td align="center" className="thumb">
                                                    {item.addrNm}
                                                </td>

                                                <td align="center" className="thumb">
                                                    {item.rcpNm}
                                                </td>
                                                
                                                <td align="center" className="">
                                                    {item.rcpTel}
                                                </td>
                                               
                                                <td align="center" className="price swapTd">
                                                    {item.rcpMobile}
                                                </td>

                                                <td align="center" className="price swapTd">
                                                    {item.rcpAddr}
                                                </td>

                                                <td align="center" className="button">
                                                    <a href="#none" className="btnNormal" onClick={() => toAddAddr(item.addrKey)}>
                                                    {/* onClick={() => toAddCart(index)}> */}
                                                        수정
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    }):
                                    <tr>
                                        <td colSpan="7" className="empty">배송지 목록이 비어있습니다.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        
                        {/* <!-- 일괄 처리 버튼들 --> */}
                        <div className="xans-element- xans-myshop xans-myshop-wishlistbutton ec-base-button xans-record-">
                            <div className="btnArea M b_left">
                            <a href="#none" className="gray" onClick={() => deleteAddr()}>배송지 삭제</a>
                            </div>
                            <div className="btnArea L b_right">
                                <Link to="/addr/addView" className="black_s">배송지등록</Link>
                            </div>
                        </div>
                        <form id="deleteForm" class="displaynone">
                           
                        </form>
                    </div>
                </div>
            </div>
	    </div>
    );
}

export default AddrComponent;