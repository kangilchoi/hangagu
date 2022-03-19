package kr.co.hangagu.biz.member.addr.repository.custom;

import java.util.List;

import kr.co.hangagu.biz.member.addr.dto.AddrDto;

public interface AddrRepositoryCustom {
	public List<AddrDto> selectAddrList(AddrDto dto);
	public AddrDto selectAddrDetail(AddrDto dto);
}
