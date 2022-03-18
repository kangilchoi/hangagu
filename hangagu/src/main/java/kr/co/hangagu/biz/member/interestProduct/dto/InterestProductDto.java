package kr.co.hangagu.biz.member.interestProduct.dto;

import java.util.List;

public class InterestProductDto {
	
	private String interestPmKey;
	
	private String pmKey;
	
	private String pmNm;
	
	private String pmColor;
	
	private String pmPrice;
	
	private String pmDeliveryPrice;
	
	private String memKey;
	
	private String regDt;
	
	private String modDt;
	
	private String deleteYn;
	
	private List<InterestProductDto> interestProductDtoList;

	public String getInterestPmKey() {
		return interestPmKey;
	}

	public void setInterestPmKey(String interestPmKey) {
		this.interestPmKey = interestPmKey;
	}

	public String getPmKey() {
		return pmKey;
	}

	public void setPmKey(String pmKey) {
		this.pmKey = pmKey;
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

	public String getPmPrice() {
		return pmPrice;
	}

	public void setPmPrice(String pmPrice) {
		this.pmPrice = pmPrice;
	}

	public String getPmDeliveryPrice() {
		return pmDeliveryPrice;
	}

	public void setPmDeliveryPrice(String pmDeliveryPrice) {
		this.pmDeliveryPrice = pmDeliveryPrice;
	}

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
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

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}

	public List<InterestProductDto> getInterestProductDtoList() {
		return interestProductDtoList;
	}

	public void setInterestProductDtoList(List<InterestProductDto> interestProductDtoList) {
		this.interestProductDtoList = interestProductDtoList;
	}
	
	
	
}
