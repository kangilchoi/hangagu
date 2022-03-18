package kr.co.hangagu.biz.member.cart.entity;

import javax.annotation.Generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;

@Generated("com.querydsl.codegen.EntitySerializer")
public class QCart extends EntityPathBase<CartEntity> {
	
	private static final long serialVersionUID = -3982458750753442820L;

	public static final QCart cart = new QCart("cart");
	
	public final NumberPath<Integer> cartKey = createNumber("cartKey", Integer.class);
	
	public final StringPath pmKey = createString("pmKey");
	
	public final NumberPath<Integer> pmQuantity = createNumber("pmQuantity", Integer.class);
	
	public final StringPath pmSelectedColor = createString("pmSelectedColor");
	
	public final StringPath memKey = createString("memKey");
	
	public final StringPath cartStatus = createString("cartStatus");
	
	public final StringPath deleteYn = createString("deleteYn");

	public final StringPath regDt = createString("regDt");
	
	public final StringPath modDt = createString("modDt");
	
	public QCart(String variable) {
		super(CartEntity.class, forVariable(variable));
	}
	
	public QCart(Path<? extends CartEntity> path) {
		super(path.getType(), path.getMetadata());
	}
	
	public QCart(PathMetadata metadata) {
		super(CartEntity.class, metadata);
	}
}
