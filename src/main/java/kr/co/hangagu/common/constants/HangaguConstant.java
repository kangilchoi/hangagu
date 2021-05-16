package kr.co.hangagu.common.constants;

import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
}
