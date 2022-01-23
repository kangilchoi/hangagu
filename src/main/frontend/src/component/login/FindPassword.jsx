import 'css/login/findPassword.css';


function findPassword() {
    return (
        <div id="wrap">

            <div id="container">
                <div id="contents">

                    <div className="path">
                        <span>현재 위치</span>
                        <ol>
                            <li><a href="/">홈</a></li>
                            <li title="현재 위치"><strong>비밀번호 찾기</strong></li>
                        </ol>
                    </div>

                    <div className="titleArea">
                        <h2>FIND PASSWORD</h2>
                    </div>

                    <form id="findPasswdForm" name="findPasswdForm" action="" method="post" target="_self" encType="multipart/form-data">
                        <input id="nextUrl" name="nextUrl" value="/member/passwd/find_passwd_question.html" type="hidden"/>
                            <div className="xans-element- xans-member xans-member-findpasswd ">
                                <div className="findPw">
                                    <fieldset>
                                        <legend>비밀번호 찾기 1단계 정보 입력</legend>
                                        <p className="member"><strong>회원유형</strong>
                                            <select id="searchType"name="searchType">
                                                <option value="indi" selected="selected">개인회원</option>
                                            </select>
                                        </p>
                                        <p className="check">
                                            <input id="check_method1" name="check_method" value="2" type="radio" checked="checked"/>
                                            <label htmlFor="check_method1">이메일</label>
                                            <input id="check_method2" name="check_method" value="3" type="radio"/>
                                            <label htmlFor="check_method2">
                                                <span id="search_type_mobile_lable" style="display:inline;">
                                                휴대폰번호
                                                </span>
                                            </label>
                                        </p>
                                        <p className="id">
                                            <strong>아이디</strong>
                                            <input id="member_id" name="member_id" className="lostInput" placeholder=""value="" type="text"/>
                                        </p>
                                        <p id="name_view" className="name" style="">
                                            <strong id="name_lable">이름</strong>
                                            <input id="name" name="name" className="lostInput ec-member-name" placeholder="" value="" type="text"/>
                                        </p>
                                        <p id="email_view" className="email" style="">
                                            <strong>이메일로 찾기</strong>
                                            <input id="email" name="email" className="lostInput" placeholder="" value="" type="text"/>
                                        </p>
                                        <p id="mobile_view" className="mobile" style="display:none;">
                                            <strong>휴대폰 번호로 찾기</strong>
                                            <input id="mobile1" name="mobile1" className="mobile1" placeholder="" maxLength="3" value="" type="text"/>
                                                -
                                            <input id="mobile2" name="mobile2" className="mobile2" placeholder="" maxLength="4" value="" type="text"/>
                                                    -
                                            <input id="mobile3" name="mobile3" className="mobile2" placeholder="" maxLength="4" value="" type="text"/>
                                        </p>

                                        <div className="ec-base-button" style="padding:15px 0 !important;">
                                            <div className="btnArea b_full b_center">
                                                <a href="#none" onClick="findPasswd.action('furnimass' , 'kcp'); return false;" className="black">확인</a>
                                            </div>
                                        </div>

                                    </fieldset>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default findPassword;