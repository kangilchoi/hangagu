package kr.co.hangagu.biz.member.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.hangagu.biz.member.order.dto.OrderDto;
import kr.co.hangagu.biz.member.order.service.OrderService;
import kr.co.hangagu.common.dto.ResultDto;

/**
 * OrderController 주문 관련 컨트롤러
 */
@Controller
@RequestMapping(value = "/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	/**
	 * 주문 정보 조회
	 * 
	 * @param memKey 회원 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	@RequestMapping(value="/get/{memKey}", method=RequestMethod.GET)
 	@ResponseBody 
 	public ResultDto list(@PathVariable("memKey") String memKey
 						 , @RequestParam(value="fromDt", required=false) String fromDt
 						 , @RequestParam(value="toDt", required=false) String toDt
 						 , @RequestParam(value="page", required=false, defaultValue="1") int page
 						 , @RequestParam(value="size", required=false, defaultValue="10") int size
 						 , @RequestParam(value="odStatus", required=false) String[] _odStatus) throws Exception { 
		
		OrderDto dto = new OrderDto();
		dto.setMemKey(memKey);
		dto.setFromDt(fromDt);
		dto.setToDt(toDt);
		dto.set_odStatus(_odStatus);
		
		Pageable pageable = PageRequest.of(page-1, size);
		ResultDto resultDto = orderService.findByMemKey(dto, pageable);
		return resultDto;
	}
	 

	/**
	 * 주문 정보 추가
	 * 
	 * @param orderEntity 주문 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	@PostMapping("/add")
	@ResponseBody
	public ResultDto add(OrderDto dto) throws Exception {
		ResultDto resultDto = orderService.save(dto);
		return resultDto;
	}

	/**
	 * 주문 정보 상세 조회
	 * 
	 * @param odKey 주문 키
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	@GetMapping("/detail/{odKey}")
	@ResponseBody 
	public ResultDto detail(@PathVariable("odKey") String odKey) throws Exception { 
		OrderDto dto = new OrderDto();
		dto.setOdKey(odKey);
		ResultDto resultDto = orderService.findByOdKey(dto); 
		return resultDto; 
	}
	  
	 
	
	/**
	 * 주문 정보 수정
	 * 
	 * @param orderEntity 수정할 정보
	 * @return 결과값을 JSON 형태로 반환해준다.
	 * @version 1.0
	 * @author sylim 2021.04.24
	 */
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	@ResponseBody 
	public ResultDto mod(OrderDto dto) throws Exception { 
		ResultDto resultDto = orderService.update(dto);
		
		return resultDto; 
	}
	 
}
