package kr.co.hangagu.biz.member.cart.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.util.DateUtils;
import kr.co.hangagu.common.util.StringUtils;

@Entity
@Table(name = "CART_TB")
@DynamicInsert 
@DynamicUpdate
public class CartEntity extends DateUtils {
	
	@Id
	@Column(name="CART_KEY", nullable=false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int cartKey;
	
	@Column(name="PM_KEY", nullable=false)
	private String pmKey;
	
	@Column(name="PM_QUANTITY", nullable=false)
	private int pmQuantity;
	
	@Column(name="MEM_KEY", nullable=false)
	private String memKey;
	
	@Column(name="CART_STATUS")
	@Enumerated(value=EnumType.STRING)
	private HangaguConstant.Cart cartStatus;
	
	@Column(name="DELETE_YN", nullable=true)
	private String deleteYn;
	
	public CartEntity() {
		
	}
	
	public CartEntity(int cartKey, String pmKey, int pmQuantity, String memKey, HangaguConstant.Cart cartStatus, String deleteYn) {
		super();
		this.cartKey = cartKey;
		this.pmKey = pmKey;
		this.pmQuantity = pmQuantity;
		this.memKey = memKey;
		this.cartStatus = cartStatus;
		this.deleteYn = deleteYn;
	}

	public int getCartKey() {
		return cartKey;
	}

	public void setCartKey(int cartKey) {
		if(!"0".equals(StringUtils.getDefaultValue(cartKey, "0"))) {
			this.cartKey = cartKey;
		}
	}

	public String getPmKey() {
		return pmKey;
	}

	public void setPmKey(String pmKey) {
		if(!"".equals(StringUtils.getDefaultValue(pmKey, ""))) {
			this.pmKey = pmKey;
		}
	}

	public int getPmQuantity() {
		return pmQuantity;
	}

	public void setPmQuantity(int pmQuantity) {
		if(!"0".equals(StringUtils.getDefaultValue(pmQuantity, "0"))) {
			this.pmQuantity = pmQuantity;
		}
	}

	public String getMemKey() {
		return memKey;
	}

	public void setMemKey(String memKey) {
		if(!"".equals(StringUtils.getDefaultValue(memKey, ""))) {
			this.memKey = memKey;
		}
	}

	public HangaguConstant.Cart getCartStatus() {
		return cartStatus;
	}

	public void setCartStatus(HangaguConstant.Cart cartStatus) {
		if(!"".equals(StringUtils.getDefaultValue(cartStatus, ""))) {
			this.cartStatus = cartStatus;
		}
	}

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		if(!"".equals(StringUtils.getDefaultValue(deleteYn, ""))) {
			this.deleteYn = deleteYn;
		}
	}
	
	
}
