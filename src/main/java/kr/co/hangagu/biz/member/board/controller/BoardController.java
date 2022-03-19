package kr.co.hangagu.biz.member.board.controller;


import kr.co.hangagu.biz.member.board.dto.BoardDto;
import kr.co.hangagu.biz.member.board.entity.Board;
import kr.co.hangagu.biz.member.board.service.BoardService;
import kr.co.hangagu.biz.member.product.dto.ProductDto;
import kr.co.hangagu.common.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

/**
 * BoardController
 * 게시글 관련 서비스
 */
@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @RequestMapping(
            value = {"/{bdClassCd}/list"}
            , method = RequestMethod.GET
    )
    public @ResponseBody
    ResultDto getBoardList(@PathVariable(value = "bdClassCd", required = true) String bdClassCd
                        , @RequestParam(value = "page", required = false, defaultValue="1") int page
                        , @RequestParam(value = "size", required = false, defaultValue="10") int size) {
        BoardDto dto = new BoardDto();
        dto.setBdClassCd(bdClassCd);

        Pageable pageable = PageRequest.of(page-1, size);
        ResultDto resultDto = boardService.findList(dto, pageable);

        return resultDto;
    }

    @RequestMapping(value = "/detail/{bdKey}", method = RequestMethod.GET)
    public @ResponseBody
    ResultDto getBoardDetail(@PathVariable("bdKey") String bdKey) {
        BoardDto dto = new BoardDto();
        dto.setBdKey(bdKey);
        ResultDto resultDto = boardService.findDetail(dto);
        return resultDto;
    }

    @RequestMapping(value="/create", method = RequestMethod.PUT)
    public @ResponseBody ResultDto createProduct(BoardDto dto) {
        ResultDto resultDto = boardService.save(dto);
        return resultDto;
    }

    @RequestMapping(value = "/update", method = RequestMethod.PATCH)
    public @ResponseBody ResultDto updateProduct(BoardDto dto) {
        ResultDto resultDto = boardService.update(dto);
        return resultDto;
    }

}
