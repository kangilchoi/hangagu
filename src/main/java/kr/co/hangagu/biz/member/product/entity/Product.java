package kr.co.hangagu.biz.member.product.entity;

import javax.persistence.*;

@Entity
@Table(name = "PRODUCT_TB")
public class Product {

    @Id
    @Column(name = "PM_KEY")
    private String pmKey; // PK

    @Column(name = "PM_CLASS_CD")
    private String pmClassCd;

    @Column(name = "PM_DETAIL_CLASS_CD")
    private String pmDetailClassCd;

    @Column(name = "PM_LINE_CD")
    private String pmLineCd;

    @Column(name = "PM_ORDER_CNT")
    private String pmOrderCnt;

    @Column(name = "PM_NM")
    private String pmNm;

    @Column(name = "PM_COLOR")
    private String pmColor;

    @Column(name = "PM_STOCK")
    private String pmStock;

    @Column(name = "PM_SIZE")
    private String pmSize;

    @Column(name = "PM_PRICE")
    private String pmPrice;

    @Column(name = "PM_REMARK")
    private String pmRemark;

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

    public String getPmKey() {
        return pmKey;
    }

    public void setPmKey(String pmKey) {
        this.pmKey = pmKey;
    }

    public String getPmClassCd() {
        return pmClassCd;
    }

    public void setPmClassCd(String pmClassCd) {
        this.pmClassCd = pmClassCd;
    }

    public String getPmDetailClassCd() {
        return pmDetailClassCd;
    }

    public void setPmDetailClassCd(String pmDetailClassCd) {
        this.pmDetailClassCd = pmDetailClassCd;
    }

    public String getPmLineCd() {
        return pmLineCd;
    }

    public void setPmLineCd(String pmLineCd) {
        this.pmLineCd = pmLineCd;
    }

    public String getPmOrderCnt() {
        return pmOrderCnt;
    }

    public void setPmOrderCnt(String pmOrderCnt) {
        this.pmOrderCnt = pmOrderCnt;
    }

    public String getPmNm() {
        return pmNm;
    }

    public void setPmNm(String pmNm) {
        this.pmNm = pmNm;
    }

    public String getPmColor() {
        return pmColor;
    }

    public void setPmColor(String pmColor) {
        this.pmColor = pmColor;
    }

    public String getPmStock() {
        return pmStock;
    }

    public void setPmStock(String pmStock) {
        this.pmStock = pmStock;
    }

    public String getPmSize() {
        return pmSize;
    }

    public void setPmSize(String pmSize) {
        this.pmSize = pmSize;
    }

    public String getPmPrice() {
        return pmPrice;
    }

    public void setPmPrice(String pmPrice) {
        this.pmPrice = pmPrice;
    }

    public String getPmRemark() {
        return pmRemark;
    }

    public void setPmRemark(String pmRemark) {
        this.pmRemark = pmRemark;
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
