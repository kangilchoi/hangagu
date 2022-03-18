package kr.co.hangagu.biz.member.order.repository.custom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import kr.co.hangagu.biz.member.order.dto.OrderDto;
import kr.co.hangagu.biz.member.order.entity.OrderEntity;

public interface OrderRepositoryCustom {
	public Page<OrderDto> selectOrderList(OrderDto dto, Pageable pageable);
	
	public OrderEntity selectOrderDetail(OrderDto dto);
}
