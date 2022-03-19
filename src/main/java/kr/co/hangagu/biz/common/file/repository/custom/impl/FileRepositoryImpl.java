package kr.co.hangagu.biz.common.file.repository.custom.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.hangagu.biz.common.code.entity.QCodeMng;
import kr.co.hangagu.biz.common.file.repository.FileRepository;
import kr.co.hangagu.biz.common.file.repository.custom.FileRepositoryCustom;
import kr.co.hangagu.biz.member.product.dto.ProductDto;
import kr.co.hangagu.biz.member.product.entity.Product;
import kr.co.hangagu.biz.member.product.entity.QProduct;
import kr.co.hangagu.biz.member.product.repository.custom.ProductRepositoryCustom;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class FileRepositoryImpl extends QuerydslRepositorySupport implements FileRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public FileRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Product.class);
        this.queryFactory = queryFactory;
    }
}
