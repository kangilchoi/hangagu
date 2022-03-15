package kr.co.hangagu.biz.member.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.hangagu.biz.common.auth.service.JwtUserDetailsService;
import kr.co.hangagu.biz.member.member.entity.Member;
import kr.co.hangagu.biz.member.member.service.MemberService;
import kr.co.hangagu.biz.member.member.vo.MemberVo;
import kr.co.hangagu.biz.member.order.service.OrderService;
import kr.co.hangagu.biz.member.product.dto.ProductDto;
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
     * 회원등급 조회 by id
     * @param memId
     * @return
     */
    @GetMapping(value = "/getGradeInfo/{memId}")
	public Response getGradeInfo(@PathVariable String memId) {
    	return memberService.getGradeInfo(memId);
	}
    
    /**
     * 마이페이지(주문내역)
     * @param memId
     * @return
     */
    @GetMapping(value = "/myPage/{memId}")
	public Response myPage(@PathVariable String memId) {
    	return orderService.myPage(memId);
	}
    
    /**
     * 회원정보 조회
     * @param memId
     * @return
     */
    @GetMapping(value = "/getMember/{memId}")
	public Response getMemberById(@PathVariable String memId) {
    	return memberService.getMemberById(memId,'N');
	}
    
    /**
     * 회원정보 수정
     * @param memKey
     * @return
     */
    @GetMapping(value = "/updateMember")
	public Response updateMember(@ModelAttribute MemberVo member) {
    	return memberService.updateMember(member);
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
    
    /**
     * 회원 탈퇴
     * @param memId
     * @return
     */
    @GetMapping(value = "/dropMember/{memId}")
	public Response dropMember(@PathVariable String memId) {
    	return memberService.dropMember(memId);
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
    
	//=================================================================
	
    
    
}
