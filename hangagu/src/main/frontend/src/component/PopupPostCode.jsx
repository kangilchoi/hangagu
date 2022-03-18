import React from 'react';
import DaumPostcode from "react-daum-postcode";
 
import cancel_b from "img/cancel_b.png"

const PopupPostCode = (props) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        
        props.setMember({
          ...props.member, // 기존의 객체를 복사한 뒤
          ['memAddr']: fullAddress // type 키를 가진 값을 value 로 설정
        });
        
        
        props.onClose()
    }
 
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "25%",
        left: "25%",
        width: "600px",
        height: "460px",
        border: "1px solid gray"
    };
 
    const closeBtnStyle = {
      cursor:'pointer',
      display: "block",
      position: "absolute",
      top: "19.5%",
      left: "73%",
      width: "50px",
      padding: "7px"
    };
    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            {/* <button type='button' onClick={() => {props.onClose()}} className='postCode_btn'>닫기</button> */}
            <img src={cancel_b} style={closeBtnStyle}alt="닫기" onClick={() => {props.onClose()}}/>
        </div>
    )
}
 
export default PopupPostCode;