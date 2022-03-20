package kr.co.hangagu.biz.member.interestProduct.service;

import org.springframework.data.domain.Pageable;

import kr.co.hangagu.biz.member.interestProduct.dto.InterestProductDto;
import kr.co.hangagu.common.dto.ResultDto;

public interface InterestProductService {
	public ResultDto findByMemKey(InterestProductDto dto, Pageable pageable);
	public ResultDto findByInterestPmKey(InterestProductDto dto);
	public ResultDto save(InterestProductDto dto);
	public ResultDto update(InterestProductDto dto);
}
