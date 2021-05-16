package kr.co.hangagu.biz.member.member.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.hangagu.biz.member.member.service.MemberService;
import kr.co.hangagu.biz.member.member.vo.Member;
import kr.co.hangagu.biz.member.order.service.OrderService;
import kr.co.hangagu.common.vo.ResultVo;

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
	public ResultVo findIdByMail(@PathVariable String memMail) {
    	return memberService.findIdByMail(memMail,'N');
	}
    
    /**
     * id로 pw찾기 -> 임시pw로 변경후 이메일로 임시pw 알려주기
     * @param memId
     * @return
     */
    @GetMapping(value = "/findPw/{memId}")
	public ResultVo findPwById(@PathVariable String memId) {
    	return memberService.findPwById(memId,'N');
	}
    
    /**
     * 회원 탈퇴
     * @param memId
     * @return
     */
    @GetMapping(value = "/dropMember/{memId}")
	public ResultVo dropMember(@PathVariable String memId) {
    	return memberService.dropMember(memId,'Y');
	}
    
    /**
     * 회원 복구
     * @param memId
     * @return
     */
    @GetMapping(value = "/rollbackMember/{memId}")
	public ResultVo rollbackMember(@PathVariable String memId) {
    	return memberService.rollbackMember(memId,'N');
	}
    
    /**
     * 회원정보 조회
     * @param memKey
     * @return
     */
    @GetMapping(value = "/getMember/{memKey}")
	public ResultVo getMember(@PathVariable String memKey) {
    	return memberService.getMember(memKey,'N');
	}
    
    /**
     * 회원정보 수정
     * @param memKey
     * @return
     */
    @GetMapping(value = "/updateMember")
	public ResultVo updateMember(@ModelAttribute Member member) {
    	return memberService.updateMember(member);
	}
    
    /**
     * 회원가입
     * @param memKey
     * @return
     */
    @GetMapping(value = "/signUp")
	public ResultVo signUp(@ModelAttribute Member member) {
    	return memberService.signUp(member);
	}
    
    /**
     * 마이페이지(주문내역)
     * @param memKey
     * @return
     */
    @GetMapping(value = "/myPage/{memKey}")
	public ResultVo myPage(@PathVariable String memKey) {
    	return orderService.myPage(memKey);
	}
}
