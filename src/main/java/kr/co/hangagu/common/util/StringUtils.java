package kr.co.hangagu.common.util;

public class StringUtils {
	public static String getDefaultValue(Object object, String defaultStr) {
		String returnValue = null;
		if(object != null) {
			if(object.toString().length()==0 || object.toString().equalsIgnoreCase("null")) {
				returnValue = defaultStr;
			}else {
				returnValue = object.toString();
			}
		} else {
			returnValue = defaultStr;
		}
		
		return returnValue;
	}
}
