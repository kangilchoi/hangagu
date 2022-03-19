package kr.co.hangagu.biz.member.board.service.impl;

import kr.co.hangagu.biz.common.mysql.repository.HangaguFunctionRepository;
import kr.co.hangagu.biz.member.board.dto.BoardDto;
import kr.co.hangagu.biz.member.board.entity.Board;
import kr.co.hangagu.biz.member.board.repository.BoardRepository;
import kr.co.hangagu.biz.member.board.service.BoardService;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private HangaguFunctionRepository functionRepository;

    @Override
    public ResultDto findList(BoardDto dto, Pageable pageable) {
        ResultDto resultDto = new ResultDto();

        Page<BoardDto> result = boardRepository.selectBoardList(dto, pageable);

        resultDto.setData(result);
        return resultDto;
    }

    @Override
    public ResultDto findDetail(BoardDto dto) {
        ResultDto resultDto = new ResultDto();

        BoardDto boardDto = boardRepository.selectBoardDetail(dto);

        resultDto.setData(boardDto);

        return resultDto;
    }

    @Override
    public ResultDto save(BoardDto dto) {
        ResultDto resultDto = new ResultDto();

        LocalDateTime now = LocalDateTime.now();

        Board brd = new Board();
        brd.setBdKey(functionRepository.makeKeyFunction(HangaguConstant.Seq.BOARD_KEY.getValue()));
        brd.setMemKey(dto.getMemKey());
        brd.setBdNm(dto.getBdNm());
        brd.setBdContents(dto.getBdContents());
        brd.setBdClassCd(dto.getBdClassCd());
        brd.setBdPw(dto.getBdPw());
        brd.setBdOpenYN(dto.getBdOpenYN());
        brd.setRegDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        brd.setModDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        brd.setDeleteYN("N");

        Board newBoard = boardRepository.save(brd);

        if(newBoard == null) {
            resultDto.setData("9999");
            resultDto.setMessage("등록 실패");
        } else {
            resultDto.setData(newBoard);
        }

        return resultDto;
    }

    @Override
    public ResultDto update(BoardDto dto) {
        ResultDto resultDto = new ResultDto();

        Board board = new Board();
        board.setBdKey(dto.getBdKey());

        board.setDeleteYN(dto.getDeleteYN());
        board.setBdOpenYN(dto.getBdOpenYN());
        board.setModDt(String.valueOf(LocalDate.now()));

        Board newBoard = boardRepository.save(board);
        if(newBoard == null) {
            resultDto.setCode("9999");
            resultDto.setMessage("수정 실패");
        } else {
            resultDto.setData(newBoard);
        }

        return resultDto;
    }
}
