package kr.co.hangagu.biz.member.cart.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.hangagu.biz.member.cart.entity.CartEntity;
import kr.co.hangagu.common.constants.HangaguConstant;

public interface CartDao extends JpaRepository<CartEntity, Integer> {
	List<CartEntity> findByMemKeyAndCartStatusAndDeleteYn(String memKey, HangaguConstant.Cart cartStatus, String deleteYn);
	CartEntity findByCartKey(int cartKey);
}
