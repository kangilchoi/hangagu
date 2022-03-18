package kr.co.hangagu.biz.member.car.dto;

import java.util.List;

import kr.co.hangagu.biz.member.interestProduct.dto.InterestProductDto;

public class CartDto {
	
	private int cartKey;
	
	private String pmKey;
	
	private int pmQuantity;
	
	private String pmSelectedColor;
	
	private String memKey;
	
	private String cartStatus;
	
	private String deleteYn;
	
	private String pmPrice;
	
	private String pmDeliveryPrice;
	
	private String pmSalesRate;
	
	private String pmNm;
	
	private String pmColor;
	
	private String pmImgSrc;
	
	private String regDt;
	
	private String modDt;
	
	private List<CartDto> cartDtoList;
	
	private List<InterestProductDto> interestProductDtoList;

	public int getCartKey() {
		return cartKey;
	}

	public void setCartKey(int cartKey) {
		this.cartKey = cartKey;
	}

	public String getPmKey() {
		return pmKey;
	}

	public void setPmKey(String pmKey) {
		this.pmKey = pmKey;
	}

	public int getPmQuantity() {
		return pmQuantity;
	}

	public void setPmQuantity(int pmQuantity) {
		this.pmQuantity = pmQuantity;
	}

	public String getPmSelectedColor() {
		return pmSelectedColor;
	}

	public void setPmSelectedColor(String pmSelectedColor) {
		this.pmSelectedColor = pmSelectedColor;
	}

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}

	public String getCartStatus() {
		return cartStatus;
	}

	public void setCartStatus(String cartStatus) {
		this.cartStatus = cartStatus;
	}

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
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

	public String getPmSalesRate() {
		return pmSalesRate;
	}

	public void setPmSalesRate(String pmSalesRate) {
		this.pmSalesRate = pmSalesRate;
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
	
	public String getPmImgSrc() {
		return pmImgSrc;
	}

	public void setPmImgSrc(String pmImgSrc) {
		this.pmImgSrc = pmImgSrc;
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

	public List<CartDto> getCartDtoList() {
		return cartDtoList;
	}

	public void setCartDtoList(List<CartDto> cartDtoList) {
		this.cartDtoList = cartDtoList;
	}

	public List<InterestProductDto> getInterestProductDtoList() {
		return interestProductDtoList;
	}

	public void setInterestProductDtoList(List<InterestProductDto> interestProductDtoList) {
		this.interestProductDtoList = interestProductDtoList;
	}
	
	
}
