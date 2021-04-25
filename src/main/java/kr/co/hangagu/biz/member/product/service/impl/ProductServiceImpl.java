package kr.co.hangagu.biz.member.product.service.impl;

import kr.co.hangagu.biz.member.product.repository.ProductRepository;
import kr.co.hangagu.biz.member.product.service.ProductService;
import kr.co.hangagu.biz.member.product.vo.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Optional<ProductVO> findByPmKey(String pmKey) {
        Optional<ProductVO> product = productRepository.findByPmKey(pmKey);
        return product;
    }

}
