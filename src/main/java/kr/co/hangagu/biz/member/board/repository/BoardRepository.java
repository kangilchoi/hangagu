package kr.co.hangagu.biz.member.board.repository;

import kr.co.hangagu.biz.member.board.entity.Board;
import kr.co.hangagu.biz.member.board.repository.custom.BoardRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, String>, BoardRepositoryCustom {

}
