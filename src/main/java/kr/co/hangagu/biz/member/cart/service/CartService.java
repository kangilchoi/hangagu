package kr.co.hangagu.biz.member.cart.service;

import kr.co.hangagu.biz.member.car.dto.CartDto;
import kr.co.hangagu.common.dto.ResultDto;

public interface CartService {
	public ResultDto findByMemKey(CartDto dto);
	public ResultDto findByCartKey(CartDto dto);
	public ResultDto save(CartDto dto);
	public ResultDto update(CartDto dto);
}
