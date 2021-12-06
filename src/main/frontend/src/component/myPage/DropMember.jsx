import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
/*css*/
import "css/myPage/memberModify.css"

/*js*/

/*img*/
import red_dot from "img/red_dot.gif"


function DropMember(){
    let history = useHistory();
    
    //Hook(useEffect) : 컴포넌트 랜더링마다 실행
    useEffect(() => {
        dropMember();
    },[]);

    
    //axios update member
    const dropMember = async() =>{

        try{
            
            const response = await axios.get('http://localhost:8888/member/dropMember/MK210004');
            if(response.data.code >=0){
                alert("탈퇴가 완료되었습니다.");
            }else{
                alert("탈퇴에 실패하였습니다.");
            }
        } catch (e) {
            console.log(e);
        }
    

        //회원정보로 이동
        history.push("/main");
    };

    return(<></>);
}

export default DropMember;