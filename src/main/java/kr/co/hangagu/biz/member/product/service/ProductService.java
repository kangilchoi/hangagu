package kr.co.hangagu.biz.member.product.service;



import kr.co.hangagu.biz.member.product.vo.ProductVO;
import kr.co.hangagu.common.vo.ResultVO;


import java.util.Optional;

public interface ProductService {

    public ResultVO findList(ProductVO vo);

    public ResultVO findByPmKey(String pmKey);

    public ResultVO save(ProductVO vo);

    public ResultVO update(ProductVO vo);

}
