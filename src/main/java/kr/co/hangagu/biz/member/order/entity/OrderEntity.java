package kr.co.hangagu.biz.member.order.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import kr.co.hangagu.biz.member.orderProduct.entity.OrderProductEntity;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.util.DateUtils;

@Entity
@Table(name="ORDER_TB")
@Inheritance(strategy = InheritanceType.JOINED)
@DynamicInsert
public class OrderEntity extends DateUtils {
	
	/* @GeneratedValue(strategy=GenerationType.AUTO) */
	
	@Id
	@Column(name="OD_KEY", nullable=false)
	private String odKey;
	
	@Column(name="DELIVERY_PRICE", nullable=false)
	private String deliveryPrice;
	
	@Column(name="OD_PRICE", nullable=false)
	private String odPrice;
	
	@Column(name="OD_STATUS", nullable=false, insertable = false)
	@Enumerated(value=EnumType.STRING)
	private HangaguConstant.Oder odStatus;
	
	@Column(name="MEM_KEY", nullable=false)
	private String memKey;
	
	@OneToMany(mappedBy="odKey")
	private List<OrderProductEntity> orderProducts = new ArrayList<OrderProductEntity>();
	
	public OrderEntity() {
		
	}
	
	public OrderEntity(String odKey, String deliveryPrice, String odPrice, HangaguConstant.Oder odStatus, String memKey) {
		super();
		this.odKey = odKey;
		this.deliveryPrice = deliveryPrice;
		this.odPrice = odPrice;
		this.odStatus = odStatus;
		this.memKey = memKey;
	}
	
	public String getOdKey() {
		return odKey;
	}

	public void setOdKey(String odKey) {
		this.odKey = odKey;
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
	
	public HangaguConstant.Oder getOdStatus() {
		return odStatus;
	}

	public void setOdStatus(HangaguConstant.Oder odStatus) {
		this.odStatus = odStatus;
	}

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}

	public List<OrderProductEntity> getOrderProducts() {
		return orderProducts;
	}

	public void setOrderProducts(List<OrderProductEntity> orderProducts) {
		this.orderProducts = orderProducts;
	}

	public void addOrderProducts(OrderProductEntity orderProductEntity) {
		this.orderProducts.add(orderProductEntity);
	}
	
}
