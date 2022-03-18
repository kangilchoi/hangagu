package kr.co.hangagu.biz.member.interestProduct.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kr.co.hangagu.biz.member.interestProduct.entity.InterestProductEntity;

public interface InterestProductDao extends JpaRepository<InterestProductEntity, Integer> {
	List<InterestProductEntity> findByDeleteYn(String deleteYn);
	
	@Query(nativeQuery = true, value = "SELECT sylim_test.make_key(:keyType)")
	String makeKey(@Param("keyType") String keyType);
	
	InterestProductEntity findByInterestPmKey(String interestPmKey);
}
