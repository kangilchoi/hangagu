package kr.co.hangagu.biz.common.auth.vo;

import java.io.Serializable;

public class JwtResponse implements Serializable {
	//직렬화 사용 이유 : 메모리에 올라간 객체나 데이터를 외부에서 사용할 수 있도록 Byte형태로 변환하는 것

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }
}