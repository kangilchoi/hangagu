package kr.co.hangagu.biz.common.auth.service;

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
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.member.member.dao.MemberDao;
import kr.co.hangagu.biz.member.member.vo.Member;
import kr.co.hangagu.common.constants.HangaguConstant.Role;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
    private MemberDao memberDao;
	
	//user 조회(Override : UserDetailsService)
    @Override
    public UserDetails loadUserByUsername(String memId) throws UsernameNotFoundException {
        Optional<Member> MemberWrapper = memberDao.findByMemId(memId);
        Member Member = MemberWrapper.orElse(null);
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        //role 분기
        if("ROOT".equals(memId)) authorities.add(new SimpleGrantedAuthority(Role.ADMIN.getValue())); 
        else authorities.add(new SimpleGrantedAuthority(Role.MEMBER.getValue()));
        	
        return new User(Member.getMemId(), Member.getMemPw(), authorities);
    }
    
	
	/*
	 * test case : {"username" : "user_id","password" : "user_pw"}
	 */
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        if ("user_id".equals(username)) {
//            return new User("user_id", "$2a$10$m/enYHaLsCwH2dKMUAtQp.ksGOA6lq7Fd2pnMb4L.yT4GyeAPRPyS",
//                new ArrayList<>());
//        } else {
//            throw new UsernameNotFoundException("User not found with username: " + username);
//        }
//    }
}
