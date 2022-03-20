package kr.co.hangagu.biz.member.addr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.hangagu.biz.member.addr.entity.AddrEntity;
import kr.co.hangagu.biz.member.addr.repository.custom.AddrRepositoryCustom;

public interface AddrRepository extends JpaRepository<AddrEntity, String>, AddrRepositoryCustom {

}
