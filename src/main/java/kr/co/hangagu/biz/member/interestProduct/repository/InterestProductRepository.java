package kr.co.hangagu.biz.member.interestProduct.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.hangagu.biz.member.interestProduct.entity.InterestProductEntity;
import kr.co.hangagu.biz.member.interestProduct.repository.custom.InterestProductRepositoryCustom;

public interface InterestProductRepository extends JpaRepository<InterestProductEntity, String>, InterestProductRepositoryCustom {

}
