package kr.co.hangagu.biz.member.cart.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import kr.co.hangagu.common.util.DateUtils;
import kr.co.hangagu.common.util.StringUtils;

@Entity
@Table(name = "CART_TB")
//@Inheritance(strategy = InheritanceType.JOINED)
@DynamicInsert 
//@DynamicUpdate
public class CartEntity extends DateUtils {
	
	@Id
	@Column(name="CART_KEY", nullable=false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int cartKey;
	
	@Column(name="PM_KEY", nullable=true)
	private String pmKey;
	
	@Column(name="PM_QUANTITY", nullable=true)
	private int pmQuantity;
	
	@Column(name="PM_SELECTED_COLOR", nullable=true)
	private String pmSelectedColor;
	
	@Column(name="MEM_KEY", nullable=false)
	private String memKey;
	
	/*
	 * @Column(name="CART_STATUS", nullable=true)
	 * 
	 * @Enumerated(value=EnumType.STRING) private HangaguConstant.Cart cartStatus;
	 */
	
	@Column(name="CART_STATUS", nullable=true)
	private String cartStatus;
	
	@Column(name="DELETE_YN", nullable=true)
	private String deleteYn;
	
	/*
	 * @Column(name="REG_DT") private String regDt;
	 * 
	 * @Column(name="MOD_DT") private String modDt;
	 */
	

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
		if(!"".equals(StringUtils.getDefaultValue(memKey, ""))) {
			this.memKey = memKey;
		}
	}

	public String getCartStatus() {
		return cartStatus;
	}

	public void setCartStatus(String cartStatus) {
		/*
		 * if(!"".equals(StringUtils.getDefaultValue(cartStatus, ""))) { this.cartStatus
		 * = cartStatus; }
		 */
		this.cartStatus = cartStatus;
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
