package kr.co.hangagu.biz.member.interestProduct.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.common.mysql.repository.HangaguFunctionRepository;
import kr.co.hangagu.biz.member.interestProduct.dto.InterestProductDto;
import kr.co.hangagu.biz.member.interestProduct.entity.InterestProductEntity;
import kr.co.hangagu.biz.member.interestProduct.repository.InterestProductRepository;
import kr.co.hangagu.biz.member.interestProduct.service.InterestProductService;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.constants.PrimaryKeyType;
import kr.co.hangagu.common.dto.ResultDto;
import kr.co.hangagu.common.util.UpdateUtils;

@Service
public class InterestProductServiceImpl implements InterestProductService {

	@Autowired
	private InterestProductRepository interestProductRepository;
	
	@Autowired
	private HangaguFunctionRepository functionRepository;
	
	@Override
	public ResultDto findByMemKey(InterestProductDto dto, Pageable pageable) {
		ResultDto resultDto = new ResultDto();
		
		Page<InterestProductDto> result = interestProductRepository.selectInterestProductList(dto, pageable);
		resultDto.setData(result);
		
		return resultDto;
	}
	
	@Override
	public ResultDto findByInterestPmKey(InterestProductDto dto) {
		ResultDto resultDto = new ResultDto();
		
		InterestProductEntity interestProductDto = interestProductRepository.selectInterestProductDetail(dto);
		
		resultDto.setData(interestProductDto);
		
		return resultDto;
	}
	
	@Override
	public ResultDto save(InterestProductDto dto) {
		ResultDto resultDto = new ResultDto();
		
		LocalDateTime now = LocalDateTime.now();
		
		InterestProductEntity ipd = new InterestProductEntity();
		ipd.setInterestPmKey(functionRepository.makeKeyFunction(PrimaryKeyType.INTEREST_PM_KEY.getValue().toString()));
		ipd.setPmKey(dto.getPmKey());
		ipd.setMemKey(dto.getMemKey());
		ipd.setRegDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		
		InterestProductEntity newInterestProduct = interestProductRepository.save(ipd);
		
		if(newInterestProduct == null) {
			resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
			resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString()); 
		} else { 
			resultDto.setData(newInterestProduct); 
			resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString());
		}
		
		return resultDto;
	}
	
	@Override
	public ResultDto update(InterestProductDto dto) {
		ResultDto resultDto = new ResultDto();
		
		List<InterestProductEntity> arr = new ArrayList<InterestProductEntity>();
		
		LocalDateTime now = LocalDateTime.now();
		
		for(int i = 0; i < dto.getInterestProductDtoList().size(); i++) {
			InterestProductEntity ipd = new InterestProductEntity();
			
			ipd.setInterestPmKey(dto.getInterestProductDtoList().get(i).getInterestPmKey());
			ipd.setDeleteYn(dto.getInterestProductDtoList().get(i).getDeleteYn());
			ipd.setModDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
			
			InterestProductDto ipdto = new InterestProductDto();
			ipdto.setInterestPmKey(dto.getInterestProductDtoList().get(i).getInterestPmKey());
			
			InterestProductEntity eipd = interestProductRepository.selectInterestProductDetail(ipdto);
			UpdateUtils.copyNonNullProperties(ipd, eipd);
			
			arr.add(eipd);
		}
		
		List<InterestProductEntity> newInterestProduct = interestProductRepository.saveAll(arr);
		
		if(newInterestProduct.size() == 0) {
			resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
			resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString());
		}else {
			resultDto.setData(newInterestProduct); 
			resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString());
		}
		
		return resultDto;
	}
	
}
