package kr.co.hangagu.biz.member.order.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.hangagu.biz.member.order.entity.OrderEntity;
import kr.co.hangagu.biz.member.order.service.OrderService;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.response.Response;

/**
 * OrderController
 * 주문 관련 컨트롤러
 */
@Controller
@RequestMapping(value="/order")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	/**
	 * 주문 정보 조회
	 * @param memKey 회원 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@GetMapping("/get/{memKey}") 
	@ResponseBody // 추후 제거
	public Response list(@PathVariable String memKey) throws Exception {
		Response orderList = orderService.selectOrderList(memKey, "N", HangaguConstant.Oder.CANCEL);
		return orderList;
	}
	
	/**
	 * 주문 정보 추가
	 * @param orderEntity 주문 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@PostMapping("/add") 
	@ResponseBody
	public Response add(@RequestBody OrderEntity orderEntity) throws Exception {
		Response result = orderService.insertOrder(orderEntity);
		return result;
	}
	
	/**
	 * 주문 정보 상세 조회
	 * @param odKey 주문 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@GetMapping("/detail/{odKey}")
	@ResponseBody
	public Response detail(@PathVariable("odKey") String odKey) throws Exception {
		Response orderDetail = orderService.selectOrderDetail(odKey);
		return orderDetail;
	}
	
	/**
	 * 주문 정보 수정
	 * @param orderEntity 수정할 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim
	 * 2021.04.24
	 */
	@PutMapping(value="/update")
	@ResponseBody
	public Response mod(@RequestBody OrderEntity orderEntity) throws Exception {
		Response result = orderService.updateOrder(orderEntity);
		return result;
	}
}
