package kr.co.hangagu.biz.member.board.repository.custom;

import kr.co.hangagu.biz.member.board.dto.BoardDto;

import java.util.List;

public interface BoardRepositoryCustom {

    public List<BoardDto> selectBoardList(BoardDto dto);

    public BoardDto selectBoardDetail(BoardDto dto);
}
