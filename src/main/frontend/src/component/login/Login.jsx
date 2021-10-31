/*css*/
import "css/common.css"
import "css/login/login.css"


/*img*/
import g_btn_menu_plus from "img/g_btn_menu_plus.png"
import member_icon_b from "img/member_icon_b.png"
import cart_icon_b from "img/cart_icon_b.png"
import find_icon_b from "img/find_icon_b.png"

function Login() {
    return(
        <div id="wrap">
            <div id="container">
                <div id="contents">

                    <div className="path">
                        <span>현재 위치</span>
                        <ol>
                            <li><a href="/">홈</a></li>
                            <li title="현재 위치"><strong>로그인</strong></li>
                        </ol>
                    </div>

                    <div className="titleArea">
                        <h2>LOGIN</h2>
                    </div>

                    <div class="login_box">
                        <ul>
                            <li>
                                <form name="" enctype="multipart/form-data">
                                    <div class="xans-element- xans-member xans-member-login ">
                                        <div class="login">
                                            <fieldset>
                                                <legend>회원로그인</legend>
                                                <label className="id ePlaceholder" title="아이디">
                                                    <input id="member_id" name="member_id" class="inputTypeText" placeholder="아이디" value="" type="text"/>
                                                </label>
                                                <label className="password ePlaceholder" title="비밀번호">
                                                    <input id="member_passwd" name="member_passwd" autocomplete="off" value=""type="password" placeholder="비밀번호"/>
                                                </label>
                                                <div className="btnArea Login center">
                                                    <a href="#" class="black">로그인</a>
                                                </div>
                                                <div class="find">
                                                    <a href="#">- 아이디찾기</a>
                                                    <a href="#">- 비밀번호찾기</a>
                                                </div>

                                                <div class="snsArea">
                                                    <ul>
                                                        <li class="">
                                                            <a href="#">
                                                                <img src="../../img/login_btn_naver.png" alt="네이버 로그인"/></a>
                                                        </li>
                                                        <li class="">
                                                            <a href="#">
                                                                <img src="../../img/login_btn_kakao.png" alt="카카오계정 로그인"/></a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="link">
                                                    <div class="btnArea Login center">
                                                        <a href="#" class="gray">회원가입</a>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;