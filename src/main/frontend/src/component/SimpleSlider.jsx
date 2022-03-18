import React, { Component } from "react";
import Slider from "react-slick";

//css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "css/slider.css"

/*img*/
import slide1 from "img/slide1.jpg"
import slide2 from "img/slide2.jpg"
import slide3 from "img/slide3.jpg"
import slide4 from "img/slide4.jpg"
import slide5 from "img/slide5.jpg"


const SimpleSlider = ()=>{

    const settings = {
      
      dots: true,  // 슬라이드 밑에 점 보이게
      infinite: true,  // 무한으로 반복
      speed: 300,
      autoplay: true,
      autoplaySpeed: 3000,  // 넘어가는 속도
      slidesToShow: 1,  // 4장씩 보이게
      slidesToScroll: 1,  // 1장씩 뒤로 넘어가게
      centerMode: true,
      centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    };
    
    return (
    	<Slider {...settings}>
                <div>
                    <img src={slide2} alt="" style={{width:"70%", marginLeft: "15%"}} />
                </div>
                <div>
                  <img src={slide1} alt="" style={{width:"70%", marginLeft: "15%"}} />
                </div>
                <div>
                  <img src={slide3} alt="" style={{width:"70%", marginLeft: "15%"}} />
                </div>
                <div>
                  <img src={slide4} alt="" style={{width:"70%", marginLeft: "15%"}} />
                </div>
                <div>
                  <img src={slide5} alt="" style={{width:"70%", marginLeft: "15%"}} />
                </div>
      </Slider>  
    );
}


export default SimpleSlider