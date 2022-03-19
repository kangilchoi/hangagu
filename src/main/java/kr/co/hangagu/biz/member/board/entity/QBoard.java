package kr.co.hangagu.biz.member.board.entity;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.StringPath;

import javax.annotation.Generated;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = 2142924688L;

    public static final QBoard board = new QBoard("board");

    public final StringPath bdClassCd = createString("bdClassCd");

    public final StringPath bdContents = createString("bdContents");

    public final StringPath bdKey = createString("bdKey");

    public final StringPath bdNm = createString("bdNm");

    public final StringPath bdOpenYN = createString("bdOpenYN");

    public final StringPath bdPw = createString("bdPw");

    public final StringPath deleteYN = createString("deleteYN");

    public final StringPath memKey = createString("memKey");

    public final StringPath modDt = createString("modDt");

    public final StringPath regDt = createString("regDt");

    public QBoard(String variable) {
        super(Board.class, forVariable(variable));
    }

    public QBoard(Path<? extends Board> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoard(PathMetadata metadata) {
        super(Board.class, metadata);
    }

}

