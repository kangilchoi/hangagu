package kr.co.hangagu.biz.common.auth.service;

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
import kr.co.hangagu.biz.member.member.entity.Member;
import kr.co.hangagu.biz.member.member.repository.MemberRepository;
import kr.co.hangagu.biz.member.member.vo.MemberVo;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.constants.HangaguConstant.Role;
import kr.co.hangagu.common.constants.HangaguConstant.Table;
import kr.co.hangagu.common.response.Response;
import kr.co.hangagu.common.util.MailSender;
import kr.co.hangagu.common.util.Tools;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
    private MemberDao memberDao;
	
	@Autowired
	private MailSender mailSender;
	
	@Autowired
	private MemberRepository memberRepository;
	
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
    
    //인증 메일 전송
    public Response verifyEmail(String memMail) {

    	int authCode = Tools.getAuthCode();
    	Response res = mailSender.sendAuthMail(memMail, authCode);
    	res.setData(authCode);
    	return res;
    }
    
	
	//회원가입
    @Transactional
    public Response signUp(Member member) {
    	Response res = new Response();

         // 비밀번호 암호화
         BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
         member.setMemPw(passwordEncoder.encode(member.getMemPw()));
         
         //pk설정
         Optional<String> key = (Optional<String>) memberDao.makeKey(Table.MEMBER.getValue());
         
         if(key.isPresent()) {
        	 member.setMemKey(key.get());
        	 member.setDeleteYn('N');
		     member.setMemClassCd("A");
		     member.setRegDt(LocalDateTime.now());
	         //insert
	         member = memberDao.save(member);
	         
	         res.setCode(1);
	         res.setData(member);
         }

         return res;
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