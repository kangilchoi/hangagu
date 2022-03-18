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
import kr.co.hangagu.biz.member.member.entity.Member;
import kr.co.hangagu.biz.member.member.repository.MemberRepository;
import kr.co.hangagu.biz.member.member.vo.MemberVo;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.response.Response;

/**
 * MemberService
 * 회원 관련 서비스
 */
@Service
public class MemberService {

    @Autowired
    private MemberDao memberDao;
    
    @Autowired
    private MemberRepository memberRepository;
    
    
    //회원등급 조회 by id
  	public Response getGradeInfo(String memId) {
  		Response res = new Response();
  		
  		//조회
  		MemberVo m = memberRepository.getGradeInfo(memId);
  		
  		
  		if(m!=null) {
  				res.setCode(Code.SUCCESS.getKey());
  				res.setData(m);
  		}else {
  			res.setCode(Code.NONE.getKey());
  		}

      	return res;
  	}
  	
  	//회원정보 조회
  	public Response getMemberById(String memId, char deleteN) {
  		Response res = new Response();
  		
  		//조회
  		MemberVo m = memberRepository.getMemberById(memId);
  		
  		if(m!=null) {
  				res.setCode(Code.SUCCESS.getKey());
  				res.setData(m);
  		}else {
  			res.setCode(Code.NONE.getKey());
  		}

      	return res;
  	}
  	
  	
  	//회원정보 수정
  	public Response updateMember(MemberVo member) {
  		Response res = new Response();
  		
  		member.setModDt(LocalDateTime.now());
  		int cnt = memberRepository.updateMember(member);
  		
  		if(cnt>0) {
  			res.setCode(Code.SUCCESS.getKey());
  		}else if(cnt==0) {
  			res.setCode(Code.NONE.getKey());
  		}else {
  			res.setCode(Code.FAIL.getKey());
  		}
  		
  		return res;
  	}
  	
  	//pw 일치여부
    public Response isCorrectPwById(String memId, String memPw) {
    	Response res = new Response();
    	
    	
    	//1. id로 멤버 조회
  		MemberVo m = memberRepository.getMemberById(memId);
    	
    	//2. pw 일치여부
    	if(null!=m) {
    		int result;
    		
    		//암호화 & 변경
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        	result = passwordEncoder.matches(memPw, m.getMemPw()) ? Code.SUCCESS.getKey() : Code.FAIL.getKey();
        	res.setCode(result);

    	}else {
    		res.setCode(Code.NONE.getKey());
    	}
    	
    	return res;
    }
    
    //pw 변경
    public Response updatePwById(String memId, String memPw) {
    	Response res = new Response();
    	
    	//1. id로 멤버 조회
  		MemberVo m = memberRepository.getMemberById(memId);
    	
    	if(null!=m) {
    		int result;
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encryptPw = passwordEncoder.encode(memPw);

            //2. pw 일치여부
            if(passwordEncoder.matches(memPw, m.getMemPw())) {
            	result = Code.FAIL.getKey();
            	res.setMessage("pw가 일치합니다.");
            	return res;
            }
            
            //3.update
            m.setMemPw(encryptPw);
        	m.setModDt(LocalDateTime.now());
        	int updateRes = memberRepository.updatePwById(m);
        	if(updateRes<1) {
        		result = Code.FAIL.getKey();
            	res.setMessage("pw 변경 실패");
        	}
        	
        	res.setCode(Code.SUCCESS.getKey());
    	}else {
    		res.setCode(Code.FAIL.getKey());
    		res.setMessage("Not found member");	//못찾은경우
    	}
    	
    	return res;
    }
    
    //회원 탈퇴
    public Response dropMember(String memId) {
    	Response res = new Response();
    	LocalDateTime modDt = LocalDateTime.now();
    	int updateRes = memberRepository.dropMember(memId,modDt);
    	
    	if(updateRes>0) {
    		//2.변경
    		res.setCode(Code.SUCCESS.getKey());
    	}else {
    		res.setCode(Code.FAIL.getKey());
    	}
    	return res;
    }
    
    //email로 ID찾기
    public Response findIdByMail(String memMail, String memNm, String memGrade, char deleteYn) {
    	Response res = new Response();
    	
    	//조회
    	List<Member> list = memberDao.findByMemMailAndMemNmAndMemGradeAndDeleteYn(memMail,memNm,memGrade,deleteYn);
    	
    	//result
    	if(list.size() > 0) {
        	
        	res.setCode(Code.SUCCESS.getKey());
        	res.setData(list);
    	}
    	

    	//email 발송
    	return res;
    }
    
    //phone로 ID찾기 -> email로 id전송
    public Response findIdByPhone(String memPhone,String memNm, String memGrade, char deleteYn) {
    	Response res = new Response();
    	
    	//조회
    	List<Member> list = memberDao.findByMemPhoneAndMemNmAndMemGradeAndDeleteYn(memPhone,memNm,memGrade,deleteYn);
    	
    	//result
    	if(list.size() > 0) {
        	
        	res.setCode(Code.SUCCESS.getKey());
        	res.setData(list);
    	}
    	

    	//email 발송
    	return res;
    }
    
    //id,email,name,grade 로 회원찾기
    public Response findMember(String memId,String memMail, String memNm, String memGrade, char deleteYn) {
    	Response res = new Response();
    	
    	//조회
    	Optional<Member> memberWrapper = memberDao.findByMemIdAndMemMailAndMemNmAndMemGradeAndDeleteYn(memId,memMail,memNm,memGrade,deleteYn);
    	
    	//result
    	if(memberWrapper.isPresent()) {
    		Member member = memberWrapper.get();
        	res.setCode(Code.SUCCESS.getKey());
        	res.setData(member.getMemMail());
    	}else {
    		res.setCode(Code.NONE.getKey());
    	}
    	

    	//email 발송
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
    		member.setModDt(LocalDateTime.now());
    		member = memberDao.save(member);
    		result = Character.compare(DeleteYn, member.getDeleteYn())==0 ? Code.SUCCESS.getKey() : Code.FAIL.getKey();
    		res.setCode(result);
    	}else {
			res.setCode(Code.FAIL.getKey());
    		res.setMessage("Not found member");	//못찾은경우
		}
    	return res;
    }
    
    //pw 일치여부
    public Response isCorrectPwById(String memId, String memPw, char DeleteYn) {
    	Response res = new Response();
    	
    	
    	//1. id로 멤버 조회
    	Optional<Member> memberWrapper = memberDao.findByMemIdAndDeleteYn(memId,DeleteYn);
    	
    	//2. pw 일치여부
    	if(memberWrapper.isPresent()) {
    		int result;
    		Member member = memberWrapper.get();
    		
    		//암호화 & 변경
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        	result = passwordEncoder.matches(memPw, member.getMemPw()) ? Code.SUCCESS.getKey() : Code.FAIL.getKey();
        	res.setCode(result);

    	}else {
    		res.setCode(Code.FAIL.getKey());
    		res.setMessage("Not found member");	//못찾은경우
    	}
    	
    	return res;
    }
    
}