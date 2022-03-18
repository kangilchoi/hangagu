package kr.co.hangagu.biz.member.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.hangagu.biz.member.cart.entity.CartEntity;
import kr.co.hangagu.biz.member.cart.repository.custom.CartRepositoryCustom;

public interface CartRepository extends JpaRepository<CartEntity, String>, CartRepositoryCustom {

}
