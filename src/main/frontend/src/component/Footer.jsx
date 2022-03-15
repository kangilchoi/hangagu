/*css*/
import "css/footer.css"

function Footer() {
  return (
    <div className="footer">
        <div className="footer_center">
            <br/><br/><br/>
            <ul className="cs_ct">
                <li className="phone">02-774-0001~4</li>
                <li className="cpo_email">hangagu@google.com</li> 
                <li className="runtime">• 운영시간 :
                Monday - Friday  :  09:00 ~ 19:00 &nbsp;       &nbsp;        Sat &amp; Holiday  :  13:00 ~ 19:00 &nbsp; &nbsp;             &nbsp;&nbsp;&nbsp; ( Closed on Sunday )</li>
            </ul>
            
        </div>

        {/*하단 기본메뉴*/}
        <div className="footer_center footer_low_menu">
            <ul>
                <li className="about_us"><a href="/shopinfo/company.html">회사소개</a></li>
                <li><a href="/member/agreement.html">이용약관</a></li>
                <li><a href="/member/privacy.html"><strong>개인정보취급방침</strong></a></li>
                <li><a href="/shopinfo/guide.html">이용안내</a></li>
            </ul>
        </div>
        {/*하단 회사정보*/}
        <div className="footer_center footer_low_info">
            <ul>
                <li>
                   <span>주식회사 한가구</span>
                   <span>대표 : 최강일,오세현,임수영</span>
                   <span>06111 서울특별시 강남구 테헤란로 한가구빌딩 1~3F</span>
                   <span className="">
                       사업자 등록번호 : 211-11-82432                       
                   </span>
               </li>   
               <li>
                   <span className="">통신판매업 : 2022-서울강남-014512호</span>
                   <span>이메일 : hanga@naver.com</span>
                   <span className="">팩스 : 02-1423-1423</span>
                   <span>개인정보관리책임 : 최강일(hangagu@google.com)</span>
               </li>   
               <li>
                    <span>국민은행 : 2836145-01-4923123</span>
                    <span>예금주 : 주식회사 한가구</span>
                </li>
                <li>
                   <span>Copyright ⓒ 주식회사 한가구 All Rights Reserved.</span>
               </li>   
            </ul>
        </div>
        <br/>
    </div>
  );
}

export default Footer;
