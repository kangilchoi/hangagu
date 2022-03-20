package kr.co.hangagu.biz.member.addr.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.common.mysql.repository.HangaguFunctionRepository;
import kr.co.hangagu.biz.member.addr.dto.AddrDto;
import kr.co.hangagu.biz.member.addr.entity.AddrEntity;
import kr.co.hangagu.biz.member.addr.repository.AddrRepository;
import kr.co.hangagu.biz.member.addr.service.AddrService;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.constants.PrimaryKeyType;
import kr.co.hangagu.common.dto.ResultDto;
import kr.co.hangagu.common.util.StringUtils;
import kr.co.hangagu.common.util.UpdateUtils;

@Service
public class AddrServiceImpl implements AddrService {
	
	@Autowired
	private AddrRepository addrRepository;
	
	@Autowired
	private HangaguFunctionRepository functionRepository;
	
	
	@Override
	public ResultDto findByMemKey(AddrDto dto) {
		ResultDto resultDto = new ResultDto();
		
		List<AddrDto> result = addrRepository.selectAddrList(dto);
		resultDto.setData(result);
		
		return resultDto;
	}
	
	
	@Override 
	public ResultDto findByAddrKey(AddrDto dto) { 
		ResultDto resultDto = new ResultDto();
	
		AddrDto addrDto = addrRepository.selectAddrDetail(dto);
	
		resultDto.setData(addrDto);
		
		return resultDto; 
	}
	 
	@Override 
	public ResultDto save(AddrDto dto) { 
		ResultDto resultDto = new ResultDto();
	
		AddrEntity addrEntity = new AddrEntity();
		
		LocalDateTime now = LocalDateTime.now();
		
		AddrEntity saveAddr = null;
		
		addrEntity.setMemKey(dto.getMemKey());
		addrEntity.setAddrNm(dto.getAddrNm());
		addrEntity.setRcpNm(dto.getRcpNm());
		addrEntity.setRcpAddr(dto.getRcpAddr());
		addrEntity.setRcpPost(dto.getRcpPost());
		addrEntity.setRcpAddr2(dto.getRcpAddr2());
		addrEntity.setRcpTel(dto.getRcpTel());
		addrEntity.setRcpMobile(dto.getRcpMobile());
		addrEntity.setModDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		
		if(StringUtils.getDefaultValue(dto.getAddrKey(), "").equals("")) {
			addrEntity.setAddrKey(functionRepository.makeKeyFunction(PrimaryKeyType.ADDR.getValue().toString()));
			addrEntity.setRegDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
			
			saveAddr = addrRepository.save(addrEntity);
		} else {
			addrEntity.setAddrKey(dto.getAddrKey());
			
			AddrDto aDto = new AddrDto(); 
			aDto.setAddrKey(dto.getAddrKey());
			
			AddrDto existing = addrRepository.selectAddrDetail(aDto); 
			AddrEntity acrt = new AddrEntity(); 
			BeanUtils.copyProperties(existing, acrt);
			UpdateUtils.copyNonNullProperties(addrEntity, acrt);
			
			saveAddr = addrRepository.save(acrt);
		}
		
		
		
		if(saveAddr == null) {
			resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
			resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString()); 
		} else { 
			resultDto.setData(saveAddr);
			resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString()); 
		}
	
		return resultDto; 
	}
	 
	@Override
	public ResultDto delete(AddrDto dto) { 
		ResultDto resultDto = new ResultDto();
		
		AddrEntity addrEntity = new AddrEntity();
		
		LocalDateTime now = LocalDateTime.now();
		
		addrEntity.setAddrKey(dto.getAddrKey());
		addrEntity.setModDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		addrEntity.setDeleteYn("Y");
		
		AddrDto aDto = new AddrDto(); 
		aDto.setAddrKey(dto.getAddrKey());
		
		AddrDto existing = addrRepository.selectAddrDetail(aDto); 
		AddrEntity acrt = new AddrEntity(); 
		BeanUtils.copyProperties(existing, acrt);
		UpdateUtils.copyNonNullProperties(addrEntity, acrt);
		
		AddrEntity deleteAddr = addrRepository.save(acrt);
		
		if(deleteAddr == null) {
			resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
			resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString()); 
		} else { 
			resultDto.setData(deleteAddr);
			resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString()); 
		}
	
		return resultDto; 
	}
	
	
}
