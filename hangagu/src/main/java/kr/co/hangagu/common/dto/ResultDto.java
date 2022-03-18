package kr.co.hangagu.common.dto;

import kr.co.hangagu.common.constants.HangaguConstant;

public class ResultDto {

    /**
     * Default Construct
     */
    public ResultDto(){

    }

    public ResultDto(String code){
        this.code = code;
        this.message = HangaguConstant.ResponseEnum.findDescByCode(code);
    }

    public ResultDto(HangaguConstant.ResponseEnum responseEnum){
        this.code = responseEnum.getCode();
        this.message = responseEnum.getDesc();
    }

    public ResultDto(String code, String message){
        this.code = code;
        this.message = message;
    }

    String code = "1";
    String message = "SUCCESS";
    Object data;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
        this.message = HangaguConstant.ResponseEnum.findDescByCode(code);
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

    public void setEnum(HangaguConstant.ResponseEnum responseEnum) {
        this.code = responseEnum.getCode();
        this.message = responseEnum.getDesc();
    }

}
