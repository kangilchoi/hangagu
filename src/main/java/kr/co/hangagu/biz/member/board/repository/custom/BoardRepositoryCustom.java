package kr.co.hangagu.biz.member.board.repository.custom;

import kr.co.hangagu.biz.member.board.dto.BoardDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {

    public Page<BoardDto> selectBoardList(BoardDto dto, Pageable pageable);

    public BoardDto selectBoardDetail(BoardDto dto);

    public void updateBoardViewCnt(BoardDto dto);
}
