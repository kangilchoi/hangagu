package kr.co.hangagu.common.response;

import kr.co.hangagu.common.constants.HangaguConstant.Code;

public class Response {
    private int code;
    private String message;
    private Object data;
    
    
	public Response() {
		this.code = 0;
	}

	public Response(int code, String message, Object data) {
		super();
		this.code = code;
		this.message = message;
		this.data = data;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
		
		if(Code.SUCCESS.getKey() == code) {
			this.message=Code.SUCCESS.getValue();
		}else if(Code.NONE.getKey() == code) {
			this.message=Code.NONE.getValue();
		}else {
			this.message=Code.FAIL.getValue();
		}
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

    
}
    