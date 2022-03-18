package kr.co.hangagu.biz.member.interestProduct.repository.custom.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.hangagu.biz.member.interestProduct.dto.InterestProductDto;
import kr.co.hangagu.biz.member.interestProduct.entity.InterestProductEntity;
import kr.co.hangagu.biz.member.interestProduct.entity.QInterestProduct;
import kr.co.hangagu.biz.member.interestProduct.repository.custom.InterestProductRepositoryCustom;
import kr.co.hangagu.biz.member.product.entity.QProduct;

public class InterestProductRepositoryImpl extends QuerydslRepositorySupport implements InterestProductRepositoryCustom {
	
	private final JPAQueryFactory queryFactory;
	
	public InterestProductRepositoryImpl(JPAQueryFactory queryFactory) {
		super(InterestProductEntity.class);
		this.queryFactory = queryFactory;
	}
	
	@Override
	public Page<InterestProductDto> selectInterestProductList(InterestProductDto dto, Pageable pageable) {
		//BooleanBuilder builder = new BooleanBuilder();
		
		/*
		 * QInterestProduct ipd = new QInterestProduct("ipd"); QProduct prd = new
		 * QProduct("prd");
		 */
		
		//builder.and(ipd.memKey.eq(dto.getMemKey()));

		/*
		 * QueryResults<InterestProductDto> result = queryFactory
		 * .select(Projections.bean(InterestProductDto.class, ipd.pmKey.as("pmKey") ,
		 * ipd.memKey.as("memKey") , ipd.regDt.as("regDt") , ipd.modDt.as("modDt") ,
		 * ipd.deleteYn.as("deleteYn") , prd.pmNm.as("pmNm") ) ) .from(ipd)
		 * .leftJoin(ipd).on(ipd.pmKey.eq(prd.pmKey), prd.deleteYn.eq("N"))
		 * .where(ipd.memKey.eq(dto.getMemKey())) .orderBy(ipd.regDt.desc())
		 * .limit(pageable.getPageSize()) .offset(pageable.getOffset()) .fetchResults();
		 
		 *
		 */
		
		QInterestProduct ipd = QInterestProduct.interestProduct;
		QProduct prd = QProduct.product;
		
		
		List<InterestProductDto> result = queryFactory
				.select(Projections.bean(InterestProductDto.class, 
						ipd.interestPmKey.as("interestPmKey")
						, ipd.pmKey.as("pmKey")
						, ipd.memKey.as("memKey") 
						, ipd.regDt.as("regDt") 
						, ipd.modDt.as("modDt") 
						, prd.pmNm.as("pmNm") 
						, prd.pmColor.as("pmColor")
						, prd.pmPrice.as("pmPrice")
						, prd.pmDeliveryPrice.as("pmDeliveryPrice")
					)
				)
				.from(ipd)
				.leftJoin(prd).on(ipd.pmKey.eq(prd.pmKey))
				.where(ipd.memKey.eq(dto.getMemKey()), prd.deleteYn.eq("N"), ipd.deleteYn.eq("N"))
				.orderBy(ipd.regDt.desc())
				.limit(pageable.getPageSize())
				.offset(pageable.getOffset())
				.fetch();
		
		JPAQuery<InterestProductEntity> countQuery = queryFactory
				.select(ipd)
				.from(ipd)
				.leftJoin(prd).on(ipd.pmKey.eq(prd.pmKey))
				.where(ipd.memKey.eq(dto.getMemKey()), prd.deleteYn.eq("N"), ipd.deleteYn.eq("N"));
		
		return PageableExecutionUtils.getPage(result, pageable, countQuery::fetchCount);						
	}
	
	@Override
	public InterestProductEntity selectInterestProductDetail(InterestProductDto dto) {
		QInterestProduct ipd = new QInterestProduct("ipd");
		
		InterestProductEntity result = queryFactory
									.selectFrom(ipd)
									.where(ipd.interestPmKey.eq(dto.getInterestPmKey()))
									.fetchOne();
		
		return result;
	}
}
