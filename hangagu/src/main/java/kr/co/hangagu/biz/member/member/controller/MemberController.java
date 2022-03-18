package kr.co.hangagu.biz.member.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.hangagu.biz.member.member.service.MemberService;
import kr.co.hangagu.biz.member.member.entity.Member;
import kr.co.hangagu.biz.member.order.dto.OrderDto;
import kr.co.hangagu.biz.member.order.service.OrderService;
import kr.co.hangagu.common.dto.ResultDto;
import kr.co.hangagu.common.response.Response;

/**
 * MemberController
 * 회원 관련 Rest API(GET:읽기, POST:쓰기, PUT:수정, DELETE:삭제)
 */
@Controller
@RestController
@RequestMapping("/member")
public class MemberController {
    
	@Autowired
	MemberService memberService;
	
	@Autowired
	OrderService orderService;
	
    /**
     * email로 id찾기 api
     * @param memMail
     * @return
     */
    @GetMapping(value = "/findId/{memMail}")
	public Response findIdByMail(@PathVariable String memMail) {
    	return memberService.findIdByMail(memMail,'N');
	}
    
    /**
     * id로 pw찾기 -> 일치여부
     * @param memId
     * @return
     */
    @GetMapping(value = "/isCorrectPwById/{memId}")
	public Response findPwById(@PathVariable String memId, String memPw) {
    	return memberService.isCorrectPwById(memId,memPw,'N');
	}
    
    /**
     * id로 pw변경
     * @param memId
     * @return
     */
    @GetMapping(value = "/updatePwById/{memId}")
	public Response updatePwById(@PathVariable String memId, String memPw) {
    	return memberService.updatePwById(memId,memPw,'N');
	}
    
    /**
     * 회원 탈퇴
     * @param memId
     * @return
     */
    @GetMapping(value = "/dropMember/{memKey}")
	public Response dropMember(@PathVariable String memKey) {
    	return memberService.dropMember(memKey,'Y');
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
     * 회원정보 조회
     * @param memKey
     * @return
     */
    @GetMapping(value = "/getMember/{memKey}")
	public Response getMemberByKey(@PathVariable String memKey) {
    	return memberService.getMember(memKey,'N');
	}
    
    /**
     * 회원정보 조회
     * @param memKey
     * @return
     */
    @GetMapping(value = "/getMemberById/{memId}")
	public Response getMemberById(@PathVariable String memId) {
    	return memberService.getMemberById(memId,'N');
	}
    
    /**
     * 회원정보 수정
     * @param memKey
     * @return
     */
    @GetMapping(value = "/updateMember")
	public Response updateMember(@ModelAttribute Member member) {
    	return memberService.updateMember(member);
	}
    
    /**
     * 회원가입
     * @param memKey
     * @return
     */
    @GetMapping(value = "/signUp")
	public Response signUp(@ModelAttribute Member member) {
    	return memberService.signUp(member);
	}
    
    /**
     * 마이페이지(주문내역)
     * @param memKey
     * @return
     */
    @GetMapping(value = "/verifyEmail/{memMail}")
	public Response verifyEmail(@PathVariable String memMail) {
    	return memberService.verifyEmail(memMail);
	}
    
    /**
     * 마이페이지(주문내역)
     * @param memKey
     * @return
     */
    @GetMapping(value = "/l/{memKey}")
	public ResultDto myPage(@PathVariable String memKey
							 , @RequestParam(value="page", required=false, defaultValue="1") int page
	 						 , @RequestParam(value="size", required=false, defaultValue="10") int size) {
    	OrderDto dto = new OrderDto();
    	dto.setMemKey(memKey);
    	
    	Pageable pageable = PageRequest.of(page-1, size);
    	
    	return orderService.findByMemKey(dto, pageable);
	}
}
