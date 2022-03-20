package kr.co.hangagu.biz.member.addr.service;

import kr.co.hangagu.biz.member.addr.dto.AddrDto;
import kr.co.hangagu.common.dto.ResultDto;

public interface AddrService {
	public ResultDto findByMemKey(AddrDto dto);
	public ResultDto findByAddrKey(AddrDto dto);
	public ResultDto save(AddrDto dto);
	public ResultDto delete(AddrDto dto);
}
