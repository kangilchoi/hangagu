package kr.co.hangagu.biz.member.cart.repository.custom;

import java.util.List;

import kr.co.hangagu.biz.member.car.dto.CartDto;

public interface CartRepositoryCustom {
	public List<CartDto> selectCartList(CartDto dto);
	public CartDto selectCartDetail(CartDto dto);
}
