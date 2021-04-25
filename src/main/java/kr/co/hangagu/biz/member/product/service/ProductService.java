package kr.co.hangagu.biz.member.product.service;


import kr.co.hangagu.biz.member.product.vo.ProductVO;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    public Optional<ProductVO> findByPmKey(String pmKey);
}
