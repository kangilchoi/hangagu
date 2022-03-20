package kr.co.hangagu.biz.member.addr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.hangagu.biz.member.addr.dto.AddrDto;
import kr.co.hangagu.biz.member.addr.service.AddrService;
import kr.co.hangagu.common.dto.ResultDto;

/**
 * AddrController 배송 주소록 관련 컨트롤러s
 */
@Controller
@RequestMapping("/addr")
public class AddrController {

	@Autowired
	private AddrService addrService;

	/**
	 * 배송 주소록 정보 조회
	 * 
	 * @param memKey 회원 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */

	@RequestMapping(value = "/get/{memKey}", method = RequestMethod.GET)
	@ResponseBody
	public ResultDto list(@PathVariable("memKey") String memKey) throws Exception {
		AddrDto dto = new AddrDto();
		dto.setMemKey(memKey);

		ResultDto resultDto = addrService.findByMemKey(dto);
		return resultDto;
	}
	

	/**
	 * 배송 주소록 정보 추가
	 * 
	 * @param dto 주소록 정보. 저장/수정 동시 기능
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	  
	@PostMapping("/save")
	@ResponseBody 
	public ResultDto add(AddrDto dto) throws Exception { 
		ResultDto result = addrService.save(dto); 
		return result; 
	}
	 
	
	/**
	* 배송 주소록 정보 상세 조회
	* 
	* @param addrKey 배송 주소록 키
	* @return 결과값을 JSON 형태로 반환해준다.
	* @version 1.0
	* @author sylim 2021.04.24
	*/
	
	  
	@GetMapping("/detail/{addrKey}")
	@ResponseBody 
	public ResultDto detail(@PathVariable("addrKey") String addrKey) throws Exception { 
		AddrDto dto = new AddrDto(); 
		dto.setAddrKey(addrKey);
		
		ResultDto resultDto = addrService.findByAddrKey(dto); 
		
		return resultDto; 
	}
	  
	 
	/**
	 * 배송 주소록 정보 삭제
	 * 
	 * @param addrKey 배송 주소록 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	  
	@PostMapping("/delete")
	@ResponseBody 
	public ResultDto delete(AddrDto dto) throws Exception { 
		ResultDto result = addrService.delete(dto); 
		return result; 
	}
}
