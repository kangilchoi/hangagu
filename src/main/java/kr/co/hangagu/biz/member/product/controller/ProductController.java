package kr.co.hangagu.biz.member.product.controller;

import kr.co.hangagu.biz.member.product.dto.ProductDto;
import kr.co.hangagu.biz.member.product.service.ProductService;
import kr.co.hangagu.common.dto.ResultDto;
import kr.co.hangagu.common.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
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

    @RequestMapping(
            value = {"/{pmClassCd}/{pmDetailClassCd}/{pmLineCd}/list"
                    , "/{pmClassCd}/{pmDetailClassCd}/list"
                    , "/{pmClassCd}/list"}
            , method = RequestMethod.GET
    )
    public @ResponseBody
    ResultDto getProductList(@PathVariable("pmClassCd") String pmClassCd
                            , @PathVariable(value = "pmDetailClassCd", required = false) String pmDetailClassCd
                            , @PathVariable(value = "pmLineCd", required = false) String pmLineCd
                            , @RequestParam(value = "page", required = false, defaultValue="1") int page
                            , @RequestParam(value = "size", required = false, defaultValue="10") int size) {
        ProductDto dto = new ProductDto();
        dto.setPmClassCd(pmClassCd);
        dto.setPmDetailClassCd(pmDetailClassCd);
        dto.setPmLineCd(pmLineCd);

        Pageable pageable = PageRequest.of(page-1, size);
        ResultDto resultDto = productService.findList(dto, pageable);
        return resultDto;
    }

    @RequestMapping(value = "/detail/{pmClassCd}/{pmDetailClassCd}/{pmLineCd}/{pmKey}", method = RequestMethod.GET)
    public @ResponseBody
    ResultDto getProductDetail(@PathVariable("pmClassCd") String pmClassCd, @PathVariable("pmDetailClassCd") String pmDetailClassCd
                                , @PathVariable("pmLineCd") String pmLineCd, @PathVariable("pmKey") String pmKey) {
        ProductDto dto = new ProductDto();
        dto.setPmClassCd(pmClassCd);
        dto.setPmDetailClassCd(pmDetailClassCd);
        dto.setPmLineCd(pmDetailClassCd);
        dto.setPmKey(pmKey);
        ResultDto resultDto = productService.findDetail(dto);
        return resultDto;
    }

    @RequestMapping(value="/create", method = RequestMethod.PUT)
    public @ResponseBody ResultDto createProduct(ProductDto dto) {
        ResultDto resultDto = productService.save(dto);
        return resultDto;
    }

    @RequestMapping(value = "/update", method = RequestMethod.PATCH)
    public @ResponseBody ResultDto updateProduct(ProductDto dto) {
        ResultDto resultDto = productService.update(dto);
        return resultDto;
    }


    @RequestMapping(value = {"popular/list"}, method = RequestMethod.GET)
    public @ResponseBody
    ResultDto getProductList() {
        ResultDto resultDto = productService.findPopularList();
        return resultDto;
    }

}
