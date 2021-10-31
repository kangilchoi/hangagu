package kr.co.hangagu.biz.member.order.dao;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kr.co.hangagu.biz.member.order.entity.OrderEntity;
import kr.co.hangagu.common.constants.HangaguConstant;

public interface OrderDao extends JpaRepository<OrderEntity, Integer> {
	@Query(nativeQuery = true, value="SELECT A.OD_PM_KEY, A.PM_KEY, A.PM_QUANTITY, "
			+ "B.OD_KEY, B.MEM_KEY, B.OD_PRICE, B.DELIVERY_PRICE, "
			+ "B.OD_STATUS, C.PM_PRICE "
			+ "FROM ORDER_PRODUCT_MNG_TB A JOIN ORDER_TB B "
			+ "ON A.OD_KEY = B.OD_KEY "
			+ "JOIN PRODUCT_TB C "
			+ "ON C.PM_KEY = A.PM_KEY "
			+ "WHERE B.MEM_KEY=:memKey AND A.DELETE_YN=:deleteYn AND B.OD_STATUS NOT IN (:odStatus) ORDER BY B.REG_DT DESC")
	List<Map<String, Object>> findAllOfOrder(@Param("memKey") String memKey, @Param("deleteYn") String deleteYn, @Param("odStatus") HangaguConstant.Oder odStatus);
	
	@Query(nativeQuery = true, value="SELECT sylim_test.make_key(:keyType)")
	String makeKey(@Param("keyType") String keyType);
	
	@Query(nativeQuery = true, value="SELECT A.OD_PM_KEY, A.PM_KEY, A.PM_QUANTITY, "
			+ "B.OD_KEY, B.MEM_KEY, B.OD_PRICE, B.DELIVERY_PRICE, "
			+ "B.OD_STATUS FROM ORDER_PRODUCT_MNG_TB A JOIN ORDER_TB B ON A.OD_KEY = B.OD_KEY "
			+ "WHERE A.DELETE_YN='N' AND B.OD_KEY = :odKey")
	Object[] findAllByOdKey(@Param("odKey") String oKey);
	
//	OrderEntity save(OrderEntity orderEntity);
	
	OrderEntity findByOdKey(String odKey);
	
	@Query(nativeQuery = true, value="select OD_STATUS, count(*) as cnt "
		 + "from hangagu.ORDER_TB "
		 + "where MEM_KEY = :memKey "
		 + "and IFNULL(MOD_DT,REG_DT) >= DATE_ADD(NOW(), INTERVAL -3 MONTH) "
		 + "group by OD_STATUS")
	Optional<List<Object>> myPage(@Param("memKey") String memKey);
}

