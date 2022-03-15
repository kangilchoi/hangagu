package kr.co.hangagu.biz.common.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.hangagu.biz.common.auth.service.JwtUserDetailsService;
import kr.co.hangagu.biz.common.auth.vo.JwtRequest;
import kr.co.hangagu.biz.common.auth.vo.JwtResponse;
import kr.co.hangagu.biz.common.auth.vo.JwtTokenUtil;
import kr.co.hangagu.biz.member.member.entity.Member;
import kr.co.hangagu.biz.member.member.service.MemberService;
import kr.co.hangagu.biz.member.member.vo.MemberVo;
import kr.co.hangagu.common.response.Response;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/auth")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;
    
    @Autowired
	MemberService memberService;

    /**
     * user login api
     * @param authenticationRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
    	//1.body에서 추출된 id,pw 인증
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        //2.유저 확인
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        //3.토큰 생성
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }
    
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    
    /**
     * 회원정보 조회
     * @param memId
     * @return
     */
    @GetMapping(value = "/existMember/{memId}")
	public Response getMemberById(@PathVariable String memId) {
    	return memberService.getMemberById(memId,'N');
	}
    
    /**
     * 이메일 인증
     * @param memMail
     * @return
     */
    @GetMapping(value = "/verifyEmail/{memMail}")
	public Response verifyEmail(@PathVariable String memMail) {
    	return userDetailsService.verifyEmail(memMail);
	}
    
    /**
     * 회원가입
     * @param memKey
     * @return
     */
    @PostMapping(value = "/signUp")
	public Response signUp(@RequestBody Member member) {
    	return userDetailsService.signUp(member);
	}
    
    /**
     * email로 id찾기 api
     * @param memMail
     * @return
     */
    @PostMapping(value = "/findIdByMail")
	public Response findIdByMail(@RequestBody Member m) {
    	return memberService.findIdByMail(m.getMemMail(),m.getMemNm(),m.getMemGrade(),'N');
	}
    
    /**
     * phone로 id찾기 api
     * @param memPhone
     * @return
     */
    @PostMapping(value = "/findIdByPhone")
	public Response findIdByPhone(@RequestBody Member m) {
    	return memberService.findIdByPhone(m.getMemPhone(),m.getMemNm(),m.getMemGrade(),'N');
	}
    
    /**
     * id,name,email로 회원 찾기 api
     * @param memMail
     * @return
     */
    @PostMapping(value = "/findMember")
	public Response findMember(@RequestBody Member m) {
    	return memberService.findMember(m.getMemId(),m.getMemMail(),m.getMemNm(),m.getMemGrade(),'N');
	}
    
    /**
     * id로 pw찾기 -> 일치여부
     * @param memId
     * @return
     */
    @GetMapping(value = "/isCorrectPwById/{memId}")
	public Response findPwById(@PathVariable String memId, String memPw) {
    	return memberService.isCorrectPwById(memId,memPw);
	}
    
    /**
     * 회원 복구
     * @param memId
     * @return
     */
    @GetMapping(value = "/rollbackMember/{memId}")
	public Response rollbackMember(@PathVariable String memId) {
    	return memberService.rollbackMember(memId,'N');
	}
    
    /**
     * id로 pw변경
     * @param memId
     * @return
     */
    @GetMapping(value = "/updatePwById/{memId}")
	public Response updatePwById(@PathVariable String memId, String memPw) {
    	return memberService.updatePwById(memId,memPw);
	}
}
