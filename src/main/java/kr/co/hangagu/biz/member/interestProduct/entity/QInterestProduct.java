package kr.co.hangagu.biz.member.interestProduct.entity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.StringPath;

@Generated("com.querydsl.codegen.EntitySerializer")
public class QInterestProduct extends EntityPathBase<InterestProductEntity> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8064981743593125408L;

	public static final QInterestProduct interestProduct = new QInterestProduct("interestProduct");
	
	public final StringPath interestPmKey = createString("interestPmKey");
	
	public final StringPath pmKey = createString("pmKey");
	
	public final StringPath memKey = createString("memKey");
	
	public final StringPath regDt = createString("regDt");
	
	public final StringPath modDt = createString("modDt");
	
	public final StringPath deleteYn = createString("deleteYn");

	
	public QInterestProduct(String variable) {
		super(InterestProductEntity.class, forVariable(variable));
	}
	
	public QInterestProduct(Path<? extends InterestProductEntity> path) {
		super(path.getType(), path.getMetadata());
	}
	
	public QInterestProduct(PathMetadata metadata) {
		super(InterestProductEntity.class, metadata);
	}

}
