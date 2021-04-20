package kr.co.hangagu.biz.member.member.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.hangagu.biz.member.member.entitiy.MemberEntity;

public interface MemberDao extends JpaRepository<MemberEntity, Integer> {
	Optional<MemberEntity> findByMemId(String memId);
}