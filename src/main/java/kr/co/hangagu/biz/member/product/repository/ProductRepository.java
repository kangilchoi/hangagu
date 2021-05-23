package kr.co.hangagu.biz.member.product.repository;

import kr.co.hangagu.biz.member.product.vo.ProductVO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductVO, Long> {

    // 제품 상세
    public Optional<ProductVO> findByPmKey(String pmKey);


}
