package kr.co.hangagu.common.util;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class UpdateUtils {
	/**
	 * 수정 시 명시된 정보만 수정할 수 있도록 null이 아닌 정보를 복사
	 * @author sylim
	 * 2021.04.24
	 */
	public static void copyNonNullProperties(Object src, Object target) {
		BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
	}
	
	/**
	 * 수정 시 명시된 정보만 수정할 수 있도록 null인 정보 얻기
	 * @author sylim
	 * 2021.04.24
	 */
	public static String[] getNullPropertyNames(Object source) {
		final BeanWrapper src = new BeanWrapperImpl(source);
		java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();
		
		Set<String> emptyNames = new HashSet<String>();
		for(java.beans.PropertyDescriptor pd: pds) {
			Object srcValue = src.getPropertyValue(pd.getName());
			if(srcValue == null) emptyNames.add(pd.getName());
		}
		
		String[] result = new String[emptyNames.size()];
		return emptyNames.toArray(result);
	}

}
