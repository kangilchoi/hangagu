package kr.co.hangagu.biz.member.interestProduct.service;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.member.interestProduct.dao.InterestProductDao;
import kr.co.hangagu.biz.member.interestProduct.entity.InterestProductEntity;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.constants.PrimaryKeyType;
import kr.co.hangagu.common.response.Response;
import kr.co.hangagu.common.util.StringUtils;

/**
 * InterestProductService
 * 관심제품 관련 서비스
 */
@Service
public class InterestProductService {
	
	@Autowired
	private InterestProductDao interestProductDao;
	
	/**
	 * 관심제품 정보 조회
	 * @param memKey 회원 키
	 * @param deleteYn 삭제 여부
	 * @return 관심제품 정보 리스트와 성공여부를 반환한다. 정보가 없거나 조회에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response selectInterestProductList(String memKey, String deleteYn) throws Exception {
		Response res = new Response();
		
		try {
			List<InterestProductEntity> interestProductList = interestProductDao.findByDeleteYn(deleteYn);
			if(interestProductList.size() != 0) {
				res.setCode(Code.SUCCESS.getKey());
				res.setData(interestProductList);
			} else {
				res.setCode(Code.FAIL.getKey());
			}
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
	/**
	 * 관심제품 정보 추가
	 * @param interestProductEntity 저장할 관심제품 정보
	 * @return 추가한 관심제품 정보 리스트와 성공여부를 반환한다. 등록에 실패할 경우 실패값을 반환한다.
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response insertInterestProduct(InterestProductEntity interestProductEntity) throws Exception {
		Response res = new Response();
		
		try {
			String interestPmKey = interestProductDao.makeKey(PrimaryKeyType.INTEREST_PM_KEY.getValue());
			interestProductEntity.setInterestPmKey(interestPmKey);
			
			interestProductDao.save(interestProductEntity);
			
			res.setCode(Code.SUCCESS.getKey());
			res.setData(interestProductEntity);
			
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
	/**
	 * 관심제품 상세 정보 조회
	 * @param interestPmKey 조회할 관심제품 키
	 * @return 관심제품 상세 정보와 성공 여부를 반환한다. 정보가 없거나 조회에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response selectInterestProductDetail(String interestPmKey) throws Exception {
		Response res = new Response();
		
		try {
			InterestProductEntity interestProductInfo = interestProductDao.findByInterestPmKey(interestPmKey);
			if(!StringUtils.getDefaultValue(interestProductInfo, "").equals("")) {
				res.setCode(Code.SUCCESS.getKey());
				res.setData(interestProductInfo);
			} else {
				res.setCode(Code.FAIL.getKey());
			}
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
	/**
	 * 관심제품 정보 수정
	 * @param interestPmKey 수정할 관심제품 키
	 * @param InterestProductEntity 수정할 관심제품 정보
	 * @return 관심제품 정보 수정 성공 여부를 반환한다. 수정에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response updateInterestProduct(String interestPmKey, InterestProductEntity interestProductEntity) {
		Response res = new Response();
		
		try {
			InterestProductEntity existing = interestProductDao.findByInterestPmKey(interestPmKey);
			copyNonNullProperties(interestProductEntity, existing);
			interestProductDao.save(existing);
			
			res.setCode(Code.SUCCESS.getKey());
			res.setData(existing);
			
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
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
