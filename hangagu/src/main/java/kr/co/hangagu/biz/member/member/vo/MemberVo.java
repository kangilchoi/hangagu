package kr.co.hangagu.biz.member.member.vo;

import java.time.LocalDateTime;

public class MemberVo {
	private String memKey;
	private String memClassCd;
	private String memId;
	private String memPw;
	private String memNm;
	private String memAddr;
	private String memDetailAddr;
	private String memTel;
	private String memPhone;
	private String memMail;
	private String memPost;
	private char memMailReceptYn;
	private String memBirth;
	private String memArea;
	private String memGrade;
	private char termsAgreeYn;
	private LocalDateTime regDt;
	private LocalDateTime modDt;
	private char deleteYn;
	
	public MemberVo() {
		super();
	}
	public MemberVo(String memKey, String memClassCd, String memId, String memPw, String memNm, String memAddr,
			String memDetailAddr, String memTel, String memPhone, String memMail, String memPost, char memMailReceptYn, String memBirth,
			String memArea, String memGrade, char termsAgreeYn, LocalDateTime regDt, LocalDateTime modDt,
			char deleteYn) {
		super();
		this.memKey = memKey;
		this.memClassCd = memClassCd;
		this.memId = memId;
		this.memPw = memPw;
		this.memNm = memNm;
		this.memAddr = memAddr;
		this.memDetailAddr = memDetailAddr;
		this.memTel = memTel;
		this.memPhone = memPhone;
		this.memMail = memMail;
		this.memPost = memPost;
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
	public String getMemPost() {
		return memPost;
	}
	public void setMemPost(String memPost) {
		this.memPost = memPost;
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
	public char getDeleteYn() {
		return deleteYn;
	}
	public void setDeleteYn(char deleteYn) {
		this.deleteYn = deleteYn;
	}
	
}