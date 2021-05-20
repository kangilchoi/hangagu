package kr.co.hangagu.biz.member.interestProduct.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.hangagu.biz.member.interestProduct.entity.InterestProductEntity;
import kr.co.hangagu.biz.member.interestProduct.service.InterestProductService;
import kr.co.hangagu.common.response.Response;

/**
 * InterestProductController
 * 관심제품 관련 컨트롤러
 */
@Controller
@RequestMapping("/interestProduct")
public class InterestProductController {
	
	@Autowired
	private InterestProductService interestProductService;
	
	/**
	 * 관심제품 정보 조회
	 * @param memKey 회원 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@GetMapping("/get/{memKey}")
	@ResponseBody
	public Response list(@PathVariable String memKey) throws Exception {
		Response interestProductList = interestProductService.selectInterestProductList(memKey, "N");
		return interestProductList;
	}
	
	/**
	 * 관심제품 정보 추가
	 * @param interestProductEntity 관심제품 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@PostMapping("/add")
	@ResponseBody
	public Response add(@RequestBody InterestProductEntity interestProductEntity) throws Exception {
		Response result = interestProductService.insertInterestProduct(interestProductEntity);
		return result;
	}
	
	/**
	 * 관심제품 정보 상세 조회
	 * @param interestPmKey 관심제품 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@GetMapping("/detail/{interestPmKey}")
	@ResponseBody
	public Response detail(@PathVariable("interestPmKey") String interestPmKey) throws Exception {
		Response interestProductDetail = interestProductService.selectInterestProductDetail(interestPmKey);
		return interestProductDetail;
	}
	
	/**
	 * 관심제품 정보 수정
	 * @param interestPmKey 관심제품 키
	 * @param InterestProductEntity 수정할 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@PutMapping("/update/{interestPmKey}")
	@ResponseBody
	public Response update(@PathVariable("interestPmKey") String interestPmKey, @RequestBody InterestProductEntity interestProductEntity) throws Exception {
		Response result = interestProductService.updateInterestProduct(interestPmKey, interestProductEntity);
		return result;
	}
}
