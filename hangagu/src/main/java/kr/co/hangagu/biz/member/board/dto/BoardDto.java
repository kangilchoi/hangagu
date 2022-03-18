package kr.co.hangagu.biz.member.board.dto;

public class BoardDto {

    String bdKey;

    String memKey;

    String bdNm;

    String bdContents;

    String bdClassCd;

    String bdPw;

    String bdOpenYN;

    String regDt;

    String modDt;

    String deleteYN;

    public String getBdKey() {
        return bdKey;
    }

    public void setBdKey(String bdKey) {
        this.bdKey = bdKey;
    }

    public String getMemKey() {
        return memKey;
    }

    public void setMemKey(String memKey) {
        this.memKey = memKey;
    }

    public String getBdNm() {
        return bdNm;
    }

    public void setBdNm(String bdNm) {
        this.bdNm = bdNm;
    }

    public String getBdContents() {
        return bdContents;
    }

    public void setBdContents(String bdContents) {
        this.bdContents = bdContents;
    }

    public String getBdClassCd() {
        return bdClassCd;
    }

    public void setBdClassCd(String bdClassCd) {
        this.bdClassCd = bdClassCd;
    }

    public String getBdPw() {
        return bdPw;
    }

    public void setBdPw(String bdPw) {
        this.bdPw = bdPw;
    }

    public String getBdOpenYN() {
        return bdOpenYN;
    }

    public void setBdOpenYN(String bdOpenYN) {
        this.bdOpenYN = bdOpenYN;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getModDt() {
        return modDt;
    }

    public void setModDt(String modDt) {
        this.modDt = modDt;
    }

    public String getDeleteYN() {
        return deleteYN;
    }

    public void setDeleteYN(String deleteYN) {
        this.deleteYN = deleteYN;
    }
}
