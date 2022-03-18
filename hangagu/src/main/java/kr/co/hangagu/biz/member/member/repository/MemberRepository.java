package kr.co.hangagu.biz.member.member.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.hangagu.biz.member.member.entity.Member;
import kr.co.hangagu.biz.member.member.entity.QMember;
import kr.co.hangagu.biz.member.member.vo.MemberVo;

@Repository
public class MemberRepository extends QuerydslRepositorySupport{

	private final JPAQueryFactory queryFactory;

    public MemberRepository(JPAQueryFactory queryFactory) {
        super(Member.class);
        this.queryFactory = queryFactory;
    }
    
    //회원등급 조회 by id
    public MemberVo getGradeInfo(String memId) {
    	QMember m = QMember.member;
    	
    	MemberVo result = queryFactory
			.select(Projections.bean(MemberVo.class,m.memNm,m.memGrade))
			.from(m)
			.where(
				m.memId.eq(memId)
				,m.deleteYn.eq('N')
			)
			.fetchOne();
    	
    	return result;
    }
    
    //회원등급 조회 by id
    public MemberVo getMemberById(String memId) {
    	QMember m = QMember.member;
    	
    	MemberVo result = queryFactory
			.select(Projections.bean(MemberVo.class
					,m.memKey,m.memClassCd,m.memId,m.memPw,m.memNm,m.memBirth
					,m.memAddr,m.memDetailAddr,m.memPhone,m.memTel,m.memMail,m.memPost
					,m.memMailReceptYn,m.memArea,m.memGrade,m.regDt,m.modDt,m.deleteYn))
			.from(m)
			.where(
				m.memId.eq(memId)
				,m.deleteYn.eq('N')
			)
			.fetchOne();
    	
    	return result;
    }
    
    //회원정보 변경
    @Transactional
    public int updateMember(MemberVo v) {
    	QMember m = QMember.member;
    	
    	int res = (int) queryFactory
    			.update(m).set(m.memNm,v.getMemNm())
    			.set(m.memBirth,v.getMemBirth())
    			.set(m.memAddr,v.getMemAddr())
    			.set(m.memDetailAddr,v.getMemDetailAddr())
    			.set(m.memTel, v.getMemTel())
    			.set(m.memPhone, v.getMemPhone())
    			.set(m.memMail, v.getMemMail())
    			.set(m.memMailReceptYn, v.getMemMailReceptYn())
    			.set(m.modDt, v.getModDt())
    			.where(m.memId.eq(v.getMemId()),m.deleteYn.eq('N'))
    			.execute();
    			
    	return res;
    }
    
    //pw 변경
    @Transactional
    public int updatePwById(MemberVo v) {
    	QMember m = QMember.member;
    	
    	int res = (int) queryFactory
    			.update(m).set(m.memPw,v.getMemPw())
    			.set(m.modDt, v.getModDt())
    			.where(m.memId.eq(v.getMemId()),m.deleteYn.eq('N'))
    			.execute();
    			
    	return res;
    }
    
    //탈퇴
    @Transactional
    public int dropMember(String memId, LocalDateTime modDt) {
    	QMember m = QMember.member;
    	
    	int res = (int) queryFactory
    			.update(m).set(m.deleteYn,'Y')
    			.set(m.modDt, modDt)
    			.where(m.memId.eq(memId),m.deleteYn.eq('N'))
    			.execute();
    			
    	return res;
    }
    
    //회원가입
    public int signUp(MemberVo v) {
    	QMember m = QMember.member;
    	
    	int res = (int)0;
    	queryFactory
    			.insert(m)
    			.columns(m.memKey,m.memClassCd,m.memId,m.memPw,m.memNm,m.memAddr,m.memDetailAddr,m.memTel,m.memPhone,m.memMail,m.memMailReceptYn,m.memBirth,m.memGrade,m.termsAgreeYn,m.regDt,m.deleteYn)
    			.values(v.getMemKey(),v.getMemClassCd(),v.getMemId(),v.getMemPw(),v.getMemNm(),v.getMemAddr(),v.getMemDetailAddr(),v.getMemTel(),v.getMemPhone(),v.getMemMail()
				,v.getMemMailReceptYn(),v.getMemBirth(),v.getMemGrade(),'Y',v.getRegDt(),v.getDeleteYn()).execute();
    			
    			
//    			.set(m.memKey,v.getMemKey())
//    			.set(m.memClassCd,v.getMemClassCd())
//    			.set(m.memId,v.getMemId())
//    			.set(m.memPw,v.getMemPw())
//    			.set(m.memNm,v.getMemNm())
//    			.set(m.memAddr,v.getMemAddr())
//    			.set(m.memDetailAddr,v.getMemDetailAddr())
//    			.set(m.memTel,v.getMemTel())
//    			.set(m.memPhone,v.getMemPhone())
//    			.set(m.memMail,v.getMemMail())
//    			.set(m.memMailReceptYn,v.getMemMailReceptYn())
//    			.set(m.memBirth,v.getMemBirth())
//    			.set(m.memGrade,v.getMemGrade())
//    			.set(m.termsAgreeYn,v.getTermsAgreeYn())
//    			.set(m.regDt,v.getRegDt())
//    			.set(m.deleteYn,v.getDeleteYn())
//    			.set(m.memPost,"")
//    			.set(m.memArea, "KOREA")
//    			.execute();
    			
    	return res;
    }
}