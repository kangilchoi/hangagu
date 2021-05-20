package kr.co.hangagu.biz.member.order.vo;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import kr.co.hangagu.common.constants.HangaguConstant.Oder;

@Entity
@Table(name = "ORDER_TB")
public class Order {
	
	//@GeneratedValue(strategy = GenerationType.AUTO)	//4가지 있으나 함수사용으로 사용x
	@Id
	@Column(name="OD_KEY", length = 8, nullable = false, unique = true)
	private String odKey;
	
	@Column(name="PM_KEY", length = 8, nullable = false)
	private String pmKey;
	
	@Column(name="MEM_KEY", length = 8, nullable = false)
	private String memKey;
	
	
	@Column(name="OD_PRICE", nullable = false)
	private int odPrice;
	
	@Column(name="DELIVERY_PRICE", nullable = false)
	private int deliveryPrice;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name ="REG_DT", nullable = false)
	private LocalDateTime regDt;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name ="MOD_DT", nullable = true)
	private LocalDateTime modDt;

	@Column(name="OD_STATUS", columnDefinition = "ENUM('READY', 'IN_DELIVERY', 'COMPLETE', 'CANCEL', 'EXCHANGE', 'RETURN')")
    @Enumerated(EnumType.STRING)
	private Oder oder;
	
	public enum Status {
		READY,
    	IN_DELIVERY,
    	COMPLETE,
    	CANCEL,
    	EXCHANGE,
    	RETURN;
	}
	
	public Order() {
		super();
	}


	
	public Order(String odKey, String pmKey, String memKey, int odPrice, int deliveryPrice, LocalDateTime regDt,
			LocalDateTime modDt, Oder oder) {
		super();
		this.odKey = odKey;
		this.pmKey = pmKey;
		this.memKey = memKey;
		this.odPrice = odPrice;
		this.deliveryPrice = deliveryPrice;
		this.regDt = regDt;
		this.modDt = modDt;
		this.oder = oder;
	}



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

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}

	public int getOdPrice() {
		return odPrice;
	}

	public void setOdPrice(int odPrice) {
		this.odPrice = odPrice;
	}

	public int getDeliveryPrice() {
		return deliveryPrice;
	}

	public void setDeliveryPrice(int deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}

	public LocalDateTime getRegDt() {
		return regDt;
	}

	public void setRegDt(LocalDateTime regDt) {
		this.regDt = regDt;
	}

	public LocalDateTime getModDt() {
		return modDt;
	}

	public void setModDt(LocalDateTime modDt) {
		this.modDt = modDt;
	}



	public Oder getOder() {
		return oder;
	}



	public void setOder(Oder oder) {
		this.oder = oder;
	}

	
}
