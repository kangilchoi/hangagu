package kr.co.hangagu.biz.member.product.service.impl;

import kr.co.hangagu.biz.member.product.repository.ProductRepository;
import kr.co.hangagu.biz.member.product.service.ProductService;
import kr.co.hangagu.biz.member.product.vo.ProductVO;
import kr.co.hangagu.common.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

//    @Autowired
//    private ProductRepositorySupport productRepositorySupport;

    @Override
    public ResultVO findList(ProductVO vo) {
        ResultVO resultVO = new ResultVO();

        Map<String, Object> resultMap = new HashMap<>();
//        List<ProductVO> list = productRepositorySupport.selectProductList(vo);

//        resultMap.put("totalCount", list == null ? "0" : list.size());
//        resultMap.put("list", list);
        resultVO.setData(resultMap);

        return resultVO;
    }

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

    @Override
    public ResultVO save(ProductVO vo) {
        ResultVO resultVO = new ResultVO();

        ProductVO newProduct = productRepository.save(vo);

        if(newProduct == null) {
            resultVO.setData("9999");
            resultVO.setMessage("등록 실패");
        } else {
            resultVO.setData(newProduct);
        }

        return resultVO;
    }

    @Override
    public ResultVO update(ProductVO vo) {
        ResultVO resultVO = new ResultVO();

        Optional<ProductVO> prdOpt = productRepository.findByPmKey(vo.getPmKey());

        prdOpt.ifPresent(selectProduct -> {
            selectProduct.setDeleteYn(vo.getDeleteYn());
            selectProduct.setModDt(String.valueOf(LocalDate.now()));
            //세션에 저장되어있는 값 가져오기(stfId)
            //selectProduct.setModEmpKey();

            ProductVO newProduct = productRepository.save(selectProduct);
            if(newProduct == null) {
                resultVO.setData("9999");
                resultVO.setMessage("수정 실패");
            } else {
                resultVO.setData(newProduct);
            }
        });

        return resultVO;
    }


}
