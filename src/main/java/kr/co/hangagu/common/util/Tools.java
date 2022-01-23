package kr.co.hangagu.common.util;

import java.util.Random;

public class Tools {

	//6자리 인증코드 생성(6자리 고정)
	public static int getAuthCode() {
		Random random = new Random();
        int res = random.nextInt(888888) + 111111;
		return res;
	}
}
