package kr.co.hangagu.biz.member.cart.repository.custom.impl;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.mysql.cj.QueryResult;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.hangagu.biz.member.car.dto.CartDto;
import kr.co.hangagu.biz.member.cart.entity.CartEntity;
import kr.co.hangagu.biz.member.cart.entity.QCart;
import kr.co.hangagu.biz.member.cart.repository.custom.CartRepositoryCustom;
import kr.co.hangagu.biz.member.product.entity.QProduct;
import kr.co.hangagu.common.constants.HangaguConstant;

public class CartRepositoryImpl extends QuerydslRepositorySupport implements CartRepositoryCustom {
	
	private final JPAQueryFactory queryFactory;
	
	public CartRepositoryImpl(JPAQueryFactory queryFactory) {
		super(CartEntity.class);
		this.queryFactory = queryFactory;
	}
	
	@Override
	public List<CartDto> selectCartList(CartDto dto) {
		QCart crt = new QCart("crt");
		QProduct prd = new QProduct("prd");
		
		List<CartDto> result = queryFactory
								.select(Projections.bean(CartDto.class, 
										crt.cartKey.as("cartKey")
										, crt.cartStatus.as("cartStatus")
										, crt.memKey.as("memKey")
										, crt.pmKey.as("pmKey")
										, crt.pmQuantity.as("pmQuantity")
										, crt.pmSelectedColor.as("pmSelectedColor")
										, crt.regDt.as("regDt")
										, crt.modDt.as("modDt")
										, crt.deleteYn.as("deleteYn")
										, prd.pmNm.as("pmNm")
										, prd.pmPrice.as("pmPrice")
										, prd.pmSalesRate.as("pmSalesRate")
										, prd.pmDeliveryPrice.as("pmDeliveryPrice")
										, prd.pmColor.as("pmColor")
										, prd.pmImgSrc.as("pmImgSrc")
										)
									)
									.from(crt)
									.leftJoin(prd).on(crt.pmKey.eq(prd.pmKey), prd.deleteYn.eq("N"))
									.where(crt.memKey.eq(dto.getMemKey()), crt.deleteYn.eq("N"), crt.cartStatus.eq(HangaguConstant.Cart.CART.getValue().toString()))
									.fetch();
		
		return result;
	}
	
	@Override
	public CartDto selectCartDetail(CartDto dto) {
		QCart crt = new QCart("crt");
		QProduct prd = new QProduct("prd");
		
		CartDto result = queryFactory
					.select(
							Projections.bean(CartDto.class, 
								crt.cartKey.as("cartKey"),
								crt.cartStatus.as("cartStatus"),
								crt.deleteYn.as("deleteYn"),
								crt.memKey.as("memKey"),
								crt.modDt.as("modDt"),
								crt.pmKey.as("pmKey"),
								crt.pmQuantity.as("pmQuantity"),
								crt.pmSelectedColor.as("pmSelectedColor"),
								crt.regDt.as("regDt"),
								prd.pmPrice.as("pmPrice"),
								prd.pmDeliveryPrice.as("pmDeliveryPrice"),
								prd.pmSalesRate.as("pmSalesRate"),
								prd.pmImgSrc.as("pmImgSrc")
						)
					)
					.from(crt)
					.leftJoin(prd).on(crt.pmKey.eq(prd.pmKey), prd.deleteYn.eq("N"))
					.where(
						crt.cartKey.eq(dto.getCartKey()),
						crt.deleteYn.eq("N")
					).fetchOne();
		
		return result;
	}

}
