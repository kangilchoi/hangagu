package kr.co.hangagu.biz.member.product.vo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QProductVO is a Querydsl query type for ProductVO
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QProductVO extends EntityPathBase<ProductVO> {

    private static final long serialVersionUID = -368384321L;

    public static final QProductVO productVO = new QProductVO("productVO");

    public final StringPath deleteYn = createString("deleteYn");

    public final StringPath modDt = createString("modDt");

    public final StringPath modEmpKey = createString("modEmpKey");

    public final StringPath pmClassCd = createString("pmClassCd");

    public final StringPath pmColor = createString("pmColor");

    public final StringPath pmDetailClassCd = createString("pmDetailClassCd");

    public final StringPath pmKey = createString("pmKey");

    public final StringPath pmLineCd = createString("pmLineCd");

    public final StringPath pmNm = createString("pmNm");

    public final StringPath pmPrice = createString("pmPrice");

    public final StringPath pmRemark = createString("pmRemark");

    public final StringPath pmSize = createString("pmSize");

    public final StringPath pmStock = createString("pmStock");

    public final StringPath regDt = createString("regDt");

    public final StringPath regEmpKey = createString("regEmpKey");

    public QProductVO(String variable) {
        super(ProductVO.class, forVariable(variable));
    }

    public QProductVO(Path<? extends ProductVO> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProductVO(PathMetadata metadata) {
        super(ProductVO.class, metadata);
    }

}

