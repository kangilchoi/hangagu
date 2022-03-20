package kr.co.hangagu.biz.member.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.hangagu.biz.member.car.dto.CartDto;
import kr.co.hangagu.biz.member.cart.service.CartService;
import kr.co.hangagu.common.dto.ResultDto;

/**
 * CartController 장바구니(카트)관련 컨트롤러
 */
@Controller
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	/**
	 * 장바구니 정보 조회
	 * 
	 * @param memKey 회원 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	@RequestMapping(value="/get/{memKey}", method = RequestMethod.GET)
	@ResponseBody 
	public ResultDto list(@PathVariable("memKey") String memKey) throws Exception { 
		CartDto dto = new CartDto();
		dto.setMemKey(memKey);
		
		ResultDto resultDto = cartService.findByMemKey(dto);
		return resultDto;
	}
	  
	 
	/**
	 * 장바구니 정보 추가
	 * 
	 * @param cartEntity 장바구니 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	@PostMapping("/add")
	@ResponseBody
	public ResultDto add(@RequestBody CartDto dto) throws Exception { 
		ResultDto result = cartService.save(dto); 
		return result; 
	}
	 

	/**
	 * 장바구니 정보 상세 조회
	 * 
	 * @param cartKey 장바구니 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	@GetMapping("/detail/{cartKey}")
	@ResponseBody
	public ResultDto detail(@PathVariable("cartKey") int cartKey) throws Exception {
		CartDto dto = new CartDto();
		dto.setCartKey(cartKey);
		ResultDto resultDto = cartService.findByCartKey(dto);
		return resultDto;
	}

	/**
	 * 장바구니 정보 수정
	 * 
	 * @param cartKey    장바구니 키
	 * @param cartEntity 수정할 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	@ResponseBody 
	public ResultDto mod(CartDto dto) throws Exception { 
		ResultDto resultDto = cartService.update(dto);
		
		return resultDto;
	}
	 
}
