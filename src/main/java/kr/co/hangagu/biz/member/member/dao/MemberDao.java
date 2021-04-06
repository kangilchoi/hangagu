package kr.co.hangagu.biz.member.member.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.hangagu.biz.vo.Member;

public interface MemberDao extends JpaRepository<Member, Integer> {
	Optional<Member> findByAccount(String account);
}