package kr.co.hangagu.biz.member.order.entity;

import javax.persistence.Column;

public class OrderSearchEntity extends OrderEntity {
	
	@Column(name="DELETE_YN", nullable=false)
	private String deleteYn;
	
	@Column(name="REG_DT", nullable=false)
	private String fromDt;
	
	@Column(name="REG_DT", nullable=false)
	private String toDt;
	
	public OrderSearchEntity() {
		
	}
	
	public OrderSearchEntity(String deleteYn, String fromDt, String toDt) {
		super();
		this.deleteYn = deleteYn;
		this.fromDt = fromDt;
		this.toDt = toDt;
	}
	
	public String getDeleteYn() {
		return deleteYn;
	}
	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}
	public String getFromDt() {
		return fromDt;
	}
	public void setFromDt(String fromDt) {
		this.fromDt = fromDt;
	}
	public String getToDt() {
		return toDt;
	}
	public void setToDt(String toDt) {
		this.toDt = toDt;
	}
	
}
