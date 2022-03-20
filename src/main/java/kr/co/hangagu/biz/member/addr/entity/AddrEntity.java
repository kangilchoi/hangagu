package kr.co.hangagu.biz.member.addr.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import kr.co.hangagu.common.util.DateUtils;

@Entity
@Table(name = "ADDRESS_TB")
//@Inheritance(strategy = InheritanceType.JOINED)
@DynamicInsert 
//@DynamicUpdate
public class AddrEntity extends DateUtils {
	
	@Id
	@Column(name="ADDR_KEY", nullable=false)
	private String addrKey;
	
	@Column(name="MEM_KEY", nullable=false)
	private String memKey;
	
	@Column(name="ADDR_NM", nullable=false)
	private String addrNm;
	
	@Column(name="RCP_NM", nullable=false)
	private String rcpNm;
	
	@Column(name="RCP_ADDR", nullable=false)
	private String rcpAddr;
	
	@Column(name="RCP_POST", nullable=false)
	private String rcpPost;
	
	@Column(name="RCP_ADDR2", nullable=true)
	private String rcpAddr2;
	
	@Column(name="RCP_TEL", nullable=true)
	private String rcpTel;
	
	@Column(name="RCP_MOBILE", nullable=true)
	private String rcpMobile;
	
	@Column(name="DELETE_YN", nullable=true)
	private String deleteYn;
	

	public String getAddrKey() {
		return addrKey;
	}

	public void setAddrKey(String addrKey) {
		this.addrKey = addrKey;
	}

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}

	public String getAddrNm() {
		return addrNm;
	}

	public void setAddrNm(String addrNm) {
		this.addrNm = addrNm;
	}

	public String getRcpNm() {
		return rcpNm;
	}

	public void setRcpNm(String rcpNm) {
		this.rcpNm = rcpNm;
	}

	public String getRcpAddr() {
		return rcpAddr;
	}

	public void setRcpAddr(String rcpAddr) {
		this.rcpAddr = rcpAddr;
	}

	public String getRcpPost() {
		return rcpPost;
	}

	public void setRcpPost(String rcpPost) {
		this.rcpPost = rcpPost;
	}

	public String getRcpAddr2() {
		return rcpAddr2;
	}

	public void setRcpAddr2(String rcpAddr2) {
		this.rcpAddr2 = rcpAddr2;
	}

	public String getRcpTel() {
		return rcpTel;
	}

	public void setRcpTel(String rcpTel) {
		this.rcpTel = rcpTel;
	}

	public String getRcpMobile() {
		return rcpMobile;
	}

	public void setRcpMobile(String rcpMobile) {
		this.rcpMobile = rcpMobile;
	}

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}
	
	
}
