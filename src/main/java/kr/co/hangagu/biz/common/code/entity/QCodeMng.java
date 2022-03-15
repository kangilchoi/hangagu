package kr.co.hangagu.biz.common.code.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCodeMng is a Querydsl query type for CodeMng
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCodeMng extends EntityPathBase<CodeMng> {

    private static final long serialVersionUID = 1863873171L;

    public static final QCodeMng codeMng = new QCodeMng("codeMng");

    public final StringPath cdClass = createString("cdClass");

    public final StringPath cdDesc = createString("cdDesc");

    public final StringPath cdKey = createString("cdKey");

    public final StringPath cdNm = createString("cdNm");

    public final StringPath cdUpperCd = createString("cdUpperCd");

    public final StringPath deleteYn = createString("deleteYn");

    public final StringPath modDt = createString("modDt");

    public final StringPath modEmpKey = createString("modEmpKey");

    public final StringPath regDt = createString("regDt");

    public final StringPath regEmpKey = createString("regEmpKey");

    public QCodeMng(String variable) {
        super(CodeMng.class, forVariable(variable));
    }

    public QCodeMng(Path<? extends CodeMng> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCodeMng(PathMetadata metadata) {
        super(CodeMng.class, metadata);
    }

}

