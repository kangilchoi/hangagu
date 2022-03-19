package kr.co.hangagu.biz.member.addr.entity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.StringPath;

@Generated("com.querydsl.codegen.EntitySerializer")
public class QAddr extends EntityPathBase<AddrEntity> {
	
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static final QAddr adr = new QAddr("adr");
	
	public final StringPath addrKey = createString("addrKey");
	
	public final StringPath memKey = createString("memKey");
	
	public final StringPath addrNm = createString("addrNm");
	
	public final StringPath rcpNm = createString("rcpNm");
	
	public final StringPath rcpAddr = createString("rcpAddr");
	
	public final StringPath rcpAddr2 = createString("rcpAddr2");
	
	public final StringPath rcpPost = createString("rcpPost");
	
	public final StringPath rcpTel = createString("rcpTel");
	
	public final StringPath rcpMobile = createString("rcpMobile");
	
	public final StringPath deleteYn = createString("deleteYn");

	public final StringPath regDt = createString("regDt");
	
	public final StringPath modDt = createString("modDt");
	
	public QAddr(String variable) {
		super(AddrEntity.class, forVariable(variable));
	}
	
	public QAddr(Path<? extends AddrEntity> path) {
		super(path.getType(), path.getMetadata());
	}
	
	public QAddr(PathMetadata metadata) {
		super(AddrEntity.class, metadata);
	}
}
