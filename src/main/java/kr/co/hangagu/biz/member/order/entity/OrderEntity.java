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
//@Inheritance(strategy = InheritanceType.JOINED)
@DynamicInsert
public class OrderEntity extends DateUtils {
	
	/* @GeneratedValue(strategy=GenerationType.AUTO) */
	
	@Id
	@Column(name="OD_KEY", nullable=false)
	private String odKey;
	
	@Column(name="CART_KEY", nullable=false)
	private int cartKey;
	
	@Column(name="DELIVERY_PRICE", nullable=false)
	private String deliveryPrice;
	
	@Column(name="OD_PRICE", nullable=false)
	private String odPrice;
	
	@Column(name="SALES_PRICE", nullable=true)
	private String salesPrice;
	
	@Column(name="OD_CUST_NAME", nullable=true)
	private String odCustName;
	
	@Column(name="OD_CUST_POST", nullable=true)
	private String odCustPost;
	
	@Column(name="OD_CUST_ADDR", nullable=true)
	private String odCustAddr;
	
	@Column(name="OD_CUST_ADDR2", nullable=true)
	private String odCustAddr2;
	
	@Column(name="OD_CUST_TEL", nullable=true)
	private String odCustTel;
	
	@Column(name="OD_CUST_MOBILE", nullable=true)
	private String odCustMobile;
	
	@Column(name="OD_CUST_EMAIL", nullable=true)
	private String odCustEmail;
	
	@Column(name="OD_RECEIVER_NAME", nullable=true)
	private String odReceiverName;
	
	@Column(name="OD_RECEIVER_POST", nullable=true)
	private String odReceiverPost;
	
	@Column(name="OD_RECEIVER_ADDR", nullable=true)
	private String odReceiverAddr;
	
	@Column(name="OD_RECEIVER_ADDR2", nullable=true)
	private String odReceiverAddr2;
	
	@Column(name="OD_RECEIVER_TEL", nullable=true)
	private String odReceiverTel;
	
	@Column(name="OD_RECEIVER_MOBILE", nullable=true)
	private String odReceiverMobile;
	
	@Column(name="OD_RECEIVER_REMARK", nullable=true)
	private String odReceiverRemark;
	
	@Column(name="OD_REMARK", nullable=true)
	private String odRemark;
	
	@Column(name="OD_PASSWORD", nullable=true)
	private String odPassword;
	
	@Column(name="PM_KEY", nullable=true)
	private String pmKey;
	
	@Column(name="OD_STATUS", nullable=true, insertable = false)
	private String odStatus;
	
	@Column(name="MEM_KEY", nullable=false)
	private String memKey;
	
	
	/*
	 * @OneToMany(mappedBy="odKey") private List<OrderProductEntity> orderProducts =
	 * new ArrayList<OrderProductEntity>();
	 */
	

	public String getOdKey() {
		return odKey;
	}

	public void setOdKey(String odKey) {
		this.odKey = odKey;
	}
	
	public int getCartKey() {
		return cartKey;
	}

	public void setCartKey(int cartKey) {
		this.cartKey = cartKey;
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
	
	public String getSalesPrice() {
		return salesPrice;
	}

	public void setSalesPrice(String salesPrice) {
		this.salesPrice = salesPrice;
	}

	public String getOdCustName() {
		return odCustName;
	}

	public void setOdCustName(String odCustName) {
		this.odCustName = odCustName;
	}

	public String getOdCustPost() {
		return odCustPost;
	}

	public void setOdCustPost(String odCustPost) {
		this.odCustPost = odCustPost;
	}

	public String getOdCustAddr() {
		return odCustAddr;
	}

	public void setOdCustAddr(String odCustAddr) {
		this.odCustAddr = odCustAddr;
	}

	public String getOdCustAddr2() {
		return odCustAddr2;
	}

	public void setOdCustAddr2(String odCustAddr2) {
		this.odCustAddr2 = odCustAddr2;
	}

	public String getOdCustTel() {
		return odCustTel;
	}

	public void setOdCustTel(String odCustTel) {
		this.odCustTel = odCustTel;
	}

	public String getOdCustMobile() {
		return odCustMobile;
	}

	public void setOdCustMobile(String odCustMobile) {
		this.odCustMobile = odCustMobile;
	}

	public String getOdCustEmail() {
		return odCustEmail;
	}

	public void setOdCustEmail(String odCustEmail) {
		this.odCustEmail = odCustEmail;
	}

	public String getOdReceiverName() {
		return odReceiverName;
	}

	public void setOdReceiverName(String odReceiverName) {
		this.odReceiverName = odReceiverName;
	}

	public String getOdReceiverPost() {
		return odReceiverPost;
	}

	public void setOdReceiverPost(String odReceiverPost) {
		this.odReceiverPost = odReceiverPost;
	}

	public String getOdReceiverAddr() {
		return odReceiverAddr;
	}

	public void setOdReceiverAddr(String odReceiverAddr) {
		this.odReceiverAddr = odReceiverAddr;
	}

	public String getOdReceiverAddr2() {
		return odReceiverAddr2;
	}

	public void setOdReceiverAddr2(String odReceiverAddr2) {
		this.odReceiverAddr2 = odReceiverAddr2;
	}

	public String getOdReceiverTel() {
		return odReceiverTel;
	}

	public void setOdReceiverTel(String odReceiverTel) {
		this.odReceiverTel = odReceiverTel;
	}

	public String getOdReceiverMobile() {
		return odReceiverMobile;
	}

	public void setOdReceiverMobile(String odReceiverMobile) {
		this.odReceiverMobile = odReceiverMobile;
	}

	public String getOdReceiverRemark() {
		return odReceiverRemark;
	}

	public void setOdReceiverRemark(String odReceiverRemark) {
		this.odReceiverRemark = odReceiverRemark;
	}

	public String getOdRemark() {
		return odRemark;
	}

	public void setOdRemark(String odRemark) {
		this.odRemark = odRemark;
	}

	public String getOdPassword() {
		return odPassword;
	}

	public void setOdPassword(String odPassword) {
		this.odPassword = odPassword;
	}
	
	public String getPmKey() {
		return pmKey;
	}

	public void setPmKey(String pmKey) {
		this.pmKey = pmKey;
	}

	public String getOdStatus() {
		return odStatus;
	}

	public void setOdStatus(String odStatus) {
		this.odStatus = odStatus;
	}

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		this.memKey = memKey;
	}


	/*
	 * public List<OrderProductEntity> getOrderProducts() { return orderProducts; }
	 * 
	 * public void setOrderProducts(List<OrderProductEntity> orderProducts) {
	 * this.orderProducts = orderProducts; }
	 * 
	 * public void addOrderProducts(OrderProductEntity orderProductEntity) {
	 * this.orderProducts.add(orderProductEntity); }
	 */
	
	
	
}
