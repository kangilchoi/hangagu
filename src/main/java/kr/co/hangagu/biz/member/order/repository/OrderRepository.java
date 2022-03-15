package kr.co.hangagu.biz.member.order.repository;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.hangagu.biz.member.member.entity.Member;
import kr.co.hangagu.biz.member.order.vo.OrderVO;

@Repository
public class OrderRepository extends QuerydslRepositorySupport{
	
	private final JPAQueryFactory queryFactory;

    public OrderRepository(JPAQueryFactory queryFactory) {
        super(Member.class);
        this.queryFactory = queryFactory;
    }
    
//    //회원등급 조회 by id
    public OrderVO myPage(String memId) {
//    	QOrder o = QOrder.order;
//    	
//    	OrderVO result = queryFactory
//			.select(Projections.bean(OrderVO.class,o.odStatus,o.count().as("cnt")))
//			.from(o)
//			.where(
//				o.memKey.eq(memId)
//				//,o.modDt.coalesce(o.regDt).as(o.modDt)
//			)
//			.fetchOne();
//    	
    	return null;
    }
}
