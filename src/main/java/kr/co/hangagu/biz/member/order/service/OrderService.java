package kr.co.hangagu.biz.member.order.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.member.order.dao.OrderDao;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.response.Response;

/**
 * OrderService
 * 주문 관련 서비스
 */
@Service
public class OrderService {
	@Autowired
    private OrderDao orderDao;
	
	//마이페이지 주문 내역
	public Response myPage(String memKey) {
		Response res = new Response();
		
		Optional<Object> o = orderDao.myPage(memKey);
		
		if(o.isPresent()) {
			res.setCode(Code.SUCCESS.getKey());
			res.setData(o.get());
		}
		
		return res;
	}
}
