package kr.co.hangagu.biz.member.product.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = -2023105872L;

    public static final QProduct product = new QProduct("product");

    public final StringPath deleteYn = createString("deleteYn");

    public final StringPath modDt = createString("modDt");

    public final StringPath modEmpKey = createString("modEmpKey");

    public final StringPath pmClassCd = createString("pmClassCd");

    public final StringPath pmColor = createString("pmColor");

    public final StringPath pmDetailClassCd = createString("pmDetailClassCd");

    public final StringPath pmKey = createString("pmKey");

    public final StringPath pmLineCd = createString("pmLineCd");

    public final StringPath pmNm = createString("pmNm");

    public final StringPath pmOrderCnt = createString("pmOrderCnt");

    public final StringPath pmPrice = createString("pmPrice");

    public final StringPath pmRemark = createString("pmRemark");

    public final StringPath pmSize = createString("pmSize");

    public final StringPath pmStock = createString("pmStock");

    public final StringPath regDt = createString("regDt");

    public final StringPath regEmpKey = createString("regEmpKey");

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}

