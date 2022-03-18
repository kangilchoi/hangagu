package kr.co.hangagu.common.constants;

public enum PrimaryKeyType {
	ORDER("OD")
	, ORDER_PRODUCT("OP")
	, INTEREST_PM_KEY("IP");
	
	private String value;
	
	private PrimaryKeyType(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return this.value;
	}
}
