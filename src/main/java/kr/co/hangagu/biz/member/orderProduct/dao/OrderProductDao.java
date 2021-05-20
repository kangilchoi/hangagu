package kr.co.hangagu.biz.member.orderProduct.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kr.co.hangagu.biz.member.orderProduct.entity.OrderProductEntity;
public interface OrderProductDao extends JpaRepository<OrderProductEntity, Integer> {
	
	OrderProductEntity findByOdPmKey(String odPmKey);
	
	@Query(nativeQuery = true, value="SELECT sylim_test.make_key(:keyType)")
	String makeKey(@Param("keyType") String keyType);
	
}
