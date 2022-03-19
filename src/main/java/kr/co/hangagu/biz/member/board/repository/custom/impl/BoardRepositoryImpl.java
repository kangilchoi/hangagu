package kr.co.hangagu.biz.member.board.repository.custom.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.hangagu.biz.common.code.entity.QCodeMng;
import kr.co.hangagu.biz.member.board.dto.BoardDto;
import kr.co.hangagu.biz.member.board.entity.Board;
import kr.co.hangagu.biz.member.board.entity.QBoard;
import kr.co.hangagu.biz.member.board.repository.custom.BoardRepositoryCustom;
import kr.co.hangagu.biz.member.member.entity.QMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class BoardRepositoryImpl extends QuerydslRepositorySupport implements BoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BoardRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Board.class);
        this.queryFactory = queryFactory;
    }

    @Override
    public Page<BoardDto> selectBoardList(BoardDto dto, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();

        QBoard brd = QBoard.board;
        QMember mem = QMember.member;
        QCodeMng code = QCodeMng.codeMng;

        builder.and(brd.deleteYN.eq("N"));
        builder.and(brd.bdClassCd.eq(dto.getBdClassCd()));

        QueryResults<BoardDto> result = queryFactory
                    .select(
                            Projections.bean(BoardDto.class,
                                    brd.bdKey.as("bdKey"),
                                    brd.memKey.as("memKey"),
                                    mem.memNm.as("memNm"),
                                    brd.bdContents.as("bdContents"),
                                    brd.bdClassCd.as("bdClassCd"),
                                    code.cdDesc.as("bdClassCdDesc"),
                                    brd.bdPw.as("bdPw"),
                                    brd.bdOpenYN.as("bdOpenYN"),
                                    brd.bdViewCnt.as("bdViewCnt"),
                                    brd.regDt.as("regDt"),
                                    brd.modDt.as("modDt"),
                                    brd.deleteYN.as("deleteYN")
                            )
                    )
                    .from(brd)
                    .leftJoin(mem).on(brd.memKey.eq(mem.memKey))
                    .leftJoin(code).on(brd.bdClassCd.eq(code.cdNm), code.cdClass.eq("BD_CLASS_CD"), code.deleteYn.eq("N"))
                    .where(builder)
                    .orderBy(brd.regDt.desc())
                    .limit(pageable.getPageSize())
                    .offset(pageable.getOffset())
                    .fetchResults();

        return new PageImpl<>(result.getResults(), pageable, result.getTotal());
    }

    @Override
    public BoardDto selectBoardDetail(BoardDto dto) {
        BooleanBuilder builder = new BooleanBuilder();

        QBoard brd = QBoard.board;
        QMember mem = QMember.member;
        QCodeMng code = QCodeMng.codeMng;

        builder.and(brd.bdKey.eq(dto.getBdKey()));
        builder.and(brd.deleteYN.eq("N"));

        BoardDto result = queryFactory
                .select(
                        Projections.bean(BoardDto.class,
                                brd.bdKey.as("bdKey"),
                                brd.memKey.as("memKey"),
                                mem.memNm.as("memNm"),
                                brd.bdContents.as("bdContents"),
                                brd.bdClassCd.as("bdClassCd"),
                                code.cdDesc.as("bdClassCdDesc"),
                                brd.bdPw.as("bdPw"),
                                brd.bdOpenYN.as("bdOpenYN"),
                                brd.regDt.as("regDt"),
                                brd.modDt.as("modDt"),
                                brd.deleteYN.as("deleteYN")
                        )
                )
                .from(brd)
                .leftJoin(mem).on(brd.memKey.eq(mem.memKey))
                .leftJoin(code).on(brd.bdClassCd.eq(code.cdNm), code.cdClass.eq("BD_CLASS_CD"), code.deleteYn.eq("N"))
                .where(builder)
                .fetchOne();

        return result;
    }
    @Override
    public void updateBoardViewCnt(BoardDto dto) {
        QBoard brd = QBoard.board;

        BoardDto result = queryFactory
                .select(
                        Projections.bean(BoardDto.class,
                                brd.bdKey.as("bdKey"),
                                brd.memKey.as("memKey"),
                                brd.bdContents.as("bdContents"),
                                brd.bdClassCd.as("bdClassCd"),
                                brd.bdPw.as("bdPw"),
                                brd.bdOpenYN.as("bdOpenYN"),
                                brd.regDt.as("regDt"),
                                brd.modDt.as("modDt"),
                                brd.deleteYN.as("deleteYN")
                        )
                )
                .from(brd)
                .where(brd.bdKey.eq(dto.getBdKey()))
                .fetchOne();

        queryFactory
                .update(brd)
                .set(brd.bdViewCnt, result.getBdViewCnt() + 1)
                .where(brd.bdKey.eq(dto.getBdKey()))
                .execute();
    }

}
