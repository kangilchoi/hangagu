package kr.co.hangagu.encrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcrpytUnit {

	@Autowired
	static
	BCryptPasswordEncoder passwordEncoder;

	public static void encryptPw() {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String password ="1111";
		String encryptPassword = passwordEncoder.encode(password);
		System.out.println(encryptPassword);
	}
	
	public static void main(String[] args) {
		encryptPw();
	}

}
