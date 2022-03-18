package kr.co.hangagu.biz.member.interestProduct.repository.custom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import kr.co.hangagu.biz.member.interestProduct.dto.InterestProductDto;
import kr.co.hangagu.biz.member.interestProduct.entity.InterestProductEntity;

public interface InterestProductRepositoryCustom {
	public Page<InterestProductDto> selectInterestProductList(InterestProductDto dto, Pageable pageable);
	
	public InterestProductEntity selectInterestProductDetail(InterestProductDto dto);
}
