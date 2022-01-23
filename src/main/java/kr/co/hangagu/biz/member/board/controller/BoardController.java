package kr.co.hangagu.biz.member.board.controller;


import kr.co.hangagu.biz.member.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * BoardController
 * 게시글 관련 서비스
 */
@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

//    @RequestMapping(value = "/list")


}
