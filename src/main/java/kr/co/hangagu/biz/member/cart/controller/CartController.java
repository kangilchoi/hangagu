package kr.co.hangagu.biz.member.cart.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.hangagu.biz.member.cart.entity.CartEntity;
import kr.co.hangagu.biz.member.cart.service.CartService;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.response.Response;

/**
 * CartController
 * 장바구니(카트)관련 컨트롤러
 */
@Controller
@RequestMapping("/cart")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	/**
	 * 장바구니 정보 조회
	 * @param memKey 회원 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@GetMapping("/get/{memKey}")
	@ResponseBody
	public Response list(@PathVariable String memKey) throws Exception {
		Response cartList = cartService.selectCartList(memKey, HangaguConstant.Cart.CART, "N");
		return cartList;
	}
	
	/**
	 * 장바구니 정보 추가
	 * @param cartEntity 장바구니 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@PostMapping("/add")
	@ResponseBody
	public Response add(@RequestBody CartEntity cartEntity) throws Exception {
		Response result = cartService.insertCart(cartEntity);
		return result;
	}
	
	/**
	 * 장바구니 정보 상세 조회
	 * @param cartKey 장바구니 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@GetMapping("/detail/{cartKey}")
	@ResponseBody
	public Response detail(@PathVariable("cartKey") int cartKey) throws Exception {
		Response cartDetail = cartService.selectCartDetail(cartKey);
		return cartDetail;
	}
	
	/**
	 * 장바구니 정보 수정
	 * @param cartKey 장바구니 키
	 * @param cartEntity 수정할 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@PutMapping("/update/{cartKey}")
	@ResponseBody
	public Response update(@PathVariable("cartKey") int cartKey, @RequestBody CartEntity cartEntity) throws Exception {
		Response result = cartService.updateCart(cartKey, cartEntity);
		return result;
	}
}

