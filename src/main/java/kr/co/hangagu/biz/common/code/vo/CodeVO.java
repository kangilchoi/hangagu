package kr.co.hangagu.biz.common.code.vo;

import javax.persistence.*;

@Entity
@Table(name = "CODE_MNG_TB")
public class CodeVO {

    @Id
    @GeneratedValue
    @Column(name = "CD_KEY")
    private String cdKey;

    @Column(name = "CD_CLASS")
    private String cdClass;

    @Column(name = "CD_NM")
    private String cdNm;

    @Column(name = "CD_UPPER_CD")
    private String cdUpperCd;

    @Column(name = "CD_DESC")
    private String cdDesc;

    @Column(name = "REG_DT")
    private String regDt;

    @Column(name = "REG_EMP_KEY")
    private String regEmpKey;

    @Column(name = "MOD_DT")
    private String modDt;

    @Column(name = "MOD_EMP_KEY")
    private String modEmpKey;

    @Column(name = "DELETE_YN")
    private String deleteYn;

    public String getCdKey() {
        return cdKey;
    }

    public void setCdKey(String cdKey) {
        this.cdKey = cdKey;
    }

    public String getCdClass() {
        return cdClass;
    }

    public void setCdClass(String cdClass) {
        this.cdClass = cdClass;
    }

    public String getCdNm() {
        return cdNm;
    }

    public void setCdNm(String cdNm) {
        this.cdNm = cdNm;
    }

    public String getCdUpperCd() {
        return cdUpperCd;
    }

    public void setCdUpperCd(String cdUpperCd) {
        this.cdUpperCd = cdUpperCd;
    }

    public String getCdDesc() {
        return cdDesc;
    }

    public void setCdDesc(String cdDesc) {
        this.cdDesc = cdDesc;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getRegEmpKey() {
        return regEmpKey;
    }

    public void setRegEmpKey(String regEmpKey) {
        this.regEmpKey = regEmpKey;
    }

    public String getModDt() {
        return modDt;
    }

    public void setModDt(String modDt) {
        this.modDt = modDt;
    }

    public String getModEmpKey() {
        return modEmpKey;
    }

    public void setModEmpKey(String modEmpKey) {
        this.modEmpKey = modEmpKey;
    }

    public String getDeleteYn() {
        return deleteYn;
    }

    public void setDeleteYn(String deleteYn) {
        this.deleteYn = deleteYn;
    }
}
