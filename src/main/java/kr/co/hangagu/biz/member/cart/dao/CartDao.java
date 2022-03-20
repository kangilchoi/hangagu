package kr.co.hangagu.biz.member.cart.dao;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kr.co.hangagu.biz.member.cart.entity.CartEntity;

public interface CartDao extends JpaRepository<CartEntity, Integer> {
	@Query(nativeQuery = true, value="SELECT A.CART_KEY AS cartKey, A.MEM_KEY AS memKey, A.PM_KEY AS pmKey, A.PM_QUANTITY AS pmQuantity, A.PM_SELECTED_COLOR AS pmSelectedColor, "
			+ "B.PM_CLASS_CD AS pmClassCd, B.PM_DETAIL_CLASS_CD AS pmDetailClass, B.PM_LINE_CD AS pmLineCd, B.PM_NM AS pmNm, "
			+ "B.PM_COLOR AS pmColor, B.PM_STOCK AS pmStock, B.PM_SIZE AS pmSize, B.PM_PRICE AS pmPrice, "
			+ "B.PM_DELIVERY_PRICE AS pmDeliveryPrice, B.PM_REMARK AS pmRemark, B.PM_SALES_RATE AS pmSalesRate "
			+ "FROM CART_TB A "
			+ "JOIN PRODUCT_TB B "
			+ "ON A.PM_KEY = B.PM_KEY "
			+ "WHERE A.MEM_KEY=:memKey "
			+ "AND A.DELETE_YN=:deleteYn "
			//+ "AND B.DELETE_YN=:deleteYn "
			+ "AND A.CART_STATUS=:cartStatus "
			+ "ORDER BY A.REG_DT DESC")
	List<Map<String, Object>> findByMemKeyAndCartStatusAndDeleteYn(@Param("memKey") String memKey, @Param("cartStatus") String cartStatus, @Param("deleteYn") String deleteYn);
	CartEntity findByCartKey(int cartKey);
}
