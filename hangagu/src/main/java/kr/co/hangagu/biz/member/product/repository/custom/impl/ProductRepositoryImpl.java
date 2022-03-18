package kr.co.hangagu.biz.member.product.repository.custom.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.hangagu.biz.common.code.entity.QCodeMng;
import kr.co.hangagu.biz.member.product.dto.ProductDto;
import kr.co.hangagu.biz.member.product.entity.Product;
import kr.co.hangagu.biz.member.product.entity.QProduct;
import kr.co.hangagu.biz.member.product.repository.custom.ProductRepositoryCustom;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import javax.naming.directory.SearchResult;
import java.util.List;

public class ProductRepositoryImpl extends QuerydslRepositorySupport implements ProductRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ProductRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Product.class);
        this.queryFactory = queryFactory;
    }

    @Override
    public Page<ProductDto> selectProductList(ProductDto dto, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();

        QProduct prd = QProduct.product;
        QCodeMng code1 = new QCodeMng("code1");
        QCodeMng code2 = new QCodeMng("code2");
        QCodeMng code3 = new QCodeMng("code3");

        builder.and(prd.deleteYn.eq("N"));
        if(!StringUtils.isEmpty(dto.getPmClassCd())) {
            builder.and(prd.pmClassCd.eq(dto.getPmClassCd()));
        }
        if(!StringUtils.isEmpty(dto.getPmDetailClassCd())) {
            builder.and(prd.pmDetailClassCd.eq(dto.getPmDetailClassCd()));
        }

        if(!StringUtils.isEmpty(dto.getPmLineCd())) {
            builder.and(prd.pmLineCd.eq(dto.getPmLineCd()));
        }

        QueryResults<ProductDto> result = queryFactory
                        .select(
                                Projections.bean(ProductDto.class,
                                        prd.pmKey.as("pmKey"),
                                        prd.pmClassCd.as("pmClassCd"),
                                        code1.cdDesc.as("pmClassCdDesc"),
                                        prd.pmDetailClassCd.as("pmDetailClassCd"),
                                        code2.cdDesc.as("pmDetailClassCdDesc"),
                                        prd.pmLineCd.as("pmLineCd"),
                                        code3.cdDesc.as("pmLineCdDesc"),
                                        prd.pmNm.as("pmNm"),
                                        prd.pmColor.as("pmColor"),
                                        prd.pmStock.as("pmStock"),
                                        prd.pmSize.as("pmSize"),
                                        prd.pmPrice.as("pmPrice"),
                                        prd.pmRemark.as("pmRemark"),
                                        prd.regDt.as("regDt"),
                                        prd.regEmpKey.as("regEmpKey"),
                                        prd.modDt.as("modDt"),
                                        prd.modEmpKey.as("modEmpKey"),
                                        prd.deleteYn.as("deleteYn")
                                )
                        )
                        .from(prd)
                        .leftJoin(code1).on(prd.pmClassCd.eq(code1.cdNm), code1.cdClass.eq("PM_CLASS_CD"), code1.deleteYn.eq("N"))
                        .leftJoin(code2).on(prd.pmDetailClassCd.eq(code2.cdNm), code2.cdClass.eq("PM_DETAIL_CLASS_CD"), code1.deleteYn.eq("N"))
                        .leftJoin(code3).on(prd.pmLineCd.eq(code3.cdNm), code3.cdClass.eq("PM_LINE_CD"), code3.deleteYn.eq("N"))
                        .where(builder)
                        .orderBy(prd.regDt.desc())
                        .limit(pageable.getPageSize())
                        .offset(pageable.getOffset())
                        .fetchResults();

        return new PageImpl<>(result.getResults(), pageable, result.getTotal());
    }

    @Override
    public ProductDto selectProductDetail(ProductDto dto) {

        QProduct prd = new QProduct("prd");
        QCodeMng code1 = new QCodeMng("code1");
        QCodeMng code2 = new QCodeMng("code2");
        QCodeMng code3 = new QCodeMng("code3");

        ProductDto result = queryFactory
                    .select(
                            Projections.bean(ProductDto.class,
                                prd.pmKey.as("pmKey"),
                                prd.pmClassCd.as("pmClassCd"),
                                code1.cdDesc.as("pmClassCdDesc"),
                                prd.pmDetailClassCd.as("pmDetailClassCd"),
                                code2.cdDesc.as("pmDetailClassCdDesc"),
                                prd.pmLineCd.as("pmLineCd"),
                                code3.cdDesc.as("pmLineCdDesc"),
                                prd.pmNm.as("pmNm"),
                                prd.pmColor.as("pmColor"),
                                prd.pmStock.as("pmStock"),
                                prd.pmSize.as("pmSize"),
                                prd.pmPrice.as("pmPrice"),
                                prd.pmRemark.as("pmRemark"),
                                prd.regDt.as("regDt"),
                                prd.regEmpKey.as("regEmpKey"),
                                prd.modDt.as("modDt"),
                                prd.modEmpKey.as("modEmpKey"),
                                prd.deleteYn.as("deleteYn")
                            )
                    )
                    .leftJoin(code1).on(prd.pmClassCd.eq(code1.cdNm), code1.cdClass.eq("PM_CLASS_CD"), code1.deleteYn.eq("N"))
                    .leftJoin(code2).on(prd.pmDetailClassCd.eq(code2.cdNm), code2.cdClass.eq("PM_DETAIL_CLASS_CD"), code1.deleteYn.eq("N"))
                    .leftJoin(code3).on(prd.pmLineCd.eq(code3.cdNm), code3.cdClass.eq("PM_LINE_CD"), code3.deleteYn.eq("N"))
                    .where(
                        prd.pmKey.eq(dto.getPmKey()),
                        prd.pmClassCd.eq(dto.getPmClassCd()),
                        prd.pmDetailClassCd.eq(dto.getPmDetailClassCd()),
                        prd.pmLineCd.eq(dto.getPmLineCd()),
                        prd.deleteYn.eq("N")
                    ).fetchOne();

        return result;
    }

    @Override
    public List<ProductDto> selectPopularProductList() {

        QProduct prd = QProduct.product;
        QCodeMng code1 = new QCodeMng("code1");
        QCodeMng code2 = new QCodeMng("code2");
        QCodeMng code3 = new QCodeMng("code3");

        List<ProductDto> result = queryFactory
                .select(
                        Projections.bean(ProductDto.class,
                                prd.pmKey.as("pmKey"),
                                prd.pmClassCd.as("pmClassCd"),
                                code1.cdDesc.as("pmClassCdDesc"),
                                prd.pmDetailClassCd.as("pmDetailClassCd"),
                                code2.cdDesc.as("pmDetailClassCdDesc"),
                                prd.pmLineCd.as("pmLineCd"),
                                code3.cdDesc.as("pmLineCdDesc"),
                                prd.pmOrderCnt.as("pmOrderCnt"),
                                prd.pmNm.as("pmNm"),
                                prd.pmColor.as("pmColor"),
                                prd.pmStock.as("pmStock"),
                                prd.pmSize.as("pmSize"),
                                prd.pmPrice.as("pmPrice"),
                                prd.pmRemark.as("pmRemark"),
                                prd.pmImgSrc.as("pmImgSrc"),
                                prd.regDt.as("regDt"),
                                prd.regEmpKey.as("regEmpKey"),
                                prd.modDt.as("modDt"),
                                prd.modEmpKey.as("modEmpKey"),
                                prd.deleteYn.as("deleteYn")
                        )
                )
                .from(prd)
                .leftJoin(code1).on(prd.pmClassCd.eq(code1.cdNm), code1.cdClass.eq("PM_CLASS_CD"), code1.deleteYn.eq("N"))
                .leftJoin(code2).on(prd.pmDetailClassCd.eq(code2.cdNm), code2.cdClass.eq("PM_DETAIL_CLASS_CD"), code1.deleteYn.eq("N"))
                .leftJoin(code3).on(prd.pmLineCd.eq(code3.cdNm), code3.cdClass.eq("PM_LINE_CD"), code3.deleteYn.eq("N"))
                .where(prd.deleteYn.eq("N"))
                .orderBy(prd.pmOrderCnt.asc(), prd.regDt.desc())
                .limit(4)
                .fetch();

        return result;
    }
}