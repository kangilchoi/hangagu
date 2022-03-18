package kr.co.hangagu.biz.member.cart.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.member.car.dto.CartDto;
import kr.co.hangagu.biz.member.cart.entity.CartEntity;
import kr.co.hangagu.biz.member.cart.repository.CartRepository;
import kr.co.hangagu.biz.member.cart.service.CartService;
import kr.co.hangagu.biz.member.interestProduct.dto.InterestProductDto;
import kr.co.hangagu.biz.member.interestProduct.service.InterestProductService;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.dto.ResultDto;
import kr.co.hangagu.common.util.UpdateUtils;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private InterestProductService interestProductService;
	
	
	@Override
	public ResultDto findByMemKey(CartDto dto) {
		ResultDto resultDto = new ResultDto();
		
		List<CartDto> result = cartRepository.selectCartList(dto);
		resultDto.setData(result);
		
		return resultDto;
	}
	
	@Override
	public ResultDto findByCartKey(CartDto dto) {
		ResultDto resultDto = new ResultDto();
		
		CartDto cartDto = cartRepository.selectCartDetail(dto);
		
		resultDto.setData(cartDto);
		
		return resultDto;
	}
	
	@Override
	@Transactional
	public ResultDto save(CartDto dto) {
		ResultDto resultDto = new ResultDto();
		
		List<CartEntity> arr = new ArrayList<CartEntity>();
		
		LocalDateTime now = LocalDateTime.now();
		
		for(int i = 0; i < dto.getCartDtoList().size(); i++) {
			CartEntity crt = new CartEntity();
			
			crt.setMemKey(dto.getCartDtoList().get(i).getMemKey());
			crt.setPmKey(dto.getCartDtoList().get(i).getPmKey());
			crt.setPmSelectedColor(dto.getCartDtoList().get(i).getPmSelectedColor());
			crt.setRegDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
			
			arr.add(crt);
		}
		
		List<CartEntity> newCart = cartRepository.saveAll(arr);
		
		
		if(newCart.size() == 0) {
			resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
			resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString()); 
		} else {
		 
			if(dto.getInterestProductDtoList() != null) {
				
				InterestProductDto ipDto = new InterestProductDto();
				ipDto.setInterestProductDtoList(dto.getInterestProductDtoList());
				
				ResultDto ipResultDto = interestProductService.update(ipDto);
				
				if(!ipResultDto.getData().equals(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString())) {
					resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
					resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString());
				} else {
					resultDto.setData(newCart); 
					resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString());
				}
			} else {
				resultDto.setData(newCart); 
				resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString());
			}
			
			
		} 
		
		return resultDto;
	}
	
	@Override
	public ResultDto update(CartDto dto) {
		ResultDto resultDto = new ResultDto();
		
		CartEntity cartEntity = new CartEntity();
		
		cartEntity.setCartKey(dto.getCartKey());
		cartEntity.setPmSelectedColor(dto.getPmSelectedColor());
		cartEntity.setPmQuantity(dto.getPmQuantity());
		cartEntity.setDeleteYn(dto.getDeleteYn());
		
		cartEntity.setModDt(String.valueOf(LocalDate.now()));
		
		CartDto cDto = new CartDto();
		cDto.setCartKey(dto.getCartKey());
		
		CartDto existing = cartRepository.selectCartDetail(cDto);
		CartEntity ecrt = new CartEntity();
		BeanUtils.copyProperties(existing, ecrt);
		UpdateUtils.copyNonNullProperties(cartEntity, ecrt);
		
		CartEntity updateCart = cartRepository.save(ecrt);
		
		if(updateCart == null) {
			resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
			resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString());
		} else {
			resultDto.setData(updateCart); 
			resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString());
		}
		
		return resultDto;
	}
	
	
	
}
