import 'css/login/findPasswordQuestion.css';


function findPasswordQuestion() {
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

                    <form id="findPasswdQuestion" name="" action="/exec/front/Member/FindPasswdQuestion/" method="post" target="_self" encType="multipart/form-data">
                        <input id="nextUrl" name="nextUrl" value="/member/passwd/find_passwd_result.html" type="hidden" />
                        <input id="member" name="member" value="2f81dece8ffcac6099695db30680edaa1a18943861e645d7099238527062fff7c4c7bff8fa49eb4a4b3bffbdf0749d09bc17cff0c9983e5a3b4f47987652102bf4b93e053f05d0f6eef2d1df4c46cf8fffbdd5151e8447c010ccd469cada0460f9a5055021470a42fc18982cc86fbf6fc4ef0a960e7bc8b1d4c2205511f6ac9f9b363e877c337001553ad0a0811f5cf5a8c87d8de75b1068df27fba960875f84c3d5ad4ddea8d108d59cb20216220687" type="hidden" />
                        <div className="xans-element- xans-member xans-member-findpasswdquestion ">
                            <div className="findPw">
                                    <fieldset>
                                        <legend>비밀번호 찾기 2단계 힌트답변 입력</legend>
                                        <p className="check"></p>
                                        <p className="question"><strong>질문</strong> <span>추억하고 싶은 날짜가 있다면?</span>
                                        </p>
                                        <p className="answer">
                                            <label htmlFor="passwd_answer">답변</label>
                                            <input id="passwd_answer" name="passwd_answer" className="lostInput" placeholder="" value="" type="text" />
                                        </p>

                                        <div className="ec-base-button" style="padding:15px 0 !important;">
                                            <div className="btnArea b_full b_center">
                                                <a href="#none" onClick="checkAnswer();" className="black">확인</a>
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

export default findPasswordQuestion;