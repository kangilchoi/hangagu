package kr.co.hangagu.biz.member.member.vo;
import kr.co.hangagu.biz.member.member.entitiy.MemberEntity;


public class Member {

    private String memKey;
    private String memClass;
    private String memId;
    private String memPw;
    private String memNm;
    private String memAddr;
    private String memDetailAddr;
    private String memTel;
    private String memPhone;
    private String memMail;
    private String memMailReceptYn;
    private String memBirth;
    private String memArea;
    private String memGrade;
    private String termsAgreeYn;
    private String regDt;
    private String regTm;
    private String modDt;
    private String modTm;
    private String deleteYn;

    public MemberEntity toEntity() {
        return new MemberEntity(memKey, memClass, memId, memPw, memNm, memAddr, memDetailAddr, memTel, memPhone, memMail, memMailReceptYn, memBirth, memArea, memGrade, termsAgreeYn, regDt, regTm, modDt, modTm, deleteYn);
    }

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}

	public String getMemClass() {
		return memClass;
	}

	public void setMemClass(String memClass) {
		this.memClass = memClass;
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

	public String getMemMailReceptYn() {
		return memMailReceptYn;
	}

	public void setMemMailReceptYn(String memMailReceptYn) {
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

	public String getTermsAgreeYn() {
		return termsAgreeYn;
	}

	public void setTermsAgreeYn(String termsAgreeYn) {
		this.termsAgreeYn = termsAgreeYn;
	}

	public String getRegDt() {
		return regDt;
	}

	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}

	public String getRegTm() {
		return regTm;
	}

	public void setRegTm(String regTm) {
		this.regTm = regTm;
	}

	public String getModDt() {
		return modDt;
	}

	public void setModDt(String modDt) {
		this.modDt = modDt;
	}

	public String getModTm() {
		return modTm;
	}

	public void setModTm(String modTm) {
		this.modTm = modTm;
	}

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}

    
}