package kr.co.hangagu.biz.member.addr.repository.custom.impl;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.hangagu.biz.member.addr.dto.AddrDto;
import kr.co.hangagu.biz.member.addr.entity.AddrEntity;
import kr.co.hangagu.biz.member.addr.entity.QAddr;
import kr.co.hangagu.biz.member.addr.repository.custom.AddrRepositoryCustom;

public class AddrRepositoryImpl extends QuerydslRepositorySupport implements AddrRepositoryCustom {
	
	private final JPAQueryFactory queryFactory;
	
	public AddrRepositoryImpl(JPAQueryFactory queryFactory) {
		super(AddrEntity.class);
		this.queryFactory = queryFactory;
	}
	
	@Override
	public List<AddrDto> selectAddrList(AddrDto dto) {
		QAddr adr = new QAddr("adr");
		
		List<AddrDto> result = queryFactory
								.select(Projections.bean(AddrDto.class, 
										adr.addrKey.as("addrKey")
										, adr.memKey.as("memKey")
										, adr.addrNm.as("addrNm")
										, adr.rcpNm.as("rcpNm")
										, adr.rcpAddr.as("rcpAddr")
										, adr.rcpAddr2.as("rcpAddr2")
										, adr.rcpPost.as("rcpPost")
										, adr.rcpTel.as("rcpTel")
										, adr.rcpMobile.as("rcpMobile")
										, adr.regDt.as("regDt")
										, adr.modDt.as("modDt")
										, adr.deleteYn.as("deleteYn")
										)
									)
									.from(adr)
									.where(adr.memKey.eq(dto.getMemKey()), adr.deleteYn.eq("N"))
									.fetch();
		
		return result;
	}
	
	
	@Override 
	public AddrDto selectAddrDetail(AddrDto dto) { 
		QAddr adr = new QAddr("adr"); 
	  
		AddrDto result = queryFactory 
						.select( Projections.bean(AddrDto.class,
								adr.addrKey.as("addrKey")
								, adr.memKey.as("memKey")
								, adr.addrNm.as("addrNm")
								, adr.rcpNm.as("rcpNm")
								, adr.rcpAddr.as("rcpAddr")
								, adr.rcpAddr2.as("rcpAddr2")
								, adr.rcpPost.as("rcpPost")
								, adr.rcpTel.as("rcpTel")
								, adr.rcpMobile.as("rcpMobile")
								, adr.regDt.as("regDt")
								, adr.modDt.as("modDt")
								, adr.deleteYn.as("deleteYn")
								) 
							)
							.from(adr)
							.where(adr.addrKey.eq(dto.getAddrKey()), adr.deleteYn.eq("N") )
							.fetchOne();
	  
	return result; }
	 

}
