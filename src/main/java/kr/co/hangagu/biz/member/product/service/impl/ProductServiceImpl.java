package kr.co.hangagu.biz.member.product.service.impl;

import kr.co.hangagu.biz.member.product.repository.ProductRepository;
import kr.co.hangagu.biz.member.product.service.ProductService;
import kr.co.hangagu.biz.member.product.vo.ProductVO;
import kr.co.hangagu.common.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ResultVO findByPmKey(String pmKey) {
        ResultVO resultVO = new ResultVO();
        Optional<ProductVO> productOpt = productRepository.findByPmKey(pmKey);

        if(!productOpt.isPresent()) {
            resultVO.setCode("9999");
            resultVO.setMessage("데이터 없음");
        } else {
            resultVO.setData(productOpt.get());
        }

        return resultVO;
    }

}
