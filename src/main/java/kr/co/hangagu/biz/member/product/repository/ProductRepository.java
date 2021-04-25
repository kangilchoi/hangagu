package kr.co.hangagu.biz.member.product.repository;

import kr.co.hangagu.biz.member.product.vo.ProductVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductVO, Long> {

    // 제품 상세
    public Optional<ProductVO> findByPmKey(String pmKey);

}
