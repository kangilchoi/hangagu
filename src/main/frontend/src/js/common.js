import React from 'react';
import DaumPostCode from 'react-daum-postcode';

export const getCommaStr = str => {
    let returnValue = Number(str).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnValue;
}

export const getSalesPrice = (price, rate) => {
    let returnValue = Number(price) * Number(rate * 0.01);
    return returnValue;
}

export const getTel = (tel, idx) => {
    let returnValue = tel?.split('-')[idx];
    return returnValue;
}

export const getEmail = (email, idx) => {
    let returnValue = email?.split('@')[idx];
    return returnValue;
}

export const fn_execPostCode = (obj) => {
    console.log(obj);
    obj.appendChild(<DaumPostCode />);
    
    // alert("주소")
    // const handleComplete = (data) => {
    //     let fullAddress = data.address;
    //     let extraAddress = '';
    //     if (data.addressType === 'R') {
    //         if (data.bname !== '') {
    //             extraAddress += data.bname;
    //         }
    //         if (data.buildingName !== '') {
    //             extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
    //         }
    //         fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    //     }
    //     //fullAddress -> 전체 주소반환
    // }

    // const postCodeStyle = {
    //     display: "block",
    //     position: "absolute",
    //     top: "10%",
    //     width: "600px",
    //     height: "600px",
    //     padding: "7px",
    //   };
    
    // return (<DaumPostCode style={postCodeStyle} onComplete={handleComplete} className="post-code" />);

}
 