package kr.co.hangagu.common.constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class HangaguConstant {
    @Autowired
    public HangaguProps PROPS;

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


}
