package kr.co.hangagu.biz.member.member.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.hangagu.biz.member.member.dao.MemberDao;
import kr.co.hangagu.biz.member.member.entitiy.MemberEntity;
import kr.co.hangagu.biz.member.member.vo.Member;
import kr.co.hangagu.common.constants.Role;

/**
 * MemberService
 * 회원 관련 서비스
 */
@Service
public class MemberService implements UserDetailsService {

    @Autowired
    private MemberDao memberDao;

    //user 조회(Override : UserDetailsService)
    @Override
    public UserDetails loadUserByUsername(String memId) throws UsernameNotFoundException {
        Optional<MemberEntity> memberEntityWrapper = memberDao.findByMemId(memId);
        MemberEntity memberEntity = memberEntityWrapper.orElse(null);
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        //role 분기
        if("ROOT".equals(memId)) authorities.add(new SimpleGrantedAuthority(Role.ADMIN.getValue())); 
        else authorities.add(new SimpleGrantedAuthority(Role.MEMBER.getValue()));
        	
        return new User(memberEntity.getMemId(), memberEntity.getMemPw(), authorities);
    }
/*
    @Transactional
    public Integer save(Member member) {
    	 MemberEntity memberEntity = new MemberEntity();
         member.setLastAccessDt(LocalDateTime.now());
         member.setRegDt(LocalDateTime.now());

         // 비밀번호 암호화
         BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
         member.setPassword(passwordEncoder.encode(member.getPassword()));
         return memberDao.save(memberEntity).getId();
    }
*/
}