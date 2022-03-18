import 'css/login/findPasswordResult.css';


function findPasswordResult() {
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

                    <div className="xans-element- xans-member xans-member-findpasswdresult ">
                        <div className="findPw">
                            <p className="desc">- 비밀번호가 고객님 메일로 발송되었습니다. -</p>
                            <div className="ec-base-box typeMember gMessage">

                                <div className="information">
                                    <p className="thumbnail">
                                        <img src="http://img.echosting.cafe24.com/skin/base/member/img_member_default.gif" alt=""/>
                                    </p>
                                    <p className="description">
                                        <strong>
                                            <span>osh5656</span>
                                        </strong>
                                        회원님의 패스워드를<br/>
                                        <strong className="txtEm">
                                            <span>osh5656@naver.com</span>
                                        </strong>으로 보내드렸습니다.
                                        <br/>고객님 즐거운
                                        쇼핑 하세요!
                                    </p>
                                </div>
                            </div>

                            <div className="ec-base-button">
                                <div className="btnArea L b_center">
                                    <a href="/member/login.html" className="black">로그인</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default findPasswordResult;