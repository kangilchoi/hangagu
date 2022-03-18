package kr.co.hangagu.biz.member.orderProduct.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import kr.co.hangagu.biz.member.order.entity.OrderEntity;
import kr.co.hangagu.common.util.DateUtils;

@Entity
@Table(name="ORDER_PRODUCT_MNG_TB")
@PrimaryKeyJoinColumn(name="OD_PM_KEY")
@DynamicInsert
public class OrderProductEntity extends DateUtils {
	
	/* @GeneratedValue(strategy=GenerationType.AUTO) */
	
	/* @Column(name="OD_PM_KEY", nullable=false) */
	@Id
	@Column(name="OD_PM_KEY", nullable=false)
	private String odPmKey;
	
	@Column(name="PM_KEY", nullable=false)
	private String pmKey;
	
	@Column(name="PM_QUANTITY", nullable=false)
	private int pmQuantity;
	
	@ManyToOne
	@JoinColumn(name="OD_KEY")
	private OrderEntity odKey;
	
	@Column(name="DELETE_YN", nullable=true)
	private String deleteYn;
	
	public OrderProductEntity() {
		
	}
	
	public OrderProductEntity(String odPmKey, String pmKey, int pmQuantity, OrderEntity odKey, String deleteYn) {
		super();
		this.odPmKey = odPmKey;
		this.pmKey = pmKey;
		this.pmQuantity = pmQuantity;
		this.odKey = odKey;
		this.deleteYn = deleteYn;
	}

	public String getOdPmKey() {
		return odPmKey;
	}

	public void setOdPmKey(String odPmKey) {
		this.odPmKey = odPmKey;
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

	public OrderEntity getOdKey() {
		return odKey;
	}

	public void setOdKey(OrderEntity odKey) {
		if(this.odKey != null) {
			this.odKey.getOrderProducts().remove(this);
		} 
		this.odKey = odKey;
		odKey.getOrderProducts().add(this);
	}

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}
	

}
