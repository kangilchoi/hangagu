package kr.co.hangagu.biz.member.member.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import kr.co.hangagu.biz.member.member.dao.MemberDao;
import kr.co.hangagu.biz.member.member.vo.Member;
import kr.co.hangagu.biz.member.order.dao.OrderDao;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.constants.HangaguConstant.Role;
import kr.co.hangagu.common.constants.HangaguConstant.Table;
import kr.co.hangagu.common.response.Response;

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
        Optional<Member> MemberWrapper = memberDao.findByMemId(memId);
        Member Member = MemberWrapper.orElse(null);
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        //role 분기
        if("ROOT".equals(memId)) authorities.add(new SimpleGrantedAuthority(Role.ADMIN.getValue())); 
        else authorities.add(new SimpleGrantedAuthority(Role.MEMBER.getValue()));
        	
        return new User(Member.getMemId(), Member.getMemPw(), authorities);
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
         
	         //insert
	         member = memberDao.save(member);
	         
	         res.setCode(1);
	         res.setData(member);
         }

         return res;
    }
    
    //email로 ID찾기 -> email로 id전송
    public Response findIdByMail(String memMail,char DeleteYn) {
    	Response res = new Response();
    	
    	//조회
    	List<Member> list = memberDao.findByMemMailAndDeleteYn(memMail,DeleteYn);
    	
    	//result
    	if(list.size() > 0) {
    		List<String> ids = new ArrayList<String>();
        	for (Member e : list) {
        		ids.add(e.getMemId());
    		}
        	
        	res.setCode(Code.SUCCESS.getKey());
        	res.setData(ids);
    	}
    	

    	//email 발송
    	return res;
    }
    
    //pw찾기
    public Response findPwById(String memId,char DeleteYn) {
    	String tempPw = "1234";
    	Response res = new Response();
    	
    	
    	//1. id로 멤버 조회
    	Optional<Member> memberWrapper = memberDao.findByMemIdAndDeleteYn(memId,DeleteYn);
    	
    	//2. pw 임시변경
    	if(memberWrapper.isPresent()) {
    		int result;
    		Member member = memberWrapper.get();
    		
    		//암호화 & 변경
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    		member.setMemPw(passwordEncoder.encode(tempPw));
    		member = memberDao.save(member);
        	result = passwordEncoder.matches(tempPw, member.getMemPw()) ? Code.SUCCESS.getKey() : Code.FAIL.getKey();
        	res.setCode(result);

        	//3. email로 임시(변경된)pw 전송 
        	if(result == Code.SUCCESS.getKey()) {
        		
        	}
    	}else {
    		res.setMessage("Not found member");	//못찾은경우
    	}
    	
    	return res;
    }
    
    //회원 탈퇴
    public Response dropMember(String memId,char DeleteYn) {
    	Response res = new Response();
    	
    	//1.조회
    	Optional<Member> memberWrapper = memberDao.findByMemIdAndDeleteYn(memId,'N');
    	
    	if(memberWrapper.isPresent()) {
    		int result;
    		Member member = memberWrapper.get();

    		//2.변경
    		member.setDeleteYn(DeleteYn);
    		member = memberDao.save(member);
    		result = Character.compare(DeleteYn, member.getDeleteYn())==0 ? Code.SUCCESS.getKey() : Code.FAIL.getKey();
    		res.setCode(result);
    	}
    	return res;
    }
    
    //회원 복구
    public Response rollbackMember(String memId,char DeleteYn) {
    	Response res = new Response();
    	
    	//1.조회
    	Optional<Member> memberWrapper = memberDao.findByMemIdAndDeleteYn(memId,'Y');
    	
    	if(memberWrapper.isPresent()) {
    		int result;
    		Member member = memberWrapper.get();

    		//2.변경
    		member.setDeleteYn(DeleteYn);
    		member = memberDao.save(member);
    		result = Character.compare(DeleteYn, member.getDeleteYn())==0 ? Code.SUCCESS.getKey() : Code.FAIL.getKey();
    		res.setCode(result);
    	}
    	return res;
    }
    
    //회원정보 조회
	public Response getMember(String memKey, char deleteN) {
		Response res = new Response();
		
		//조회
		Optional<Member> memberWrapper = memberDao.findByMemKeyAndDeleteYn(memKey,deleteN);

		if(memberWrapper.isPresent()) {
			int result;
			Member member = memberWrapper.get();
			res.setData(member);
		}

    	return res;
	}
	
	//회원정보 수정
	public Response updateMember(Member member) {
		Response res = new Response();
		
		//1.조회
		Optional<Member> memberWrapper = memberDao.findByMemKeyAndDeleteYn(member.getMemKey(),'N');

		if(memberWrapper.isPresent()) {
			//2.update
			member = memberDao.save(member);
			res.setCode(1);
			res.setData(member);
		}

    	return res;
	}
	
}