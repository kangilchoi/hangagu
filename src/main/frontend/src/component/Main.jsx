import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Auth from 'component/Auth';
import SimpleSlider from 'component/SimpleSlider'

/*css*/
//import "css/myPage/myPage.css"

//img
import slide3 from "img/slide3.jpg"

function Main(){

    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {

    },[]);

    return(
        <div>
            <SimpleSlider>
            </SimpleSlider>

            <br/><br/><br/><br/><br/><br/><br/>
            {/* 베스트셀러 상품 ex top 10 -> 베스트랑 신상품 jsx하나 만들어서 import. 밑에는 예제 가이드 by kangil*/}
            <div className="m_title">
                <h2><span style={{fontWeight: "bold"}}>BEST ITEM</span></h2>
            </div>
            <div>
                <img src={slide3} alt="" style={{width:"20%", marginLeft: "15%"}} />
                <img src={slide3} alt="" style={{width:"20%", marginLeft: "15%"}} />
                <img src={slide3} alt="" style={{width:"20%", marginLeft: "15%"}} />
                <img src={slide3} alt="" style={{width:"20%", marginLeft: "15%"}} />
            </div>
            {/* 신상품 */}
            <div className="m_title">
                <h2><span style={{fontWeight: "bold"}}>NEW ITEM</span></h2>
            </div>
        </div>
    );
}

export default Main;