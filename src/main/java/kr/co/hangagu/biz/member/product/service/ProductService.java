package kr.co.hangagu.biz.member.product.service;



import kr.co.hangagu.common.vo.ResultVO;


import java.util.Optional;

public interface ProductService {

    public ResultVO findByPmKey(String pmKey);
}
