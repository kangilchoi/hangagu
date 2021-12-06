package kr.co.hangagu.encrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcrpytUnit {

	@Autowired
	static
	BCryptPasswordEncoder passwordEncoder;

	public static void encryptPw() {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String password ="a123456";
		String encryptPassword = passwordEncoder.encode(password);
		System.out.println(encryptPassword);
		System.out.println(passwordEncoder.matches(password,"$2a$10$e9kpmbBNLdLJNRIle.9feOtN.MAN6Q90g5dvYp/eM.Yvw.leBpcNO"));
	}
	
	public static void main(String[] args) {
		encryptPw();
	}

}
