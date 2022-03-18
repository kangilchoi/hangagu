package kr.co.hangagu;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Bcrypt 알고리즘
 * des : 가장 강력한 단방향 비밀번호 해시 매커니즘 중 하나(Spring Security에서 제공하는 라이브러리)
 * @author kangil
 *
 */
public class BcryptTestUnit{

	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

//	@ParameterizedTest
//	@ValueSource(strings = {"test123","password!@#"})
	public void encrypt(String pw) {
        String encPw = bCryptPasswordEncoder().encode(pw);
        System.out.println("encoded pw : "+encPw);
	}

	@ParameterizedTest
	@ValueSource(strings = {"1234"})
	public void mathces(String pw) {
		BCryptPasswordEncoder b = bCryptPasswordEncoder();
		String encPw = b.encode(pw);
		
		System.out.println("pw : " + pw);
		System.out.println("encoded pw : " + encPw);
		System.out.println("===비교===");
		if(b.matches(pw, encPw)) {
			System.out.println("일치");
		}else{
			System.out.println("불일치");
		}
	}
	
}
