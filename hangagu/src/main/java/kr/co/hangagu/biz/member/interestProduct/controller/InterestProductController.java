package kr.co.hangagu.biz.member.interestProduct.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.hangagu.biz.member.interestProduct.dto.InterestProductDto;
import kr.co.hangagu.biz.member.interestProduct.service.InterestProductService;
import kr.co.hangagu.common.dto.ResultDto;

/**
 * InterestProductController 관심제품 관련 컨트롤러
 */
@Controller
@RequestMapping("/interestProduct")
public class InterestProductController {

	@Autowired
	private InterestProductService interestProductService;

	/**
	 * 관심제품 정보 조회
	 * 
	 * @param memKey 회원 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	@RequestMapping(value="/get/{memKey}", method=RequestMethod.GET)
	@ResponseBody
	public ResultDto list(@PathVariable("memKey") String memKey,
						@RequestParam(value = "page", required = false, defaultValue = "1") int page,
						@RequestParam(value = "size", required = false, defaultValue = "10") int size) throws Exception {

		InterestProductDto dto = new InterestProductDto();
		dto.setMemKey(memKey);

		Pageable pageable = PageRequest.of(page - 1, size);
		ResultDto resultDto = interestProductService.findByMemKey(dto, pageable);
		return resultDto;
	}
	

	/**
	 * 관심제품 정보 추가
	 * 
	 * @param interestProductEntity 관심제품 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	@PostMapping("/add")
	@ResponseBody 
	public ResultDto add(InterestProductDto dto) throws Exception { 
		ResultDto resultDto = interestProductService.save(dto); 
		return resultDto; 
	}
	  
	 
	
	/**
	 * 관심제품 정보 상세 조회
	 * 
	 * @param interestPmKey 관심제품 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	@GetMapping("/detail/{interestPmKey}")
	@ResponseBody 
	public ResultDto detail(@PathVariable("interestPmKey") String interestPmKey) throws Exception { 
		InterestProductDto dto = new InterestProductDto();
		dto.setInterestPmKey(interestPmKey);
		ResultDto resultDto = interestProductService.findByInterestPmKey(dto);
		
		return resultDto;
	}
	  
	 /**
	 * 관심제품 정보 수정
	 * 
	 * @param interestPmKey         관심제품 키
	 * @param InterestProductEntity 수정할 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	@ResponseBody 
	public ResultDto update(@RequestBody InterestProductDto dto) throws Exception { 
		ResultDto result = interestProductService.update(dto); 
		return result; 
	}
	 
	
	 
}
