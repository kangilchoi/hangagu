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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.hangagu.biz.member.member.dao.MemberDao;
import kr.co.hangagu.biz.vo.Member;
import kr.co.hangagu.biz.vo.MemberTO;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberDao memberDao;

    //user 조회(Override : UserDetailsService)
    @Override
    public UserDetails loadUserByUsername(String account) throws UsernameNotFoundException {
        Optional<Member> memberEntityWrapper = memberDao.findByAccount(account);
        Member memberEntity = memberEntityWrapper.orElse(null);
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));
        return new User(memberEntity.getAccount(), memberEntity.getPassword(), authorities);
    }

    @Transactional
    @Override
    public Integer save(MemberTO memberTO) {
    	 Member member = memberTO.toEntity();
         member.setLastAccessDt(LocalDateTime.now());
         member.setRegDt(LocalDateTime.now());

         // 비밀번호 암호화
         BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
         member.setPassword(passwordEncoder.encode(member.getPassword()));
         return memberDao.save(member).getId();
    }
}