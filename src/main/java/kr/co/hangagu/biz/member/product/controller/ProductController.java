package kr.co.hangagu.biz.member.product.controller;

import kr.co.hangagu.biz.member.product.service.ProductService;
import kr.co.hangagu.biz.member.product.vo.ProductVO;
import kr.co.hangagu.common.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
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

    @RequestMapping(value="/list", method = RequestMethod.POST)
    public @ResponseBody ResultVO getProductList(ProductVO vo) {
        ResultVO resultVO = productService.findList(vo);
        return resultVO;
    }

//    @RequestMapping(value = "/detail/{pmKey}", method = RequestMethod.GET)
//    public @ResponseBody
//    ResultVO getProductByPmKey(@PathVariable("pmKey") String pmKey) {
//        ResultVO resultVO = productService.findByPmKey(pmKey);
//        return resultVO;
//    }

    @RequestMapping(value="/create", method = RequestMethod.POST)
    public @ResponseBody ResultVO create(ProductVO vo) {
        ResultVO resultVO = productService.save(vo);
        return resultVO;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody ResultVO update(ProductVO vo) {
        ResultVO resultVO = productService.update(vo);
        return resultVO;
    }

}
