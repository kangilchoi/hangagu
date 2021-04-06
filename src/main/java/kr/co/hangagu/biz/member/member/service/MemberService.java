package kr.co.hangagu.biz.member.member.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import kr.co.hangagu.biz.vo.MemberTO;

/**
 * MemberService
 * 회원 관련 서비스
 */
public interface MemberService extends UserDetailsService {
    Integer save(MemberTO memberTO);
}
