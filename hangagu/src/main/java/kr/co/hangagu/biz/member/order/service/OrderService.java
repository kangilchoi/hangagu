package kr.co.hangagu.biz.member.order.service;

import org.springframework.data.domain.Pageable;

import kr.co.hangagu.biz.member.order.dto.OrderDto;
import kr.co.hangagu.common.dto.ResultDto;
import kr.co.hangagu.common.response.Response;

public interface OrderService {
	public ResultDto findByMemKey(OrderDto dto, Pageable pageable);
	public ResultDto findByOdKey(OrderDto dto);
	public ResultDto save(OrderDto dto);
	public ResultDto update(OrderDto dto);
	public Response myPage(String memId);
}
