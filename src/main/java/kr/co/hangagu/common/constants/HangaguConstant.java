package kr.co.hangagu.common.constants;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

@Component
public class HangaguConstant {
    @Autowired
    public HangaguProps PROPS;
    
    public static DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Component
    public class HangaguProps {

        /**
         * 현재 ACTIVE PROFILE
         */
        @Value("${spring.profiles.active}")
        public String ACTIVE_PROFILE;

        /**
         * 로그인 관련 설정 세팅
         */
    }


    //Spring Security 권한
    public enum Role {
        ADMIN("ROLE_ADMIN"),
        MEMBER("ROLE_MEMBER");

    	private final String value;
    	
    	Role(String value) {
    		this.value=value;
    	}

    	public String getValue() {
    		return value;
    	}
    	
    }
    
    //Json result val
    public enum Code {
        SUCCESS(1,"SUCCESS"),
        NONE(0,"NO DATA"),
        FAIL(-1,"FAIL");

    	private final int key;
    	private final String value;
    	
    	Code(int c,String m) {
    		this.key=c;
    		this.value=m;
    	}

    	public int getKey() {
    		return this.key;
    	}
    	
    	public String getValue() {
    		return this.value;
    	}
    }

	public enum ResponseEnum {
		SUCCESS("1", "SUCCESS"),
		FAILURE("0", "FAIL"),

		NOT_EXIST_RESPONSE("9999", "NOT_FOUNT");

		private String code;
		private String desc;

		ResponseEnum(String code, String desc) {
			this.code = code;
			this.desc = desc;
		}
		public String getCode() {
			return code;
		}

		public String getDesc() {
			return desc;
		}

		public static String findDescByCode(String code) {
			return Arrays.stream(values()).
					filter(responseEnum -> responseEnum.getCode().equals(code)).findAny().orElse(NOT_EXIST_RESPONSE).getDesc();
		}
	}


    //테이블
    public enum Table {
    	MEMBER("MK"),
    	ORDER("OD");
    	
    	private final String value;
    	
    	Table(String t){
    		this.value=t;
    	}
    	
    	public String getValue() {
    		return value;
    	}
    }
    
    //주문 상태
    public enum Oder {
    	READY("READY"),
    	IN_DELIVERY("IN_DELIVERY"),
    	COMPLETE("COMPLETE"),
    	CANCEL("CANCEL"),
    	EXCHANGE("EXCHANGE"),
    	RETURN("RETURN");
    	;
    	
    	private final String value;
    	
    	Oder(String t){
    		this.value=t;
    	}
    	
    	public String getValue() {
    		return value;
    	}
    }
    
    public enum Cart {
    	ORDER("ORDER")
    	, CART("CART")
    	;
    	
    	private String value;
    	
    	private Cart(String value) {
    		this.value = value;
    	}
    	
    	public String getValue() {
    		return this.value;
    	}
    }

    public enum Sql {
    	makeKey("SELECT .make_key(?)"),
		PASSWORD("SELECT PASSWORD(?)");

    	private String value;

    	private Sql(String value) {
    		this.value = value;
    	}

    	public String getValue() {
    		return this.value;
		}
	}

	public enum Seq {
    	PRODUCT_KEY("PM"),
		BOARD_KEY("BK"),
		FILE_KEY("FK");

    	private String value;

    	private Seq(String value) {
			this.value = value;
		}

		public String getValue() {
			return this.value;
		}
	}

    public static String HANGAGU_EMAIL = "hangaguroot";
    public static String HANGAGU_EMAIL_PW = "fbjcibkpggteapaq";

	public static String FTP_TEMP = "/home/hangagu/temp";
    public static String FTP_PATH = "/home/hangagu/file";
}
