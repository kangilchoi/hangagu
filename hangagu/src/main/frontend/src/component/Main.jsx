import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Auth from 'component/Auth';
import SimpleSlider from 'component/SimpleSlider'

/*css*/
//import "css/myPage/myPage.css"

//img
import slide3 from "img/slide3.jpg"

function Main(){

    const [bestItems, setBestItems] = useState([]);

    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
        fetchNewItem();
    },[]);

    const fetchNewItem = async() => {
        try{
            const response = await axios.get('/product/popular/list');
            if(response.data.code >=0){
                setBestItems(response.data.data);
            }else{
                return(
                    <div>error</div>
                )
            }
        } catch (e) {
        console.log(e);
        }
    }

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
                <ul>
                {
                    bestItems.map((item) => {
                        return (
                            <li style={{width:25+'%', float:'left'}}>
                                <img src={item.pmImgSrc} alt="" style={{maxWidth:300+'px', width:100+'%'}} />
                            </li>
                        )
                    })
                }
                <li style={{float:'none', clear:'both'}}></li>
                </ul>
            </div>
            {/* 신상품 */}
            <div className="m_title">
                <h2><span style={{fontWeight: "bold"}}>NEW ITEM</span></h2>
            </div>
        </div>
    );
}

export default Main;