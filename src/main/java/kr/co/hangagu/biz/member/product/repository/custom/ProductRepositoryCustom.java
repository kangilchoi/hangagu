package kr.co.hangagu.biz.member.product.repository.custom;

import kr.co.hangagu.biz.member.product.dto.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductRepositoryCustom {
    public Page<ProductDto> selectProductList(ProductDto dto, Pageable pageable);

    public ProductDto selectProductDetail(ProductDto dto);
}
