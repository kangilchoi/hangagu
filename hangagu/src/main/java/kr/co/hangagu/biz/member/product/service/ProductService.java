package kr.co.hangagu.biz.member.product.service;



import kr.co.hangagu.biz.member.product.dto.ProductDto;
import kr.co.hangagu.common.dto.ResultDto;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    public ResultDto findList(ProductDto dto, Pageable pageable);

    public ResultDto findByPmKey(ProductDto dto);

    public ResultDto save(ProductDto dto);

    public ResultDto update(ProductDto dto);

    public ResultDto findPopularList();

}