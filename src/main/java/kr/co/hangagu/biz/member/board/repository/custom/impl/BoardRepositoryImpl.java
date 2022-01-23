package kr.co.hangagu.biz.member.board.repository.custom.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.hangagu.biz.member.board.dto.BoardDto;
import kr.co.hangagu.biz.member.board.entity.Board;
import kr.co.hangagu.biz.member.board.repository.custom.BoardRepositoryCustom;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class BoardRepositoryImpl extends QuerydslRepositorySupport implements BoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BoardRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Board.class);
        this.queryFactory = queryFactory;
    }

    @Override
    public List<BoardDto> selectBoardList(BoardDto dto) {

        return null;
    }

    @Override
    public BoardDto selectBoardDetail(BoardDto dto) {
        return null;
    }


}
