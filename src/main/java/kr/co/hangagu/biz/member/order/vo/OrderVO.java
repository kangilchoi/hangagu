package kr.co.hangagu.biz.member.order.vo;

import java.time.LocalDateTime;

public class OrderVO {
private String odKey;
	
	private String pmKey;
	private String deliveryPrice;
	private String odPrice;
	private LocalDateTime odDt;
	private String memKey;
	
	public String getOdKey() {
		return odKey;
	}
	public void setOdKey(String odKey) {
		this.odKey = odKey;
	}
	public String getPmKey() {
		return pmKey;
	}
	public void setPmKey(String pmKey) {
		this.pmKey = pmKey;
	}
	public String getDeliveryPrice() {
		return deliveryPrice;
	}
	public void setDeliveryPrice(String deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}
	public String getOdPrice() {
		return odPrice;
	}
	public void setOdPrice(String odPrice) {
		this.odPrice = odPrice;
	}
	public LocalDateTime getOdDt() {
		return odDt;
	}
	public void setOdDt(LocalDateTime odDt) {
		this.odDt = odDt;
	}
	public String getMemKey() {
		return memKey;
	}
	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}
	
	
}
