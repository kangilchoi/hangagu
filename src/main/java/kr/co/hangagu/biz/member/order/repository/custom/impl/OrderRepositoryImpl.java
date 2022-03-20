package kr.co.hangagu.biz.member.order.repository.custom.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.hangagu.biz.member.cart.entity.QCart;
import kr.co.hangagu.biz.member.order.dto.OrderDto;
import kr.co.hangagu.biz.member.order.entity.OrderEntity;
import kr.co.hangagu.biz.member.order.entity.QOrder;
import kr.co.hangagu.biz.member.order.repository.custom.OrderRepositoryCustom;
import kr.co.hangagu.biz.member.product.entity.QProduct;

public class OrderRepositoryImpl extends QuerydslRepositorySupport implements OrderRepositoryCustom {
	
	private final JPAQueryFactory queryFactory;
	
	public OrderRepositoryImpl(JPAQueryFactory queryFactory) {
		super(OrderEntity.class);
		this.queryFactory = queryFactory;
	}
	
	@Override
	public Page<OrderDto> selectOrderList(OrderDto dto, Pageable pageable) {
		BooleanBuilder builder = new BooleanBuilder();
		
		QOrder ord = new QOrder("ord");
		QProduct prd = new QProduct("prd");
		QCart crt = new QCart("crt");
		
		builder.and(ord.memKey.eq(dto.getMemKey()));
		if(!StringUtils.isEmpty(dto.getFromDt()) && !StringUtils.isEmpty(dto.getToDt())) {
			builder.and(ord.regDt.substring(0,10).between(dto.getFromDt().substring(0, 10), dto.getToDt().substring(0, 10)));
		} 
		if(dto.get_odStatus().length != 0) {
			builder.and(ord.odStatus.in(dto.get_odStatus()));
		} 

		QueryResults<OrderDto> result = queryFactory
								.select(Projections.bean(OrderDto.class,
										ord.odKey.as("odKey")
										, ord.memKey.as("memKey")
										, ord.odPrice.as("odPrice")
										, ord.deliveryPrice.as("deliveryPrice")
										, ord.salesPrice.as("salesPrice")
										, ord.odCustName.as("odCustName")
										, ord.odCustPost.as("odCustPost")
										, ord.odCustAddr.as("odCustAddr")
										, ord.odCustAddr2.as("odCustAddr2")
										, ord.odCustTel.as("odCustTel")
										, ord.odCustMobile.as("odCustMobile")
										, ord.odCustEmail.as("odCustEmail")
										, ord.odReceiverName.as("odReceiverName")
										, ord.odReceiverPost.as("odReceiverPost")
										, ord.odReceiverAddr.as("odReceiverAddr")
										, ord.odReceiverAddr2.as("odReceiverAddr2")
										, ord.odReceiverTel.as("odReceiverTel")
										, ord.odReceiverMobile.as("odReceiverMobile")
										, ord.odReceiverRemark.as("odReceiverRemark")
										, ord.odRemark.as("orRemark")
										, ord.odPassword.as("odPassword")
										, ord.regDt.as("regDt")
										, ord.modDt.as("modDt")
										, ord.odStatus.as("odStatus")
										, prd.pmNm.as("pmNm")
										, prd.pmImgSrc.as("pmImgSrc")
										, crt.pmQuantity.as("pmQuantity")
										, crt.cartKey.as("cartKey")
									)
								)
								.from(ord)
								.leftJoin(prd).on(ord.pmKey.eq(prd.pmKey), prd.deleteYn.eq("N"))
								.leftJoin(crt).on(ord.cartKey.eq(crt.cartKey), crt.deleteYn.eq("N"))
								.where(builder)
								.orderBy(ord.regDt.desc())
								.limit(pageable.getPageSize())
								.offset(pageable.getOffset())
								.fetchResults();
		
		return new PageImpl<>(result.getResults(), pageable, result.getTotal());						
	}
	
	@Override
	public OrderEntity selectOrderDetail(OrderDto dto) {
		QOrder ord = new QOrder("ord");
		
		OrderEntity result = queryFactory
						.selectFrom(ord)
						.where(ord.odKey.eq(dto.getOdKey()))
						.fetchOne();
		
		return result;
	}
}
