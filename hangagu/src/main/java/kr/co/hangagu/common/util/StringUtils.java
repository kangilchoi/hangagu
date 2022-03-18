package kr.co.hangagu.common.util;

import java.text.DecimalFormat;

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
	
	/**
	 * @Method Name: getCommaString
	 * @Cdate : 2022-01-02
	 * @Author : sylim
	 * @Modification : 
	 * @Method Description : 통화 화폐 단위 표시 ex) 123456789 => 123,456,789
	 * @param str
	 * @return
	 * */
	public static String getCommaStr(String str) {
		String pattern = "###,###,###,###,###";
		DecimalFormat df = null;
		String returnValue = null;
		
		try {
			df = new DecimalFormat(pattern);
			double d = Double.parseDouble(str);
			returnValue = df.format(d);
		} catch(Exception e) {
			returnValue = str;
		}
		
		return returnValue;
	}
}
