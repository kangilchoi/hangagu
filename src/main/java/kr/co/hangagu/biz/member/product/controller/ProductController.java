package kr.co.hangagu.biz.member.product.controller;

import kr.co.hangagu.biz.member.product.service.ProductService;
import kr.co.hangagu.biz.member.product.vo.ProductVO;
import kr.co.hangagu.common.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * ProductController
 * 제품 관련 컨트롤러
 */
@Controller
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/{pmKey}", method = RequestMethod.GET)
    public @ResponseBody
    ResultVO getProductByPmKey(@PathVariable("pmKey") String pmKey) {
        ResultVO resultVO = productService.findByPmKey(pmKey);
        return resultVO;
    }

}
