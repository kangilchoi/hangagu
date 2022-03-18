package kr.co.hangagu.biz.member.interestProduct.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import kr.co.hangagu.common.util.DateUtils;

@Entity
@Table(name = "INTEREST_PD_TB")
@DynamicInsert 
@DynamicUpdate
public class InterestProductEntity extends DateUtils {
	
	@Id
	@Column(name = "INTEREST_PM_KEY", nullable=false)
	private String interestPmKey;
	
	@Column(name = "PM_KEY", nullable=false, updatable=false)
	private String pmKey;
	
	@Column(name = "MEM_KEY", nullable=false, updatable=false)
	private String memKey;
	
	@Column(name = "DELETE_YN")
	private String deleteYn;

	public InterestProductEntity() {
		
	}
	
	public InterestProductEntity(String interestPmKey, String pmKey, String memKey, String deleteYn) {
		super();
		this.interestPmKey = interestPmKey;
		this.pmKey = pmKey;
		this.memKey = memKey;
		this.deleteYn = deleteYn;
	}
	
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

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}
	
	
}
