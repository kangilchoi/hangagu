package kr.co.hangagu.biz.member.order.entity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;

@Generated("com.querydsl.codegen.EntitySerializer")
public class QOrder extends EntityPathBase<OrderEntity> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1085790298197648163L;

	public static final QOrder order = new QOrder("order");
	
	public final StringPath odKey = createString("odKey");
	
	public final NumberPath<Integer> cartKey = createNumber("cartKey", Integer.class);

	public final StringPath deliveryPrice = createString("deliveryPrice");

	public final StringPath odPrice = createString("odPrice");
	
	public final StringPath salesPrice = createString("salesPrice");
	
	public final StringPath odCustName = createString("odCustName");

	public final StringPath odCustPost = createString("odCustPost");

	public final StringPath odCustAddr = createString("odCustAddr");

	public final StringPath odCustAddr2 = createString("odCustAddr2");

	public final StringPath odCustTel = createString("odCustTel");

	public final StringPath odCustMobile = createString("odCustMobile");

	public final StringPath odCustEmail = createString("odCustEmail");

	public final StringPath odReceiverName = createString("odReceiverName");

	public final StringPath odReceiverPost = createString("odReceiverPost");
	
	public final StringPath odReceiverAddr = createString("odReceiverAddr");
	
	public final StringPath odReceiverAddr2 = createString("odReceiverAddr2");

	public final StringPath odReceiverTel = createString("odReceiverTel");

	public final StringPath odReceiverMobile = createString("odReceiverMobile");

	public final StringPath odReceiverRemark = createString("odReceiverRemark");

	public final StringPath odRemark = createString("odRemark");

	public final StringPath odPassword = createString("odPassword");
	
	public final StringPath pmKey = createString("pmKey");

	public final StringPath odStatus = createString("odStatus");

	public final StringPath memKey = createString("memKey");
	
	public final StringPath regDt = createString("regDt");
	
	public final StringPath modDt = createString("modDt");

	
	public QOrder(String variable) {
		super(OrderEntity.class, forVariable(variable));
	}
	
	public QOrder(Path<? extends OrderEntity> path) {
		super(path.getType(), path.getMetadata());
	}
	
	public QOrder(PathMetadata metadata) {
		super(OrderEntity.class, metadata);
	}

}
