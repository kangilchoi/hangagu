import 'css/login/findIdResult.css';


function findIdResult() {
    return (
        <div id="wrap">

            <div id="container">
                <div id="contents">

                    <div className="path">
                        <span>현재 위치</span>
                        <ol>
                            <li><a href="/">홈</a></li>
                            <li title="현재 위치"><strong>아이디 찾기</strong></li>
                        </ol>
                    </div>

                    <div className="titleArea">
                        <h2>FIND ID</h2>
                    </div>

                    <div className="xans-element- xans-member xans-member-findidresult">
                        <div className="findId">
                            <p className="desc">- 고객님 아이디 찾기가 완료 되었습니다. -</p>
                            <div className="ec-base-box typeMember gMessage">
                                <p className="message">다음정보로 가입된 아이디가 총 <span className="txtEm">1</span>개 있습니다.</p>
                                <div className="information">
                                    <p className="thumbnail">
                                        <img src="http://img.echosting.cafe24.com/skin/base/member/img_member_default.gif" alt="" />
                                    </p>
                                    <ul className="description">
                                        <li>이름 : <strong><span>오세현</span></strong>
                                        </li>
                                        <li>이메일 : <span>osh5656@naver.com</span></li>
                                        <li>
                                            <label>
                                                <input type="radio" name="fid" onClick="set_findpwdid( 'osh5656' , 'indi' );" checked=""/>
                                                <span className="id">osh5656</span> <span className="gaip">( 개인회원, 2020-10-18 가입 )</span>
                                            </label>
                                            <br/>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="ec-base-button">
                                <div className="btnArea L b_center ">
                                    <a href="#" className="black">로그인</a>
                                </div>
                                <div className="btnArea L b_center ">
                                    <a href="#" className="white">비밀번호 찾기</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default findIdResult;