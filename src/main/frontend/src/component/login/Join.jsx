import 'css/login/join.css';


function join() {
    return (
        <div id="wrap">

            <div id="container">
                <div id="contents">

                    <div className="path">
                        <span>현재 위치</span>
                        <ol>
                            <li><a href="/">홈</a></li>
                            <li title="현재 위치"><strong>회원 가입</strong></li>
                        </ol>
                    </div>

                    <div className="titleArea">
                        <h2>JOIN US</h2>
                    </div>

                    <center>SNS 회원가입, 로그인을 원하시는 분은 아래 아이콘을 클릭하시면 해당페이지로 이동합니다.<br/>
                        <p>
                            <a href="//www.furnimass.com/member/login.html">
                                <img src="/web/upload/logg.png"/>
                            </a>
                        </p>
                    </center>

                </div>
            </div>
        </div>
    );
}

export default join;