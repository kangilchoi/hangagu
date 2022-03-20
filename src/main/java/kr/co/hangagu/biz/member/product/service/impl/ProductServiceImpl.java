package kr.co.hangagu.biz.member.product.service.impl;

import kr.co.hangagu.biz.common.mysql.repository.HangaguFunctionRepository;
import kr.co.hangagu.biz.member.product.dto.ProductDto;
import kr.co.hangagu.biz.member.product.entity.Product;
import kr.co.hangagu.biz.member.product.repository.ProductRepository;
import kr.co.hangagu.biz.member.product.service.ProductService;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private HangaguFunctionRepository functionRepository;

    @Override
    public ResultDto findList(ProductDto dto, Pageable pageable) {
        ResultDto resultDto = new ResultDto();

        Page<ProductDto> result = productRepository.selectProductList(dto, pageable);

        resultDto.setData(result);
        return resultDto;
    }

    @Override
    public ResultDto findDetail(ProductDto dto) {
        ResultDto resultDto = new ResultDto();

        ProductDto productDto = productRepository.selectProductDetail(dto);

        resultDto.setData(productDto);

        return resultDto;
    }

    @Override
    public ResultDto save(ProductDto dto) {
        ResultDto resultDto = new ResultDto();

        LocalDateTime now = LocalDateTime.now();

        // 리팩토링(적정팩토리메소드)
        Product prd = new Product();
        prd.setPmKey(functionRepository.makeKeyFunction(HangaguConstant.Seq.PRODUCT_KEY.getValue()));
        prd.setPmClassCd(dto.getPmClassCd());
        prd.setPmDetailClassCd(dto.getPmDetailClassCd());
        prd.setPmLineCd(dto.getPmLineCd());
        prd.setPmNm(dto.getPmNm());
        prd.setPmColor(dto.getPmColor());
        prd.setPmStock(dto.getPmStock());
        prd.setPmSize(dto.getPmSize());
        prd.setPmPrice(dto.getPmPrice());
        prd.setPmRemark(dto.getPmRemark());
        prd.setRegDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        prd.setRegEmpKey(dto.getRegEmpKey());
        prd.setModDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        prd.setModEmpKey(dto.getModEmpKey());
        prd.setDeleteYn("N");

        Product newProduct = productRepository.save(prd);

        if(newProduct == null) {
            resultDto.setCode("9999");
            resultDto.setMessage("등록 실패");
        } else {
            resultDto.setData(newProduct);
        }

        return resultDto;
    }

    @Override
    public ResultDto update(ProductDto dto) {
        ResultDto resultDto = new ResultDto();

        Product product = new Product();
        product.setPmKey(dto.getPmKey());

        product.setDeleteYn(dto.getDeleteYn());
        product.setModDt(String.valueOf(LocalDate.now()));
        //세션에 저장되어있는 값 가져오기(stfId)
        //selectProduct.setModEmpKey();

        Product newProduct = productRepository.save(product);
        if(newProduct == null) {
            resultDto.setCode("9999");
            resultDto.setMessage("수정 실패");
        } else {
            resultDto.setData(newProduct);
        }

        return resultDto;
    }

    @Override
    public ResultDto findPopularList() {
        ResultDto resultDto = new ResultDto();

        List<ProductDto> result = productRepository.selectPopularProductList();

        resultDto.setData(result);
        return resultDto;
    }
    
    @Override
    public ResultDto findNewList() {
        ResultDto resultDto = new ResultDto();

        List<ProductDto> result = productRepository.selectNewProductList();

        resultDto.setData(result);
        return resultDto;
    }
}
