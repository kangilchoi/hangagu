import React, { Component, useState, useEffect } from 'react';
import OrderService from 'service/OrderService';
import moment from 'moment';
import "css/optimizer.css";
import "css/common.css";
import "css/datepicker.css";
import "css/myPage/orderHistory.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import qs from "qs";
import * as common from "js/common.js";
import Pagination from "react-js-pagination";
import * as Auth from "component/Auth.jsx"
import { Link } from 'react-router-dom';

function ListOrderComponent({location}) {
    // 주문 목록
    
    const [orderList, setOrderList] = useState([]);
    const [orderCount, setOrderCount] = useState(0);
    const [fromDt, setFromDt] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    const [toDt, setToDt] = useState(new Date());
    const [odStatus, setOdStatus] = useState(["BEFORE_DEPOSIT", "READY", "IN_DELIVERY", "COMPLETE"]);
    const [delInfo, setDelInfo] = useState([]);

    const [memKey, setMemKey] = useState('');
  
    const query = qs.parse(location.search, {
        ignoreQueryPrefix:true,
    });

    const [page, setPage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    // 날짜 formatter
    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
     
        var d = this;
         
        return f.replace(/(yyyy|yy|MM|dd)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                default: return $1;
            }
        });
    };
     
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};
    

    useEffect(() => {
        
        const fetchOrder = async() => {
            try {
                let memKey = await(Auth.getLoggedInMemKey());

                setMemKey(memKey);

                OrderService.getOrders(fromDt.format('yyyy-MM-dd'), toDt.format('yyyy-MM-dd'), page, memKey, odStatus).then(res => {
                    setDelInfo(res.data.data.content);
                    setOrderList(res.data.data.content);
                    setOrderCount(res.data.data.totalElements);

                    setItemsCountPerPage(res.data.data.size);
                    setTotalItemsCount(res.data.data.totalElements);

                }).catch(err => console.log(err))
            } catch(e) {
                console.log(e);
            }
        };

        const setDelInfo = (content) => {
            setOrderStatus(content);
        }


        fetchOrder();
        
    }, []);

    const setOrderStatus = (content) => {
        for(var i = 0; i < content.length; i++) {
            var odKey = content[i].odKey;
            var cartKey = content[i].cartKey;

            if(content[i].odStatus === "BEFORE_DEPOSIT") {
                content[i].odStatus = "입금 전";
                content[i].btnStatus = <a href="#none" className="btnUpdate"><label onClick={() => modOrder(odKey, "CANCEL", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_cancel.gif" /></label><label onClick={() => modOrder(odKey, "EXCHANGE", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_exchange.gif" /></label><label onClick={() => modOrder(odKey, "RETURN", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_return.gif" /></label></a>;
            } else if(content[i].odStatus === "READY") {
                content[i].odStatus = "배송 준비중";
                content[i].btnStatus = <a href="#none" className="btnUpdate"><label onClick={() => modOrder(odKey, "CANCEL", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_cancel.gif" /></label><label onClick={() => modOrder(odKey, "EXCHANGE", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_exchange.gif" /></label><label onClick={() => modOrder(odKey, "RETURN", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_return.gif" /></label></a>;
            } else if(content[i].odStatus === "IN_DELIVERY") {
                content[i].odStatus = "배송 중";
                content[i].btnStatus = <a href="#none" className="btnUpdate"><label onClick={() => modOrder(odKey, "CANCEL", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_cancel.gif" /></label><label onClick={() => modOrder(odKey, "EXCHANGE", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_exchange.gif" /></label><label onClick={() => modOrder(odKey, "RETURN", cartKey)}><img src="https://ecimg.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_return.gif" /></label></a>;
            } else if(content[i].odStatus === "COMPLETE") {
                content[i].odStatus = "배송 완료";
            } else if(content[i].odStatus === "CANCEL") {
                content[i].odStatus = "취소";
                content[i].btnStatus = <a href="#none" className="" onClick={() => modOrder(odKey, "READY", cartKey)}><img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_retract.gif" alt="취소철회"></img></a>
            } else if(content[i].odStatus === "EXCHANGE") {
                content[i].odStatus = "교환";
                content[i].btnStatus = <a href="#none" className="" onClick={() => modOrder(odKey, "READY", cartKey)}><img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_retract2.gif" alt="교환철회"></img></a>
            } else if(content[i].odStatus === "RETURN") {
                content[i].odStatus = "반품";
                content[i].btnStatus = <a href="#none" className="" onClick={() => modOrder(odKey, "READY", cartKey)}><img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_retract3.gif" alt="반품철회"></img></a>
            }
        }
    }

    const setDate = (days) => {
        let originDays = days;
        days = Number(days);

        let month = '';
        let dt;
        
        if(days < 30) {
            month = 0;
            
        } else {
            month = days / 30;
            days = 0;
            
        }

        dt = new Date();
        dt.setFullYear(dt.getFullYear());
        dt.setMonth(dt.getMonth() - month);
        dt.setDate(dt.getDate() - days);

        setFromDt(dt);
        setToDt(new Date());

        if(document.querySelector("a.selected") != null) {
            document.querySelector("a.selected").classList.remove("selected");
        }
        document.querySelector("a.d" + originDays).classList.add("selected");
    }

    const handlePageChange = (page) => {
        
        setPage(page);
        searchList(page);
    }

    const searchList = async(page) => {
        try {
            OrderService.getOrders(fromDt.format('yyyy-MM-dd'), toDt.format('yyyy-MM-dd'), page, document.querySelector("#memKey").value, odStatus).then(res => {
                setOrderStatus(res.data.data.content);
                setOrderList(res.data.data.content);
                setOrderCount(res.data.data.totalElements);
            }).catch(err => console.log(err))
        } catch(e) {
            console.log(e);
        }
    }

    const modOrder = (odKey, odStatus, cartKey) => {
        var korOdStatus = "";
        switch (odStatus) {
            case "CANCEL": korOdStatus = "취소";break;
            case "EXCHANGE": korOdStatus = "교환";break;
            case "RETURN": korOdStatus = "반품";break;
            case "READY": korOdStatus = "재주문";break;
        }
        
        if(window.confirm("주문을 "+korOdStatus+" 처리 하시겠습니까?") == true) {
            document.querySelector("form#updateForm").querySelector("input#odKey").value = odKey;
            document.querySelector("form#updateForm").querySelector("input#odStatus").value = odStatus;
            document.querySelector("form#updateForm").querySelector("input#cartKey").value = cartKey;

            var form = document.getElementById("updateForm");
            var formData = new FormData(form);

            OrderService.updateOrder(formData).then(res => {
                if(res.data.code == '1') {
                    alert("주문이 수정되었습니다.");
                } else {
                    alert("주문 수정이 실패하였습니다");
                }
                window.location.reload();
            }).catch(err => console.log(err))
        }
        
    }

    return (
        <div id="wrap">
            {/* <link rel="stylesheet" href="https://furnimass.com/ind-script/optimizer.php?filename=tZbPbiMhDMbvZa99DnalPkGrSKmU_lFSac8M4zC0gCmYdvP2NdNopZ5jTmhG1s_f2B_26AUjaLCqVShVH1tJPppadW5T8FYtFIOuM6gZqndJ1zef_vzWliMizi2Ajqe6YNZYZihbXwnLaQtm_sUh13oEfcfHPUG8JEMwJ2ykJ1O9XdNZjBGTKPL7hSgS7BU_wFXzQ7CEGMjnIewFwhhwLuwUO6bO2TifDMGYaptpCHdqRMJW_o_Gf6NKEcYUmcPsJeDXT8cf3Y9OrRDgMqv95O0xBJ-c6m-THHb79LA53O03m0fFx9Nup0ynkMekLmzhz0QTstWiCnAkxS2AojLmluUSHKIppJ47VD2YZByUITZZxQutrHOS2HiW9uV1WHzO3GVZvMX0wQRuaRY0OGFW1Ra2pRyzeLeQem_evikeqCB4HVel5xBpwRMJqz0vqj1YSNQviuRcMsUunalIsnUL_8jxpe6u4DkF4uAIqQmTu1bDpljR2Y2ohaAlGreN58-qVg57RCSWGvBTcKdgefFQbhQmuH2U496nSsYVE__62cG6W78A&type=css&k=13b83f62e8be4e5618aaf0b609b87c3bbb1298f8&t=1623982620&user=T" />
            <link rel="stylesheet" href="https://furnimass.com/ind-script/optimizer.php?filename=rVPLDsIwDLtPu_IdEfxRl4UtrF1K0orH11ONAxJwQKVXK3Zt2YVZAsH-oBBVJnUBlEyyIgGawVFlTYASgqx9AXbwyz1hZ-JzYlm7Qa6VxJxS7aPe3UjrqMkNnt6ox8Kji-jyImeODhc4nTPpDaLPE69W0E31ifaZexRtJ1bu-d7UnpEnbJvYYck88kdzfyjmJGWB0VNqZ_PruurlRnZepna9eB4_BlwvVxq2dlFdosi4NPS3fU0yG1zDzDOFbS4P&amp;type=css&amp;k=ebc0e69562ecf77c52a9e59bc7652007ddcb9041&amp;t=1632782926"></link> */}
            <div id="container">
                <div id="contents">
                    <div className="titleArea">
                        <h2>ORDER</h2>
                    </div>
                    <div className="xans-element- xans-myshop xans-myshop-orderhistorytab ec-base-tab ">
                        <ul className="menu order_history_menu_ul">
                            <li className="tab_class selected order_history_width">
                                <a href="#">주문내역조회 (<span id="xans_myshop_total_orders">{orderCount}</span>)</a>
                            </li>
                            <li className="tab_class_cs">
                                <Link to="/order/getrm">
                                    취소/반품/교환 내역
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <form onSubmit={(e)=>{ e.preventDefault(); const data = new FormData(e.target);searchList(data); }}>
                        <input type="hidden" id="memKey" value={memKey} />
                        <div className="xans-element- xans-myshop xans-myshop-orderhistoryhead">
                            <fieldset className="ec-base-box">
                                <legend>검색기간설정</legend>
                                <div className="stateSelect ">
                                    <select id="order_status" name="order_status" className="fSelect" onChange={(e) => setOdStatus(e.target.value)}>
                                        <option value="">전체 주문처리상태</option>
                                        <option value="BEFORE_DEPOSIT">입금전</option>
                                        <option value="READY">배송준비중</option>
                                        <option value="IN_DELIVERY">배송중</option>
                                        <option value="COMPLETE">배송완료</option>
                                        <option value="CANCEL">취소</option>
                                        <option value="EXCHANGE">교환</option>
                                        <option value="RETURN">반품</option>
                                    </select>        
                                </div>
                                <span className="period">
                                    <a href="#none" className="btnNormal d00" days="00" onClick={() => setDate("00")}>
                                        <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date1.gif" offimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date1.gif" onimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date1_on.gif" alt="오늘" />    
                                    </a>
                                    <a href="#none" className="btnNormal d07" days="07" onClick={() => setDate("07")}>
                                        <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date2.gif" offimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date2.gif" onimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date2_on.gif" alt="1주일" />    
                                    </a>
                                    <a href="#none" className="btnNormal d30" days="30" onClick={() => setDate("30")}>
                                        <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date3.gif" offimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date3.gif" onimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date3_on.gif" alt="1개월" />
                                    </a>
                                    <a href="#none" className="btnNormal d90" days="90" onClick={() => setDate("90")}>
                                        <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date4.gif" offimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date4.gif" onimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date4_on.gif" alt="3개월" />
                                    </a>
                                    <a href="#none" className="btnNormal d180" days="180" onClick={() => setDate("180")}>
                                        <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date5.gif" offimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date5.gif" onimage="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date5_on.gif" alt="6개월" />
                                    </a>
                                </span>
                                {/* <input id="history_start_date" name="history_start_date" className="fText hasDatepicker" readOnly size="10" value={moment().subtract(1, 'M').format("YYYY-MM-DD")} type="text" /> */}
                                <DatePicker id="history_start_date" name="history_start_date" className="fText hasDatepicker" dateFormat="yyyy-MM-dd" size="10" onChange={(date) => setFromDt(date)} selected={fromDt} />
                                <button type="button" className="ui-datepicker-trigger">
                                    <img src="//img.echosting.cafe24.com/skin/admin_ko_KR/myshop/ico_cal.gif" alt="..." title="..." />
                                </button> 
                                <label className="datebetween">&nbsp;~&nbsp;</label>
                                {/* <input id="history_end_date" name="history_end_date" className="fText hasDatepicker" readOnly size="10" value={moment().format("YYYY-MM-DD")} type="text" onChange={onToDtChange}/> */}
                                <DatePicker id="history_end_date" name="history_end_date" className="fText hasDatepicker" dateFormat="yyyy-MM-dd" size="10" onChange={(date) => setToDt(date)} selected={toDt} />
                                <button type="button" className="ui-datepicker-trigger">
                                    <img src="//img.echosting.cafe24.com/skin/admin_ko_KR/myshop/ico_cal.gif" alt="..." title="..." />
                                </button>        
                                {/* <input alt="조회" id="order_search_btn" type="image" src="//img.echosting.cafe24.com/skin/admin_ko_KR/myshop/btn_search.gif" onClick={handleChange}/> */}
                                <img alt="조회" id="order_search_btn" src="//img.echosting.cafe24.com/skin/admin_ko_KR/myshop/btn_search.gif" onClick={() => searchList()}/>
                            </fieldset>
                            <ul>
                                <li>기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난 주문내역을 조회하실 수 있습니다.</li>
                                <li>주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수 있습니다.</li>
                                <li className="">취소/교환/반품 신청은 주문완료일 기준 3일까지 가능합니다.</li>
                            </ul>
                        </div>
                    </form>
        
                    <div className="xans-element- xans-myshop xans-myshop-orderhistorylistitem">
                        <div className="title">	
                            <h3>주문 상품 정보</h3>
                        </div>
                        <table border="1" summary="">
                            <caption>주문 상품 정보</caption>
                            <thead>
                                <tr>
                                    <th scope="col" className="number">주문일자<br />[주문번호]</th>
                                    <th scope="col" className="thumb">이미지</th>
                                    <th scope="col" className="product">상품정보</th>
                                    <th scope="col" className="quantity">수량</th>
                                    <th scope="col" className="price">상품구매금액</th>
                                    <th scope="col" className="state">주문처리상태</th>
                                    <th scope="col" className="service">취소/교환/반품</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderList.length == 0 ?  
                                    <tr>
                                        <td colSpan="7" className="empty">주문 내역이 없습니다</td>
                                    </tr> 
                                    :
                                    orderList.map((item, index) => {
                                        return (
                                        <tr key={index.odPmKey}>
                                            <td className="number">{moment(item.regDt).format("YYYY년 MM월 DD일 h:mm:ss a")}<br />[{item.odKey}]</td>
                                            <td className="thumb">
                                                <a href="/product/detail.html">
                                                    <img src={item.pmImgSrc} onError={(e)=>{e.target.onError=null; e.target.src="http://img.echosting.cafe24.com/thumb/img_product_small.gif"}} style={{width:102+'px'}} alt=""></img>
                                                </a>
                                            </td>
                                            <td>{ item.pmNm }</td>
                                            <td>{ item.pmQuantity } (개)</td>
                                            <td>{ common.getCommaStr(item.odPrice) } (원)</td>
                                            {/* <td>{ item.odStatus }</td> */}
                                            <td>{item.odStatus}</td>
                                            <td>
                                                <p></p>
                                                <p className=""><a href="" target=""></a></p>
                                                {/* <a href="/board/product/write.html" className=""><img src="http://img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_order_comment.gif" alt="구매후기"></img></a> */}
                                                { item.btnStatus }
                                                <input type="hidden" value={item.odKey} />
                                            </td>
                                        </tr>
                                        )
                                    })
                                    
                                }
                            </tbody>
                        </table>
                    </div>
        
                    <div className="xans-element- xans-myshop xans-myshop-orderhistorypaging ec-base-paginate">
                        <ol>
                            <Pagination activePage={page} itemsCountPerPage={itemsCountPerPage} totalItemsCount={totalItemsCount} pageRangeDisplayed={5} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} /> 
                        </ol>
                    </div>
                    <form id="updateForm">
                        <input type="hidden" id="odKey" name="odKey" value="" />
                        <input type="hidden" id="odStatus" name="odStatus" value="" />
                        <input type="hidden" id="cartKey" name="cartKey" value="" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ListOrderComponent;