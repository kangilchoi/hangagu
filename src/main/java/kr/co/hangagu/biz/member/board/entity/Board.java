package kr.co.hangagu.biz.member.board.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "BOARD_TB")
public class Board {
    @Id
    @Column(name = "BD_KEY")
    String bdKey;

    @Column(name = "MEM_KEY")
    String memKey;

    @Column(name = "BD_NM")
    String bdNm;

    @Column(name = "BD_CONTENTS")
    String bdContents;

    @Column(name = "DB_CLASS_CD")
    String bdClassCd;

    @Column(name = "DB_PW")
    String bdPw;

    @Column(name = "BD_OPEN_YN")
    String bdOpenYN;

    @Column(name = "REG_DT")
    String regDt;

    @Column(name = "MOD_DT")
    String modDt;

    @Column(name = "DELETE_YN")
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
