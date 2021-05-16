package kr.co.hangagu.biz.member.order.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kr.co.hangagu.biz.member.member.vo.Member;
import kr.co.hangagu.biz.member.order.vo.Order;

public interface OrderDao extends JpaRepository<Order, Integer>{
	@Query(nativeQuery = true, value="select OD_STATUS, count(*) as cnt "
		 + "from hangagu.ORDER_TB "
		 + "where MEM_KEY = :memKey "
		 + "and IFNULL(MOD_DT,REG_DT) >= DATE_ADD(NOW(), INTERVAL -3 MONTH) "
		 + "group by OD_STATUS")
    Optional<Object> myPage(@Param("memKey") String memKey);
}