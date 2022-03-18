package kr.co.hangagu.biz.member.member.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kr.co.hangagu.biz.member.member.entity.Member;


public interface MemberDao extends JpaRepository<Member, Integer>{
	Optional<Member> findByMemId(String memId);
	
	@Query(nativeQuery = true, value="SELECT hangagu.make_key(:keyType)")
    Optional<String> makeKey(@Param("keyType") String keyType);
	
	List<Member> findByMemMailAndMemNmAndMemGradeAndDeleteYn(String memMail, String memNm, String memGrade, char deleteYn);
	
	List<Member> findByMemPhoneAndMemNmAndMemGradeAndDeleteYn(String memPhone, String memNm, String memGrade, char deleteYn);
	
	Optional<Member> findByMemIdAndMemMailAndMemNmAndMemGradeAndDeleteYn(String memId, String memMail, String memNm, String memGrade, char deleteYn);
	
	Optional<Member> findByMemIdAndDeleteYn(String memId, char DeleteYn);

	Optional<Member> findByMemKeyAndDeleteYn(String memKey, char DeleteYn);
}