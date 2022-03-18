package kr.co.hangagu.biz.member.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.hangagu.biz.member.order.entity.OrderEntity;
import kr.co.hangagu.biz.member.order.repository.custom.OrderRepositoryCustom;

public interface OrderRepository extends JpaRepository<OrderEntity, String>, OrderRepositoryCustom {

}
