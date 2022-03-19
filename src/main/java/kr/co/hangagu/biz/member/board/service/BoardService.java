package kr.co.hangagu.biz.member.board.service;


import kr.co.hangagu.biz.member.board.dto.BoardDto;
import kr.co.hangagu.common.dto.ResultDto;
import org.springframework.data.domain.Pageable;

/**
 * BoardService
 * 게시글 관련 서비스
 */
public interface BoardService {

    public ResultDto findList(BoardDto dto, Pageable pageable);

    public ResultDto findDetail(BoardDto dto);

    public ResultDto save(BoardDto dto);

    public ResultDto update(BoardDto dto);
}
