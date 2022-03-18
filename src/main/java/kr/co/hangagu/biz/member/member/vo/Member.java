package kr.co.hangagu.biz.member.member.vo;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "MEM_TB")
public class Member {

    
	//@GeneratedValue(strategy = GenerationType.AUTO)	//4가지 있으나 함수사용으로 사용x
	@Id
    @Column(name="MEM_KEY", length = 8, nullable = false, unique = true)
    private String memKey;

    @Column(name="MEM_CLASS_CD", length = 8, nullable = false)
    private String memClassCd;

    @Column(name="MEM_ID", length = 16, nullable = false)
    private String memId;

    @Column(name="MEM_PW", length = 16, nullable = false)
    private String memPw;
    
    @Column(name="MEM_NM", length = 32, nullable = false)
    private String memNm;
    
    @Column(name="MEM_ADDR", length = 16, nullable = false)
    private String memAddr;

    @Column(name="MEM_DETAIL_ADDR", length = 256, nullable = false)
    private String memDetailAddr;

    @Column(name="MEM_POST", length = 32, nullable = true)
    private String memPost;
    
    @Column(name="MEM_TEL", length = 10, nullable = true)
    private String memTel;
    
    @Column(name="MEM_PHONE", length = 13, nullable = false)
    private String memPhone;
    
    @Column(name="MEM_MAIL", length = 64, nullable = false)
    private String memMail;
    
    @Column(name="MEM_MAIL_RECEPT_YN", length = 1, nullable = false)
    private char memMailReceptYn;
    
    @Column(name="MEM_BIRTH", length = 8, nullable = true)
    private String memBirth;
    
    @Column(name="MEM_AREA", length = 8, nullable = true)
    private String memArea;
    
    @Column(name="MEM_GRADE", length = 8, nullable = true)
    private String memGrade;
    
    @Column(name="TERMS_AGREE_YN", length = 1, nullable = false)
    private char termsAgreeYn;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name ="REG_DT", nullable = false)
    private LocalDateTime regDt;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name ="MOD_DT", nullable = true)
    private LocalDateTime modDt;

    @Column(name="DELETE_YN", length = 1, nullable = false)
    private char deleteYn;
    
    public Member() {
    }

	

	public Member(String memKey, String memClassCd, String memId, String memPw, String memNm, String memAddr,
			String memDetailAddr, String memPost, String memTel, String memPhone, String memMail, char memMailReceptYn,
			String memBirth, String memArea, String memGrade, char termsAgreeYn, LocalDateTime regDt,
			LocalDateTime modDt, char deleteYn) {
		super();
		this.memKey = memKey;
		this.memClassCd = memClassCd;
		this.memId = memId;
		this.memPw = memPw;
		this.memNm = memNm;
		this.memAddr = memAddr;
		this.memDetailAddr = memDetailAddr;
		this.memPost = memPost;
		this.memTel = memTel;
		this.memPhone = memPhone;
		this.memMail = memMail;
		this.memMailReceptYn = memMailReceptYn;
		this.memBirth = memBirth;
		this.memArea = memArea;
		this.memGrade = memGrade;
		this.termsAgreeYn = termsAgreeYn;
		this.regDt = regDt;
		this.modDt = modDt;
		this.deleteYn = deleteYn;
	}



	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}

	public String getMemClassCd() {
		return memClassCd;
	}

	public void setMemClassCd(String memClassCd) {
		this.memClassCd = memClassCd;
	}

	public String getMemId() {
		return memId;
	}

	public void setMemId(String memId) {
		this.memId = memId;
	}

	public String getMemPw() {
		return memPw;
	}

	public void setMemPw(String memPw) {
		this.memPw = memPw;
	}

	public String getMemNm() {
		return memNm;
	}

	public void setMemNm(String memNm) {
		this.memNm = memNm;
	}

	public String getMemAddr() {
		return memAddr;
	}

	public void setMemAddr(String memAddr) {
		this.memAddr = memAddr;
	}

	public String getMemDetailAddr() {
		return memDetailAddr;
	}

	public void setMemDetailAddr(String memDetailAddr) {
		this.memDetailAddr = memDetailAddr;
	}

	public String getMemPost() {
		return memPost;
	}

	public void setMemPost(String memPost) {
		this.memPost = memPost;
	}

	public String getMemTel() {
		return memTel;
	}

	public void setMemTel(String memTel) {
		this.memTel = memTel;
	}

	public String getMemPhone() {
		return memPhone;
	}

	public void setMemPhone(String memPhone) {
		this.memPhone = memPhone;
	}

	public String getMemMail() {
		return memMail;
	}

	public void setMemMail(String memMail) {
		this.memMail = memMail;
	}

	public char getMemMailReceptYn() {
		return memMailReceptYn;
	}

	public void setMemMailReceptYn(char memMailReceptYn) {
		this.memMailReceptYn = memMailReceptYn;
	}

	public String getMemBirth() {
		return memBirth;
	}

	public void setMemBirth(String memBirth) {
		this.memBirth = memBirth;
	}

	public String getMemArea() {
		return memArea;
	}

	public void setMemArea(String memArea) {
		this.memArea = memArea;
	}

	public String getMemGrade() {
		return memGrade;
	}

	public void setMemGrade(String memGrade) {
		this.memGrade = memGrade;
	}

	public char getTermsAgreeYn() {
		return termsAgreeYn;
	}

	public void setTermsAgreeYn(char termsAgreeYn) {
		this.termsAgreeYn = termsAgreeYn;
	}

	public char getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(char deleteYn) {
		this.deleteYn = deleteYn;
	}



	public LocalDateTime getRegDt() {
		return regDt;
	}



	public void setRegDt(LocalDateTime regDt) {
		this.regDt = regDt;
	}



	public LocalDateTime getModDt() {
		return modDt;
	}



	public void setModDt(LocalDateTime modDt) {
		this.modDt = modDt;
	}

    
}