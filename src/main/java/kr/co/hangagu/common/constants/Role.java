package kr.co.hangagu.common.constants;

public enum Role {
    ADMIN("ROLE_ADMIN"),
    MEMBER("ROLE_MEMBER");

	private final String value;
	
	Role(String value) {
		this.value=value;
	}

	public String getValue() {
		return value;
	}
	
}
