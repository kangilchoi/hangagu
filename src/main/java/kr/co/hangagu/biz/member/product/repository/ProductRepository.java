package kr.co.hangagu.biz.member.product.repository;

import kr.co.hangagu.biz.member.product.entity.Product;
import kr.co.hangagu.biz.member.product.repository.custom.ProductRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, String>, ProductRepositoryCustom {

}
