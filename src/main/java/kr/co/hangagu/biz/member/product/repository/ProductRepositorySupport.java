package kr.co.hangagu.biz.member.product.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.core.types.dsl.BooleanExpression;
import kr.co.hangagu.biz.member.product.vo.ProductVO;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import org.thymeleaf.util.StringUtils;

import java.util.List;

import static kr.co.hangagu.biz.member.product.vo.QProductVO.productVO;

@Repository
public class ProductRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    public ProductRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        super(ProductVO.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<ProductVO> selectProductList(ProductVO product) {
        return jpaQueryFactory
                .select(productVO)
                .from(productVO)
                .where(
                        eqPmClassCd(product.getPmClassCd()),
                        eqPmClassCd(product.getPmDetailClassCd()),
                        eqPmLineCd(product.getPmLineCd()),
                        productVO.deleteYn.eq("N")
                )
                .orderBy(productVO.regDt.desc())
                .fetch();
    }

    private BooleanExpression eqPmClassCd(String pmClassCd) {
        if (StringUtils.isEmpty(pmClassCd)) {
            return null;
        }
        return productVO.pmClassCd.eq(pmClassCd);
    }

    private BooleanExpression eqPmDetailClassCd(String pmDetailClassCd) {
        if (StringUtils.isEmpty(pmDetailClassCd)) {
            return null;
        }
        return productVO.pmClassCd.eq(pmDetailClassCd);
    }

    private BooleanExpression eqPmLineCd(String pmLineCd) {
        if (StringUtils.isEmpty(pmLineCd)) {
            return null;
        }
        return productVO.pmClassCd.eq(pmLineCd);
    }

}
