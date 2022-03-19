import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import AddrService from 'service/AddrService';

import DaumPostcode from 'react-daum-postcode';
import { Link } from 'react-router-dom'
import * as Auth from 'components/Auth';
import * as common from "js/common.js";
import qs from "qs";

/*css*/
import "css/myPage/memberModify.css"

/*js*/

/*img*/
import red_dot from "img/red_dot.gif"
import addr_api from "img/addr_api.gif"


function AddAddrComponent({location}){
    
    const [isOpenPost, setIsOpenPost] = useState(false);

    const [address, setAddress] = useState(''); // 주소
    const [addressDetail, setAddressDetail] = useState(''); // 상세주소

    const query = qs.parse(location.search, {
        ignoreQueryPrefix:true,
    });

    const [addrDetail, setAddrDetail] = useState({
        addrKey:'',
        addrNm: '',
        rcpNm: '',
        rcpAddr:'',
        rcpPost:'',
        rcpAddr2:'',
        rcpTel: '',
        rcpMobile:''
    });

    const [isNewkr, setIsNewkr] = useState('저장');

    const [memKey, setMemKey] = useState('');

    const {addrKey, addrNm, rcpNm, rcpAddr, rcpPost, rcpAddr2, rcpTel, rcpMobile} = addrDetail;


    useEffect(() => {
        const fetchAddrDetail = async() => {
            try {
                let authMemKey = await(Auth.getLoggedInMemKey());

                setMemKey(authMemKey);
                
                if(query.addrKey != null && query.addrKey != "undefined") {
                    AddrService.getAddrDetail(query.addrKey).then(res => {
                        setInfo(res.data.data);
                        setAddress(res.data.data.rcpPost);
                        setAddressDetail(res.data.data.rcpAddr);
                        setIsNewkr("수정");
                    }).catch(err => console.log(err))
                } else {
                    setIsNewkr("저장");
                }
            } catch(e) {
                console.log(e);
            }
        }
        
        fetchAddrDetail();
    },[]);

    const setInfo = (data) => {
        setAddrDetail({
            addrKey: data.addrKey,
            addrNm: data.addrNm,
            rcpNm: data.rcpNm,
            rcpAddr:data.rcpAddr,
            rcpPost:data.rcpPost,
            rcpAddr2:data.rcpAddr2,
            rcpTel:data.rcpTel,
            rcpMobile:data.rcpMobile
        })
    }

    const onChangeInput = (e) => {
        const {value, name} = e.target;

        if(name === "rcpTel") {
            if (value.length === 11) {
                setAddrDetail({
                    ...addrDetail,
                    rcpTel: value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
                });
            } else {
                setAddrDetail({
                    ...addrDetail,
                    [name] : value
                });
            }
        } else if(name === "rcpMobile") {
            if (value.length === 11) {
                setAddrDetail({
                    ...addrDetail,
                    rcpMobile: value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
                });
            } else {
                setAddrDetail({
                    ...addrDetail,
                    [name] : value
                });
            }
        } else {    
        setAddrDetail({
            ...addrDetail,
            [name] : value
        });
    }
    }

    const saveAddr = (formData) => {
        if(window.confirm("해당 정보로 "+isNewkr+"하시겠습니까?")) {
            
            // for (var pair of formData.entries()) {
            //     console.log(pair[0] + "," + pair[1])
            // }

            AddrService.saveAddr(formData).then(res => {
                if(res.data.code == '1') {
                    alert("회원정보가 " + isNewkr + "되었습니다.");
                } else {
                    alert("회원정보 " + isNewkr + " 실패하였습니다.");
                }

                window.location.href="/addr/addView?addrKey="+res.data.data.addrKey;

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

    return(
    <div id="wrap">
        <div id="container">
            <div id="contents">
            
                <div className="titleArea">
                    <h2 style={{fontWeight:"bold"}}>{"배송지 정보 " +isNewkr}</h2>
                </div>

                <div className="xans-element- xans-myshop xans-myshop-asyncbenefit" style={{border:'none'}}>
                    
                    <form id="frm_addr_act" name="frm_addr_act" action="" method="post" target="_self" onSubmit={(e)=>{ e.preventDefault(); const data = new FormData(e.target);saveAddr(data); }}>
                        <input type="hidden" name="addrKey" value={addrKey} />
                        <input type="hidden" name="memKey" value={memKey} />
                        <div className="xans-element- xans-member xans-member-edit">
                            
                            <div className="boardWrite">
                                <table border="1" summary="">
                                    <caption>회원 기본정보</caption>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                배송지명 <img src={red_dot} alt="필수"/>
                                            </th>
                                            <td>
                                                <input id="addrNm" name='addrNm' onChange={onChangeInput} className="inputTypeText" type="text" value={addrNm || ''} required/>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" id="">성명 <img src={red_dot} alt="필수"/></th>
                                            <td>
                                                <input id="rcpNm" name="rcpNm" onChange={onChangeInput} className="ec-member-name" type="text" value={rcpNm || ''} required/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" id="">주소 <img src={red_dot} alt="필수"/>
                                            </th>
                                            <td>
                                                <input id="rzipcode1" name="rcpPost" fw-filter="isFill" fw-label="수취자 우편번호1" fw-msg="" className="inputTypeText" placeholder="" size="6" maxLength="6" type="text" value={address} readOnly required/>                        
                                                <a href="#none" id="btn_search_rzipcode" onClick={onChangeOpenPost}><img src="https://img.echosting.cafe24.com/skin/base_ko_KR/order/btn_zipcode.gif" alt="우편번호" /></a><br />
                                                {isOpenPost  ? (
                                                    <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost } />
                                                ) : null}
                                                <input id="rcpAddr" name="rcpAddr" fw-filter="isFill" fw-label="수취자 주소1" fw-msg="" className="inputTypeText" placeholder="" size="40" type="text" value={addressDetail} readOnly required/> 
                                                <span className="grid">&nbsp;기본주소</span><br />
                                                <input id="rcpAddr2" name="rcpAddr2" fw-filter="isFill" fw-label="수취자 주소2" fw-msg="" className="inputTypeText" placeholder="" size="40" type="text" value={rcpAddr2} onChange={onChangeInput} required/> 
                                                <span className="grid">&nbsp;나머지주소</span>
                                                <span className="grid displaynone">(선택입력가능)</span>
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <th scope="row">일반전화 <img src={red_dot} alt="필수"/></th>
                                            <td>
                                                <input type="tel" name="rcpTel" id="rcpTel" value={rcpTel} onChange={onChangeInput} maxLength="13" />
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <th scope="row">휴대전화 <img src={red_dot} alt="필수"/></th>
                                            <td>
                                                <input type="text" name="rcpMobile" value={rcpMobile} onChange={onChangeInput} maxLength="13"/>
                                            </td>
                                        </tr>
                                    
                                    </tbody>
                                </table>
                            </div>
                        
                            <div className="ec-base-button">
                                <div className="btnArea L b_right" style={{width:255+'px'}}>
                                    <input type="submit" href="" className="black" style={{float:'left' ,width:125+'px', marginRight:5+'px'}} value={"회원정보 " + isNewkr }/>
                                    <Link to="/addr/get" className="gray" style={{float:'left',width:125+'px'}}>취소</Link>
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

export default AddAddrComponent;